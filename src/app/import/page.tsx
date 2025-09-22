"use client";
import React from "react";
import { getAllCases, onCasesChanged, enrichCaseWithHardcodedMedical } from "@/utils/cases-store";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, CheckCircle2, File as FileIcon } from "lucide-react";

type QueueItem = { id: string; name: string; size: number; progress: number; status: "queued" | "uploading" | "done" | "error" };

export default function ImportPage() {
  const [, setTick] = React.useState(0);
  React.useEffect(() => onCasesChanged(() => setTick((t) => t + 1)), []);
  const cases = React.useMemo(() => getAllCases(), [setTick]);

  const [caseId, setCaseId] = React.useState(cases[0]?.id ?? "");
  React.useEffect(() => {
    if (!caseId && cases[0]?.id) setCaseId(cases[0].id);
    if (caseId && !cases.find(c => c.id === caseId)) setCaseId(cases[0]?.id ?? "");
  }, [cases, caseId]);

  const [queue, setQueue] = React.useState<QueueItem[]>([]);
  const [uploaded, setUploaded] = React.useState<QueueItem[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onPick = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const items = Array.from(files).map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
      size: f.size,
      progress: 0,
      status: "queued" as const
    }));
    setQueue((q) => [...q, ...items]);
  };

  // simulate upload and trigger enrichment on completion
  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setQueue((prev) => prev.map((it) => ({ ...it, status: it.status === "queued" ? "uploading" : it.status })));
    queue.forEach((item) => {
      if (item.status !== "queued" && item.status !== "uploading") return;
      const t = setInterval(() => {
        setQueue((curr) =>
          curr.map((it) => {
            if (it.id !== item.id) return it;
            const bump = Math.min(100, it.progress + Math.ceil(Math.random() * 18));
            const next = { ...it, progress: bump, status: bump >= 100 ? "done" : "uploading" };
            if (next.status === "done") {
              setTimeout(() => {
                setUploaded((u) => [{ ...next }, ...u]);
                setQueue((c) => c.filter((x) => x.id !== next.id));
                // enrich local case when any file completes
                if (caseId) enrichCaseWithHardcodedMedical(caseId);
              }, 300);
            }
            return next;
          })
        );
      }, 350);
      timers.push(t);
    });
    return () => timers.forEach(clearInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue.length]);

  const current = React.useMemo(() => cases.find((c) => c.id === caseId), [cases, caseId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Import</h1>
          <p className="text-sm text-muted-foreground">Bulk upload documents to a case. Frontend-only demo with animated progress.</p>
        </div>
        <Button variant="outline" onClick={() => { setQueue([]); setUploaded([]); }}>Clear</Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="w-full md:w-80">
            <Select value={caseId} onValueChange={setCaseId}>
              <SelectTrigger><SelectValue placeholder="Select case" /></SelectTrigger>
              <SelectContent className="max-h-80">
                {cases.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 text-sm text-muted-foreground">
            {current ? (
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{current.type}</Badge>
                <Badge>{current.status}</Badge>
                <span className="truncate">Parties: {current.parties.join(" · ")}</span>
              </div>
            ) : <span>Select a case</span>}
          </div>
        </div>
      </Card>

      <Card
        className="p-6 border-dashed cursor-pointer hover:shadow-sm transition"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); onPick(e.dataTransfer.files); }}
      >
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
          <div>
            <p className="font-medium">Drop files here or click to select</p>
            <p className="text-sm text-muted-foreground">Multiple PDFs, images, anything. We fake the upload. You get the vibe.</p>
          </div>
          <Button type="button" onClick={() => inputRef.current?.click()}>Choose files</Button>
          <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => onPick(e.target.files)} />
        </div>
      </Card>

      {queue.length > 0 && (
        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-3">Uploading</h2>
          <ul className="space-y-3">
            {queue.map((f) => (
              <li key={f.id} className="flex items-center gap-3">
                <FileIcon className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{Math.floor(f.progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded mt-1 overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${f.progress}%` }} />
                  </div>
                </div>
                {f.status === "uploading" ? <Badge variant="outline">Uploading</Badge> : <Badge>Done</Badge>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-4">
        <h2 className="text-sm font-semibold mb-3">Recently Uploaded</h2>
        {uploaded.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing yet. Toss some files in.</p>
        ) : (
          <ul className="space-y-2">
            {uploaded.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="truncate text-sm">{f.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{(f.size / 1024 / 1024).toFixed(2)} MB</Badge>
                  <Badge>Uploaded</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={() => setUploaded([])} disabled={uploaded.length === 0}>Reset Uploaded</Button>
        <Button disabled={uploaded.length === 0 || !caseId}>Finish Import</Button>
      </div>
    </div>
  );
}
