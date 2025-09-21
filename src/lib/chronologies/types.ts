export type CaseStatus = "Open" | "Closed" | "Stayed" | "Appeal";
export type CaseType = "Civil" | "Criminal" | "Family" | "Corporate" | "IP" | "Other";


export type TimelineCategory =
| "Filing"
| "Motion"
| "Order"
| "Hearing"
| "Discovery"
| "Evidence"
| "Settlement"
| "Appeal"
| "Other";


export interface TimelineItem {
date: string; // ISO date
title: string;
description?: string;
sourceUrl?: string;
category?: TimelineCategory;
iconLabel?: string; // small badge label, e.g., "PDF"
}


export interface CaseRecord {
id: string;
title: string; // e.g., "Smith v. Acme"
parties: string[];
type: CaseType;
status: CaseStatus;
filedAt: string; // ISO date
updatedAt: string; // ISO date
tags: string[];
summary?: string;
timeline: TimelineItem[];
}