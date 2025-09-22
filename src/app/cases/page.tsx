"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CaseFilters from "@/components/cases/CaseFilters";
import CaseList from "@/components/cases/CaseList";
import CaseTable from "@/components/cases/CaseTable";
import { useFilteredCases } from "@/hooks/use-filtered-cases";
import { getAllCases, onCasesChanged } from "@/utils/cases-store";
import NewCaseDialog from "@/components/cases/NewCaseDialog";

export default function CasesPage() {
    const params = useSearchParams();
    const router = useRouter();
    const [, setTick] = React.useState(0);
    React.useEffect(() => onCasesChanged(() => setTick((t) => t + 1)), []);
    const view = params.get("view") ?? "table";
    const items = useFilteredCases();
    const allTags = React.useMemo(
        () => Array.from(new Set(getAllCases().flatMap((c) => c.tags))).sort(),
        [setTick]
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Cases</h1>
                    <p className="text-sm text-muted-foreground">Search and filter cases. Click a case to enter its workspace.</p>
                </div>
                <div className="flex items-center gap-2">
                    <NewCaseDialog
                        onCreated={() => {
                            const next = new URLSearchParams(params.toString());
                            router.push(`/cases?${next.toString()}`);
                        }}
                    />
                    <Tabs
                        value={view}
                        onValueChange={(v) => {
                            const next = new URLSearchParams(params.toString());
                            next.set("view", v);
                            router.push(`/cases?${next.toString()}`);
                        }}
                    >
                        <TabsList>
                            <TabsTrigger value="cards" className="flex items-center gap-2">
                                <LayoutGrid className="w-4 h-4" />
                                Cards
                            </TabsTrigger>
                            <TabsTrigger value="table" className="flex items-center gap-2">
                                <TableIcon className="w-4 h-4" />
                                Table
                            </TabsTrigger>
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
