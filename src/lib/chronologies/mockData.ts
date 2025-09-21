import { CaseRecord } from "./types";

export const CASES: CaseRecord[] = [
    {
        id: "smith-v-acme",
        title: "Smith v. Acme Corp",
        parties: ["John Smith", "Acme Corp"],
        type: "Civil",
        status: "Open",
        filedAt: "2024-01-12",
        updatedAt: "2025-08-30",
        tags: ["contract", "damages", "priority"],
        summary:
            "Breach of contract dispute over missed deliveries and liquidated damages.",
        timeline: [
            {
                date: "2024-01-12",
                title: "Complaint Filed",
                description:
                    "Plaintiff filed complaint alleging breach of contract.",
                category: "Filing",
                sourceUrl: "https://example.com/complaint.pdf",
                iconLabel: "PDF",
            },
            {
                date: "2024-02-10",
                title: "Answer Submitted",
                description:
                    "Defendant denied claims and raised affirmative defenses.",
                category: "Filing",
            },
            {
                date: "2024-04-03",
                title: "Scheduling Order",
                description: "Court set discovery and motion deadlines.",
                category: "Order",
            },
            {
                date: "2024-07-19",
                title: "Discovery Requests Served",
                description: "RFPs and interrogatories exchanged.",
                category: "Discovery",
            },
            {
                date: "2025-03-05",
                title: "Hearing on Motion to Compel",
                description: "Partial grant. Additional docs due in 14 days.",
                category: "Hearing",
            },
            {
                date: "2025-08-30",
                title: "Settlement Talks Resume",
                description: "Parties agree to mediation in October.",
                category: "Settlement",
            },
        ],
    },
    {
        id: "state-v-doe",
        title: "State v. Jane Doe",
        parties: ["State", "Jane Doe"],
        type: "Criminal",
        status: "Appeal",
        filedAt: "2023-11-02",
        updatedAt: "2025-06-11",
        tags: ["felony", "appeal"],
        summary:
            "Appeal following conviction. Focusing on evidentiary rulings.",
        timeline: [
            {
                date: "2023-11-02",
                title: "Charges Filed",
                category: "Filing",
            },
            {
                date: "2024-05-21",
                title: "Jury Verdict",
                description: "Guilty on count 1. Not guilty on count 2.",
                category: "Order",
            },
            {
                date: "2024-07-01",
                title: "Notice of Appeal",
                category: "Appeal",
            },
            {
                date: "2025-06-11",
                title: "Oral Argument Held",
                category: "Hearing",
            },
        ],
    },
    {
        id: "patent-omega",
        title: "Omega LLC v. Vector Labs",
        parties: ["Omega LLC", "Vector Labs"],
        type: "IP",
        status: "Stayed",
        filedAt: "2024-09-15",
        updatedAt: "2025-04-02",
        tags: ["patent", "stay", "PTAB"],
        summary: "Patent infringement suit stayed pending IPR at PTAB.",
        timeline: [
            {
                date: "2024-09-15",
                title: "Complaint Filed",
                category: "Filing",
            },
            { date: "2025-02-20", title: "IPR Instituted", category: "Order" },
            { date: "2025-04-02", title: "Case Stayed", category: "Order" },
        ],
    },
];
