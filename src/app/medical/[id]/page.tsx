"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import { CASES, FINDINGS, DOCUMENTS } from "@/utils/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ListChecks, FileText, SlidersHorizontal, Plus, Search } from "lucide-react";

function FindingCard({ f }: { f: typeof FINDINGS[number] }) {
  const doc = DOCUMENTS.find(d => d.id === f.documentId);
  const color = f.confidence >= 90 ? "bg-emerald-100 text-emerald-700" : f.confidence >= 75 ? "bg-blue-100 text-blue-700" : f.confidence >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><FileText className="w-4 h-4" /><h3 className="text-lg font-semibold">{f.type}</h3></div>
        <Badge className={color}>{f.confidence}%</Badge>
      </div>
      <div className="text-sm text-muted-foreground">{f.category} • {f.date}</div>
      <p className="text-sm">{f.description}</p>
      <div className="text-xs text-muted-foreground">Provider: {f.provider}{doc ? ` • Source: ${doc.fileName}` : ""}</div>
    </div>
  );
}

export default function MedicalByCasePage() {
  const { id } = useParams<{ id: string }>();
  const caseRec = CASES.find(c => c.id === id);
  if (!caseRec) return notFound();

  const [systemFilter, setSystemFilter] = React.useState<string>("All");
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const items = React.useMemo(() => FINDINGS.filter(f => f.caseId === id), [id]);
  const filtered = React.useMemo(() => {
    let out = items;
    if (systemFilter !== "All") out = out.filter(f => f.type === systemFilter);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      out = out.filter(f => f.description.toLowerCase().includes(q) || f.type.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || f.provider.toLowerCase().includes(q));
    }
    return out;
  }, [items, systemFilter, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{caseRec.title} — Medical Findings</h1>
          <p className="text-sm text-muted-foreground">AI-extracted medical information for this case</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline"><Link href={`/workspace/${caseRec.id}`}>Back to Workspace</Link></Button>
          <Button><Plus className="w-4 h-4 mr-2" />Add Finding</Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-2 flex-wrap">
          {['All', 'Diagnosis', 'Treatment', 'Medication', 'Test Result', 'Symptom'].map(type => (
            <Button key={type} variant={systemFilter === type ? "default" : "outline"} onClick={() => setSystemFilter(type)} className="flex items-center gap-2">
              {type === 'All' && <ListChecks className="w-4 h-4" />}
              {type === 'Diagnosis' && <FileText className="w-4 h-4" />}
              {type === 'Treatment' && <SlidersHorizontal className="w-4 h-4" />}
              {type === 'Medication' && <Plus className="w-4 h-4" />}
              {type === 'Test Result' && <FileText className="w-4 h-4" />}
              {type === 'Symptom' && <Search className="w-4 h-4" />}
              {type}
            </Button>
          ))}
        </div>
        <Input type="search" placeholder="Search findings..." className="w-[300px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(f => <FindingCard key={f.id} f={f} />)}
        {filtered.length === 0 && <div className="text-sm text-muted-foreground">No findings match.</div>}
      </section>
    </div>
  );
}
