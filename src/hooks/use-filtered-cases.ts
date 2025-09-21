import React from "react";
import { useSearchParams } from "next/navigation";
import { CASES } from "@/utils/mock-data";
import { Case } from "@/utils/types";

export function useFilteredCases(): Case[] {
    const params = useSearchParams();

    // Memoize the filter parameters themselves
    const filters = React.useMemo(() => ({
        q: params.get("q")?.toLowerCase() || "",
        type: params.get("type"),
        status: params.get("status"),
        from: params.get("from"),
        to: params.get("to"),
        tags: params.get("tags")?.split(",").filter(Boolean) || [],
    }), [params]);

    return React.useMemo(() => {
        const fromDate = filters.from ? new Date(filters.from) : null;
        const toDate = filters.to ? new Date(filters.to) : null;

        // Guard against invalid date inputs
        if (fromDate && isNaN(fromDate.getTime())) return [];
        if (toDate && isNaN(toDate.getTime())) return [];

        const filtered = CASES.filter(c => {
            // Text search condition
            if (filters.q && !c.title.toLowerCase().includes(filters.q) && !c.parties.join(" ").toLowerCase().includes(filters.q)) {
                return false;
            }

            // Select filter conditions
            if (filters.type && !filters.type.includes("All") && c.type !== filters.type) {
                return false;
            }
            if (filters.status && !filters.status.includes("All") && c.status !== filters.status) {
                return false;
            }

            // Tags condition (must have all selected tags)
            if (filters.tags.length > 0 && !filters.tags.every(t => c.tags.includes(t))) {
                return false;
            }

            // Date range condition
            const filedDate = new Date(c.filedAt);
            if (isNaN(filedDate.getTime())) return true; // Don't filter out items with invalid dates

            if (fromDate && filedDate < fromDate) {
                return false;
            }
            // Add 1 day to 'toDate' to make the range inclusive of the selected day
            if (toDate && filedDate > new Date(toDate.getTime() + 86400000)) {
                return false;
            }

            return true;
        });

        // Sort the results by update date, descending
        return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    }, [filters]);
}