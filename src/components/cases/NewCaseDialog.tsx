"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getAllCases, addLocalCase } from "@/utils/cases-store";
import type { Case } from "@/utils/types";
import { Plus } from "lucide-react";

type Props = { onCreated?: (c: Case) => void; triggerClassName?: string };

export default function NewCaseDialog({ onCreated, triggerClassName }: Props) {
    const [open, setOpen] = React.useState(false);
    const allTypes = React.useMemo(
        () => Array.from(new Set(getAllCases().map((c) => c.type))).sort(),
        []
    );
    const [form, setForm] = React.useState({
        title: "",
        type: allTypes[0] ?? "Other",
        status: "Open",
        filedAt: new Date().toISOString().slice(0, 10),
        parties: "",
        tags: "",
        summary: "",
    });
    const disabled = !form.title.trim();

    const submit = () => {
        const parties = form.parties.split(",").map((s) => s.trim()).filter(Boolean);
        const tags = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
        const c = addLocalCase({
            title: form.title.trim(),
            type: form.type,
            status: form.status as any,
            filedAt: form.filedAt,
            updatedAt: form.filedAt,
            parties,
            tags: tags.length ? tags : ["local"],
            summary: form.summary.trim(),
        });
        onCreated?.(c);
        setOpen(false);
        setForm({ ...form, title: "", parties: "", tags: "", summary: "" });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={triggerClassName}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Case
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Case</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3">
                    <Input
                        placeholder="Case title"
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                            <SelectContent>
                                {allTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                {!allTypes.includes("Other") && <SelectItem value="Other">Other</SelectItem>}
                            </SelectContent>
                        </Select>
                        <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
                            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                            <SelectContent>
                                {["Open", "Closed", "Stayed", "Appeal"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                            type="date"
                            value={form.filedAt}
                            onChange={(e) => setForm((f) => ({ ...f, filedAt: e.target.value }))}
                        />
                        <Input
                            placeholder="Parties (comma separated)"
                            value={form.parties}
                            onChange={(e) => setForm((f) => ({ ...f, parties: e.target.value }))}
                        />
                    </div>
                    <Input
                        placeholder="Tags (comma separated)"
                        value={form.tags}
                        onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                    />
                    <Textarea
                        placeholder="Short summary (optional)"
                        value={form.summary}
                        onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                        className="min-h-[90px]"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={submit} disabled={disabled}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
