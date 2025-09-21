"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarIcon, Filter, RotateCcw, Tag, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { CaseStatus, CaseType } from "@/utils/types";


function setQuery(router: any, params: URLSearchParams, key: string, value?: string) {
    const next = new URLSearchParams(params.toString());
    if (value === undefined || value === "" || value === "All") next.delete(key);
    else next.set(key, value);
    router.push(`/chronologies?${next.toString()}`);
}


export default function CaseFilters({ allTags }: { allTags: string[] }) {
    const router = useRouter();
    const params = useSearchParams();


    const search = params.get("q") ?? "";
    const type = (params.get("type") as CaseType | null) ?? null;
    const status = (params.get("status") as CaseStatus | null) ?? null;
    const from = params.get("from") ?? "";
    const to = params.get("to") ?? "";
    const tags = (params.get("tags") ?? "").split(",").filter(Boolean);


    const clearAll = () => router.push("/chronologies");

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <Input
                    placeholder="Search title or parties"
                    defaultValue={search}
                    onChange={(e) => setQuery(router, params, "q", e.target.value)}
                    className="md:w-[320px]"
                />
                <Select onValueChange={(v) => setQuery(router, params, "type", v)} value={type ?? "All types"}>
                    <SelectTrigger className="w-[180px]"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                        {(["All types", "Civil", "Criminal", "Family", "Corporate", "IP", "Other"] as const).map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(v) => setQuery(router, params, "status", v)} value={status ?? "All status"}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                        {(["All status", "Open", "Closed", "Stayed", "Appeal"] as const).map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                        <Input type="date" defaultValue={from} onChange={(e) => setQuery(router, params, "from", e.target.value)} />
                        <span className="text-sm text-muted-foreground">to</span>
                        <Input type="date" defaultValue={to} onChange={(e) => setQuery(router, params, "to", e.target.value)} />
                    </div>
                    <Button variant="outline" size="icon" onClick={clearAll} title="Reset filters">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Tags</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {allTags.map((t) => {
                            const checked = tags.includes(t);
                            return (
                                <DropdownMenuCheckboxItem
                                    key={t}
                                    checked={checked}
                                    onCheckedChange={(val) => {
                                        const set = new Set(tags);
                                        if (val) set.add(t); else set.delete(t);
                                        const next = Array.from(set).join(",");
                                        setQuery(router, params, "tags", next);
                                    }}
                                >
                                    {t}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Active tag pills */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <Badge key={t} variant="secondary" className="gap-1">
                            <Tag className="w-3 h-3" /> {t}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => {
                                const set = new Set(tags); set.delete(t);
                                const next = Array.from(set).join(",");
                                setQuery(router, params, "tags", next);
                            }} />
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}