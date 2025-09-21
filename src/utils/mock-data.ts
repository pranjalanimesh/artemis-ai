// src/utils/mock-data.ts

import { Case, Document, Finding } from './types';

// --- CASES ---
// This combines the detailed case/timeline data you provided with the other cases we created.
export const CASES: Case[] = [
    { 
        id: "case-001", 
        title: "Smith v. Acme Corp", 
        parties: ["John Smith", "Acme Corp"], 
        summary: "Breach of contract dispute over missed deliveries and liquidated damages.", 
        status: "Open", 
        type: "Civil", 
        filedAt: "2024-01-12", 
        updatedAt: "2025-08-30", 
        tags: ["contract", "damages", "priority"],
        timeline: [
            { date: "2024-01-12", title: "Complaint Filed", category: "Filing", description: "Plaintiff filed complaint alleging breach of contract.", sourceUrl: "https://example.com/complaint.pdf", iconLabel: "PDF" },
            { date: "2024-02-10", title: "Answer Submitted", category: "Filing", description: "Defendant denied claims and raised affirmative defenses." },
            { date: "2024-04-03", title: "Scheduling Order", category: "Order", description: "Court set discovery and motion deadlines." },
            { date: "2024-07-19", title: "Discovery Requests Served", category: "Discovery", description: "RFPs and interrogatories exchanged." },
            { date: "2025-03-05", title: "Hearing on Motion to Compel", category: "Hearing", description: "Partial grant. Additional docs due in 14 days." },
            { date: "2025-08-30", title: "Settlement Talks Resume", category: "Settlement", description: "Parties agree to mediation in October." },
        ]
    },
    { 
        id: "case-002", 
        title: "State v. Jane Doe", 
        parties: ["State", "Jane Doe"], 
        summary: "Appeal following conviction. Focusing on evidentiary rulings.", 
        status: "Appeal", 
        type: "Criminal", 
        filedAt: "2023-11-02", 
        updatedAt: "2025-06-11", 
        tags: ["felony", "appeal"],
        timeline: [
            { date: "2023-11-02", title: "Charges Filed", category: "Filing" },
            { date: "2024-05-21", title: "Jury Verdict", category: "Order", description: "Guilty on count 1. Not guilty on count 2." },
            { date: "2024-07-01", title: "Notice of Appeal", category: "Appeal" },
            { date: "2025-06-11", title: "Oral Argument Held", category: "Hearing" },
        ]
    },
    { 
        id: "case-003", 
        title: "Omega LLC v. Vector Labs", 
        parties: ["Omega LLC", "Vector Labs"], 
        summary: "Patent infringement suit stayed pending IPR at PTAB.", 
        status: "Stayed", 
        type: "IP", 
        filedAt: "2024-09-15", 
        updatedAt: "2025-04-02", 
        tags: ["patent", "stay", "PTAB"],
        timeline: [
            { date: "2024-09-15", title: "Complaint Filed", category: "Filing" },
            { date: "2025-02-20", title: "IPR Instituted", category: "Order" },
            { date: "2025-04-02", title: "Case Stayed", category: "Order" },
        ]
    },
    { 
        id: "case-004", 
        title: "Johnson, Mary - Medical Review", 
        parties: ["Mary Johnson"], 
        summary: "Standard medical review for insurance claim.", 
        status: "Open", 
        type: "Civil", 
        filedAt: "2024-01-15", 
        updatedAt: "2025-01-15", 
        tags: ["insurance", "review"],
        timeline: [
            { date: '2024-01-15', title: 'Case Initiated & Records Received', category: 'Filing' }
        ]
    },
];

// --- DOCUMENTS ---
// Logically linked to the cases above.
export const DOCUMENTS: Document[] = [
    // Documents for Johnson, Mary (case-004)
    { id: 'doc-001', caseId: 'case-004', patientName: 'Johnson, Mary', fileName: 'Medical Records', type: 'Medical Records', status: 'Processed', uploadedAt: 'Jan 15, 2024', pages: 487, size: '12.4 MB' },
    
    // Documents for Smith, John (case-001)
    { id: 'doc-002', caseId: 'case-001', patientName: 'Smith, John', fileName: 'Hospital Records', type: 'Hospital Records', status: 'Processing', uploadedAt: 'Jan 14, 2024', pages: 234, size: '8.7 MB' },
    { id: 'doc-003', caseId: 'case-001', patientName: 'Smith, John', fileName: 'Dr. Smith - Orthopedic Consultation.pdf', type: 'Consultation Report', status: 'Processed', uploadedAt: 'Jan 15, 2024', pages: 12, size: '1.1 MB' },
    { id: 'doc-004', caseId: 'case-001', patientName: 'Smith, John', fileName: 'Physical Therapy Initial Evaluation.pdf', type: 'Therapy Notes', status: 'Processed', uploadedAt: 'Jan 20, 2024', pages: 8, size: '0.8 MB' },
    { id: 'doc-005', caseId: 'case-001', patientName: 'Smith, John', fileName: 'Pain Management Notes.pdf', type: 'Specialist Notes', status: 'Processed', uploadedAt: 'Jan 15, 2024', pages: 5, size: '0.5 MB' },
    { id: 'doc-007', caseId: 'case-001', patientName: 'Smith, John', fileName: 'MRI Lumbar Spine Report.pdf', type: 'Imaging Report', status: 'Processed', uploadedAt: 'Jan 10, 2024', pages: 3, size: '1.4 MB' },
    { id: 'doc-008', caseId: 'case-001', patientName: 'Smith, John', fileName: 'Primary Care Visit Notes.pdf', type: 'Visit Notes', status: 'Processed', uploadedAt: 'Jan 12, 2024', pages: 6, size: '0.6 MB' },
];

// --- FINDINGS ---
// Mapped to documents and cases by their IDs.
export const FINDINGS: Finding[] = [
    // Findings from documents related to Smith, John (case-001)
    { id: 'find-001', documentId: 'doc-003', caseId: 'case-001', type: 'Diagnosis', category: 'Musculoskeletal', description: 'Chronic lower back pain with L4-L5 disc herniation and radiculopathy affecting the left leg', date: '1/15/2024', provider: 'Dr. Michael Smith, MD', confidence: 95 },
    { id: 'find-002', documentId: 'doc-004', caseId: 'case-001', type: 'Treatment', category: 'Musculoskeletal', description: 'Physical therapy sessions, 3x weekly for 6 weeks focusing on core strengthening and flexibility', date: '1/20/2024', provider: 'Sarah Johnson, PT', confidence: 88 },
    { id: 'find-003', documentId: 'doc-003', caseId: 'case-001', type: 'Medication', category: 'Musculoskeletal', description: 'Prescribed Ibuprofen 600mg TID for inflammation and Gabapentin 300mg BID for neuropathic pain', date: '1/15/2024', provider: 'Dr. Michael Smith, MD', confidence: 92 },
    { id: 'find-004', documentId: 'doc-007', caseId: 'case-001', type: 'Test Result', category: 'Musculoskeletal', description: 'MRI lumbar spine shows moderate to severe disc herniation at L4-L5 with neural foraminal narrowing', date: '1/10/2024', provider: 'Dr. Lisa Chen, MD', confidence: 98 },
    { id: 'find-005', documentId: 'doc-003', caseId: 'case-001', type: 'Symptom', category: 'Nervous System', description: 'Patient reports severe shooting pain down left leg, numbness in left foot, difficulty walking', date: '1/15/2024', provider: 'Dr. Michael Smith, MD', confidence: 85 },
    { id: 'find-006', documentId: 'doc-008', caseId: 'case-001', type: 'Diagnosis', category: 'Cardiovascular', description: 'Hypertension, well-controlled on current medication regimen', date: '1/12/2024', provider: 'Dr. Robert Wilson, MD', confidence: 78 },
    { id: 'find-007', documentId: 'doc-005', caseId: 'case-001', type: 'Medication', category: 'Pain Management', description: 'Tylenol 500mg PRN for breakthrough pain, not to exceed 4g/day', date: '1/15/2024', provider: 'Dr. Michael Smith, MD', confidence: 93 },
];