// src/utils/types.ts

// --- Core Case and Timeline Types ---

export type CaseType =
    | "Civil"
    | "Criminal"
    | "Family"
    | "Corporate"
    | "IP"
    | "Other";

export type CaseStatus = "Open" | "Closed" | "Stayed" | "Appeal";

export type TimelineCategory =
    | "Filing"
    | "Order"
    | "Discovery"
    | "Hearing"
    | "Settlement"
    | "Appeal"
    | "Motion"
    | "Evidence"
    | "Other";

/**
 * Represents a single event or entry in a case's timeline.
 */
export type TimelineEvent = {
    date: string; // ISO date format (e.g., "2024-01-12")
    title: string;
    category: TimelineCategory;
    description?: string;
    sourceUrl?: string;
    iconLabel?: string; // A short label for an icon, e.g., "PDF"
    localPath?: string; // Local file path if uploaded
};

/**
 * The main record for a single legal case, now with the timeline embedded directly.
 */
export type Case = {
    id: string;
    title: string;
    parties: string[];
    summary: string;
    status: CaseStatus;
    type: CaseType;
    filedAt: string;
    updatedAt: string;
    tags: string[];
    timeline: TimelineEvent[]; // The detailed chronology is now part of the case
};

// --- Document and Finding Types (Still needed for other parts of the app) ---

/**
 * Represents a single uploaded source document.
 */
export type Document = {
    id: string;
    caseId: string; // Foreign key to Case
    patientName: string;
    fileName: string;
    type: string;
    status: "Processed" | "Processing" | "Error";
    uploadedAt: string;
    pages: number;
    size: string;
    previewUrl?: string;
    localPath?: string; 
};

/**
 * Represents a single AI-extracted medical finding from a document.
 */
export type Finding = {
    id: string;
    documentId: string; // Foreign key to Document
    caseId: string; // Foreign key to Case
    type: "Diagnosis" | "Treatment" | "Medication" | "Test Result" | "Symptom";
    category: string;
    description: string;
    date: string;
    provider: string;
    confidence: number;
};
