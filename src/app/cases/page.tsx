"use client";
import React from "react";
import { CASES } from "@/utils/mock-data";
import { Case } from "@/utils/types";
import CaseFilters from "@/components/cases/CaseFilters";
import CaseList from "@/components/cases/CaseList";
import CaseTable from "@/components/cases/CaseTable";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Table as TableIcon, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useFilteredCases } from "@/hooks/use-filtered-cases";

export default function CasesPage() {
    const params = useSearchParams();
    const router = useRouter();
    const view = params.get("view") ?? "cards";
    const items = useFilteredCases();
    const allTags = Array.from(new Set(CASES.flatMap((c) => c.tags))).sort();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Cases</h1>
                    <p className="text-sm text-muted-foreground">Search and filter cases. Click a case to enter its workspace.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Case
                    </Button>
                    <Tabs value={view} onValueChange={(v) => {
                        const next = new URLSearchParams(params.toString());
                        next.set("view", v);
                        router.push(`/cases?${next.toString()}`);
                    }}>
                        <TabsList>
                            <TabsTrigger value="cards" className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" />Cards</TabsTrigger>
                            <TabsTrigger value="table" className="flex items-center gap-2"><TableIcon className="w-4 h-4" />Table</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>



            <CaseFilters allTags={allTags} basePath="/cases" />
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