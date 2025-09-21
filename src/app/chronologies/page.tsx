"use client";
import React from "react";
import { CASES } from "@/lib/chronologies/mockData";
import CaseFilters from "@/components/chronologies/CaseFilters";
import CaseList from "@/components/chronologies/CaseList";
import CaseTable from "@/components/chronologies/CaseTable";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CaseRecord } from "@/lib/chronologies/types";


function useFilteredCases(): CaseRecord[] {
    const params = useSearchParams();
    const q = (params.get("q") ?? "").toLowerCase();
    const type = params.get("type");
    const status = params.get("status");
    const from = params.get("from");
    const to = params.get("to");
    const tags = (params.get("tags") ?? "").split(",").filter(Boolean);


    return React.useMemo(() => {
        let out = [...CASES];


        if (q) {
            out = out.filter((c) =>
                c.title.toLowerCase().includes(q) ||
                c.parties.join(" ").toLowerCase().includes(q)
            );
        }
        if (type && type !== "All") out = out.filter((c) => c.type === type);
        if (status && status !== "All") out = out.filter((c) => c.status === status);
        if (from) out = out.filter((c) => c.filedAt >= from);
        if (to) out = out.filter((c) => c.filedAt <= to);
        if (tags.length) out = out.filter((c) => tags.every((t) => c.tags.includes(t)));

        // Sort by updated desc for usefulness
        out.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
        return out;
    }, [q, type, status, from, to, params.get("tags")]);
}


export default function ChronologiesPage() {
    const params = useSearchParams();
    const router = useRouter();
    const view = params.get("view") ?? "cards"; // "cards" | "table"
    const items = useFilteredCases();
    const allTags = Array.from(new Set(CASES.flatMap((c) => c.tags))).sort();


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Chronologies</h1>
                    <p className="text-sm text-muted-foreground">Search and filter cases. Click into a case to view its timeline.</p>
                </div>
                <Tabs value={view} onValueChange={(v) => {
                    const next = new URLSearchParams(params.toString());
                    next.set("view", v);
                    router.push(`/chronologies?${next.toString()}`);
                }}>
                    <TabsList>
                        <TabsTrigger value="cards" className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" />Cards</TabsTrigger>
                        <TabsTrigger value="table" className="flex items-center gap-2"><TableIcon className="w-4 h-4" />Table</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>


            <CaseFilters allTags={allTags} />
            <Separator />


            {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">No cases match your filters. Try resetting.</div>
            ) : view === "table" ? (
                <CaseTable items={items} />
            ) : (
                <CaseList items={items} />
            )}
        </div>
    );
}