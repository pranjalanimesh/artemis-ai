import React from "react";
import { useSearchParams } from "next/navigation";
import { CASES } from "@/utils/mock-data";
import { Case } from "@/utils/types";

export function useFilteredCases(): Case[] {
    const params = useSearchParams();

    const filters = React.useMemo(() => {
        const rawType = params.get("type") || "";
        const rawStatus = params.get("status") || "";
        return {
            q: params.get("q")?.toLowerCase() || "",
            type: rawType === "All types" ? null : rawType || null,
            status: rawStatus === "All status" ? null : rawStatus || null,
            from: params.get("from"),
            to: params.get("to"),
            tags: params.get("tags")?.split(",").filter(Boolean) || [],
        };
    }, [params]);

    return React.useMemo(() => {
        const fromDate = filters.from ? new Date(filters.from) : null;
        const toDate = filters.to ? new Date(filters.to) : null;

        if (fromDate && isNaN(fromDate.getTime())) return [];
        if (toDate && isNaN(toDate.getTime())) return [];

        const filtered = CASES.filter((c) => {
            if (
                filters.q &&
                !c.title.toLowerCase().includes(filters.q) &&
                !c.parties.join(" ").toLowerCase().includes(filters.q)
            )
                return false;

            if (filters.type && c.type !== filters.type) return false;
            if (filters.status && c.status !== filters.status) return false;

            if (
                filters.tags.length > 0 &&
                !filters.tags.every((t) => c.tags.includes(t))
            )
                return false;

            const filedDate = new Date(c.filedAt);
            if (isNaN(filedDate.getTime())) return true;

            if (fromDate && filedDate < fromDate) return false;
            if (toDate && filedDate > new Date(toDate.getTime() + 86400000))
                return false;

            return true;
        });

        return filtered.sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
        );
    }, [filters]);
}
