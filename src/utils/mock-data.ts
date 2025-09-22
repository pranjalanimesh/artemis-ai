// src/utils/mock-data.ts
import { Case, Document, Finding } from "./types";

export const CASES: Case[] = [
  {
    id: "case-101",
    title: "Johnson v. Metro Transit",
    parties: ["Angela Johnson", "Metro Transit Authority"],
    summary:
      "Rear-end bus collision causing cervical sprain/strain, post-concussive syndrome, and chronic myofascial pain. Dispute centers on liability apportionment, necessity of future care, and wage-loss duration.",
    status: "Open",
    type: "Personal Injury",
    filedAt: "2024-02-06",
    updatedAt: "2025-09-10",
    tags: ["auto-bus", "TBI", "soft-tissue", "wage-loss", "priority"],
    timeline: [
      { date: "2023-12-18", title: "Incident", category: "Incident", description: "City bus failed to stop in time. Plaintiff vehicle impacted at ~25 mph. EMS transport to ER." },
      { date: "2023-12-18", title: "ER Evaluation", category: "Medical", description: "CT head negative for bleed. Diagnosed concussion and cervical strain. Discharged with precautions." },
      { date: "2024-01-05", title: "Treatment Plan Initiated", category: "Medical", description: "PT 2–3x/week, vestibular therapy, naproxen, cyclobenzaprine." },
      { date: "2024-02-06", title: "Complaint Filed", category: "Filing", description: "Negligence alleging failure to maintain assured clear distance; damages pled for medicals, wage loss, and pain/suffering.", sourceUrl: "https://example.com/complaint-johnson.pdf", iconLabel: "PDF" },
      { date: "2024-03-01", title: "Answer & Initial Disclosures", category: "Filing", description: "Defendant admits rear impact but contests causation and duration of symptoms." },
      { date: "2024-05-14", title: "IME Scheduled", category: "Discovery", description: "Defense IME with orthopedist; dispute over scope of neuropsych testing." },
      { date: "2024-09-30", title: "Motion to Compel PT Records", category: "Motion", description: "Court orders production within 14 days; protective order entered." },
      { date: "2025-04-22", title: "Mediation Session I", category: "Settlement", description: "No global resolution. Parties exchange revised demands and offers." },
      { date: "2025-09-10", title: "Pretrial Conference Set", category: "Order", description: "Trial window set for Q1 2026; supplemental expert disclosures due Nov 15, 2025." }
    ]
  },
  {
    id: "case-102",
    title: "In re 3M Combat Arms Earplugs — Claim of David Miller",
    parties: ["David Miller", "3M Company"],
    summary:
      "Mass-tort hearing loss and tinnitus claim tied to alleged design defects in Combat Arms Earplugs Version 2. Claim involves service records, audiograms, and causation apportionment versus occupational noise.",
    status: "Closed",
    type: "Product Liability",
    filedAt: "2024-03-19",
    updatedAt: "2025-08-28",
    tags: ["3M", "hearing-loss", "tinnitus", "MDL-program"],
    timeline: [
      { date: "2009-06-10", title: "Active Duty Noise Exposure", category: "Background", description: "Artillery training with intermittent HPD use per unit logs." },
      { date: "2011-02-03", title: "Baseline Audiogram", category: "Medical", description: "Mild high-frequency threshold shift at 4–6 kHz." },
      { date: "2024-03-19", title: "Short Form Complaint Filed", category: "Filing", description: "Direct filing to coordinated proceeding using SFC referencing master complaint." },
      { date: "2024-07-08", title: "DD214 & Service Records Produced", category: "Discovery", description: "Production includes deployment orders and hearing conservation data." },
      { date: "2025-01-21", title: "ENT Evaluation", category: "Medical", description: "Diagnosis of bilateral high-frequency SNHL and constant tinnitus. Causation opinion links to military noise exposure." },
      { date: "2025-05-02", title: "Settlement Program Registration", category: "Settlement", description: "Claimant registers; awaits category assignment and points review." },
      { date: "2025-08-28", title: "Deficiency Cure Submitted", category: "Discovery", description: "Uploaded missing audiology calibration page and authorization forms." }
    ]
  },
  {
    id: "case-103",
    title: "In re Bard Hernia Mesh — Claim of Maria Santos",
    parties: ["Maria Santos", "C.R. Bard, Inc."],
    summary:
      "Post-hernia-repair complications attributed to polypropylene mesh including chronic pain, seroma, and adhesion formation requiring revision surgery. Dispute focuses on device warnings and differential etiology.",
    status: "Stayed",
    type: "Product Liability",
    filedAt: "2023-11-27",
    updatedAt: "2025-07-30",
    tags: ["Bard", "hernia-mesh", "revision-surgery", "mass-tort"],
    timeline: [
      { date: "2021-09-12", title: "Initial Hernia Repair", category: "Medical", description: "Umbilical hernia repair with Bard device." },
      { date: "2023-11-27", title: "Short Form Complaint Filed", category: "Filing", description: "SFC referencing Bard Master Complaint; jury demand endorsed." },
      { date: "2024-03-18", title: "Product Identification", category: "Discovery", description: "Implant stickers and UDI confirmed. Chain of custody secured." },
      { date: "2024-10-09", title: "Revision Surgery", category: "Medical", description: "Explanted mesh with dense adhesions; pathology retained." },
      { date: "2025-02-11", title: "Case Management Order", category: "Order", description: "CMO sets Plaintiff Fact Sheet and medical record deadlines." },
      { date: "2025-07-30", title: "Mediation Scheduled", category: "Settlement", description: "Participating in inventory mediation tranche 2." }
    ]
  },
  {
    id: "case-104",
    title: "Perez v. Allen, M.D. and City Hospital",
    parties: ["Daniel Perez", "Dr. Richard Allen", "City Hospital"],
    summary:
      "Alleged retained surgical sponge after laparoscopic cholecystectomy resulting in infection, sepsis, and prolonged hospitalization. Claims for negligence, negligent credentialing, and spoliation related to missing count sheet.",
    status: "Appeal",
    type: "Medical Malpractice",
    filedAt: "2024-06-05",
    updatedAt: "2025-08-02",
    tags: ["retained-foreign-body", "infection", "hospital-policy"],
    timeline: [
      { date: "2024-02-17", title: "Surgery Performed", category: "Medical", description: "Lap chole; Uneventful intra-op per op note." },
      { date: "2024-03-03", title: "Readmission", category: "Medical", description: "Fever and abdominal pain; CT shows radiopaque marker suspicious for sponge." },
      { date: "2024-03-05", title: "Exploratory Laparotomy", category: "Medical", description: "Foreign body removed; cultures positive; PICC line antibiotics." },
      { date: "2024-06-05", title: "Complaint Filed", category: "Filing", description: "Counts in negligence and negligent credentialing; demand for jury." },
      { date: "2024-12-12", title: "Protective Order on Peer Review", category: "Order", description: "Hospital incident report produced under protective order." },
      { date: "2025-08-02", title: "Expert Reports Served", category: "Discovery", description: "Surgical nursing standard-of-care expert and infectious disease causation disclosed." }
    ]
  },
  {
    id: "case-105",
    title: "Thompson v. City of Brookview",
    parties: ["Kelly Thompson", "City of Brookview"],
    summary:
      "Trip-and-fall on raised sidewalk slab causing distal radius fracture and complex regional pain syndrome. Liability hinges on notice and repair logs; damages dispute over permanency and vocational limits.",
    status: "Closed",
    type: "Premises Liability",
    filedAt: "2024-01-22",
    updatedAt: "2025-05-26",
    tags: ["fall", "CRPS", "municipal-immunity"],
    timeline: [
      { date: "2023-12-02", title: "Incident", category: "Incident", description: "Caught toe on 1.5-inch differential. Witness statements taken." },
      { date: "2023-12-02", title: "ER Casting", category: "Medical", description: "Closed reduction and casting of right wrist." },
      { date: "2024-01-22", title: "Notice of Claim & Complaint", category: "Filing", description: "Filed per municipal notice statute; suit commenced after statutory period." },
      { date: "2024-06-10", title: "Repair Records Produced", category: "Discovery", description: "City log shows prior complaints on same slab." },
      { date: "2025-03-14", title: "Pain Management Injections", category: "Medical", description: "Stellate ganglion blocks x3 with partial relief." },
      { date: "2025-05-26", title: "Settlement Conference", category: "Settlement", description: "Court-hosted conference; parties within 20% but no agreement." }
    ]
  },
  {
    id: "case-106",
    title: "Nguyen v. RideShare Co.",
    parties: ["Hanh Nguyen", "RideShare Co."],
    summary:
      "Rideshare collision with side-impact at intersection causing lumbar disc herniation, radiculopathy, and PTSD symptoms. Dispute over comparative fault and biomechanical forces given low property damage photos.",
    status: "Open",
    type: "Personal Injury",
    filedAt: "2024-09-03",
    updatedAt: "2025-09-12",
    tags: ["rideshare", "lumbar-HNP", "PTSD", "comparative-fault"],
    timeline: [
      { date: "2024-08-11", title: "Collision", category: "Incident", description: "Driver ran red light per two independent witnesses." },
      { date: "2024-08-12", title: "MRI Ordered", category: "Medical", description: "L4–L5 left paracentral herniation contacting L5 nerve root." },
      { date: "2024-09-03", title: "Complaint Filed", category: "Filing", description: "Negligence and respondeat superior against platform." },
      { date: "2025-01-09", title: "Defense Biomechanics Disclosure", category: "Discovery", description: "Defense expert claims delta-V insufficient to cause HNP." },
      { date: "2025-06-21", title: "Plaintiff ESI Production", category: "Discovery", description: "Ride data, trip receipts, in-app communications produced." },
      { date: "2025-09-12", title: "Mediation Set", category: "Settlement", description: "Private mediation scheduled for October 28, 2025." }
    ]
  },
  {
    id: "case-107",
    title: "In re Exactech Hip Implant — Claim of Robert King",
    parties: ["Robert King", "Exactech, Inc."],
    summary:
      "Accelerated polyethylene wear and osteolysis after hip arthroplasty subject to recall. Plaintiff underwent revision surgery; claims inadequate warnings and defective packaging leading to oxidation.",
    status: "Closed",
    type: "Product Liability",
    filedAt: "2024-04-29",
    updatedAt: "2025-07-08",
    tags: ["Exactech", "hip-implant", "revision", "recall"],
    timeline: [
      { date: "2019-05-20", title: "Primary THA", category: "Medical", description: "Total hip arthroplasty using Exactech components." },
      { date: "2023-12-01", title: "Recall Notice Received", category: "Notice", description: "Surgeon notified patient of recall risk." },
      { date: "2024-04-29", title: "Short Form Complaint", category: "Filing", description: "Filed into coordinated proceeding with jury demand." },
      { date: "2024-11-18", title: "Revision Surgery", category: "Medical", description: "Poly liner exchange and debridement; pathology shows wear debris." },
      { date: "2025-03-04", title: "Device Preservation", category: "Discovery", description: "Explanted components cataloged and preserved for inspection." },
      { date: "2025-07-08", title: "Expert Scheduling Order", category: "Order", description: "Plaintiff expert disclosures due Oct 1, 2025." }
    ]
  },
  {
    id: "case-108",
    title: "Williams v. HomeKlean Corp.",
    parties: ["Tanya Williams", "HomeKlean Corp."],
    summary:
      "Household drain cleaner splash causing second-degree chemical burns to forearm and wrist. Claims inadequate PPE warnings and defective child-resistant closure that failed during opening.",
    status: "Open",
    type: "Product Liability",
    filedAt: "2025-02-13",
    updatedAt: "2025-08-18",
    tags: ["chemical-burn", "consumer-product", "warnings"],
    timeline: [
      { date: "2025-01-28", title: "Incident and Urgent Care", category: "Medical", description: "Immediate irrigation and silver sulfadiazine. Tdap updated." },
      { date: "2025-02-13", title: "Complaint Filed", category: "Filing", description: "Strict liability and negligence; punitive claim reserved." },
      { date: "2025-04-07", title: "Product Testing", category: "Discovery", description: "Exemplar bottle and subject product submitted to lab for torque and seal testing." },
      { date: "2025-06-22", title: "Rule 26 Disclosures", category: "Discovery", description: "Plaintiff discloses treating physicians and burn photos." },
      { date: "2025-08-18", title: "Settlement Dialogue", category: "Settlement", description: "Early negotiation explored; parties far apart pending lab results." }
    ]
  },
  {
  id: "case-109",
  title: "PFOA Exposure Litigation — Claim of John Doe",
  parties: ["John Doe", "ChemCo Industries"],
  summary:
    "Toxic tort case alleging chronic exposure to perfluorooctanoic acid (PFOA) from local water supply causing multi-system health issues. Includes extensive medical history, lab results, and expert causation opinions.",
  status: "Open",
  type: "Toxic Tort",
  filedAt: "2025-09-20",
  updatedAt: "2025-09-22",
  tags: ["PFOA", "toxic-tort", "environmental"],
  timeline: [
    { date: "2005-01-20", title: "Routine Physical Exam", category: "Medical", description: "Baseline cholesterol elevation noted, otherwise normal." },
    { date: "2010-03-15", title: "Hypertension Diagnosis", category: "Medical", description: "Started Lisinopril 10 mg daily, DASH diet counseling." },
    { date: "2012-08-22", title: "Colonoscopy & UC Diagnosis", category: "Medical", description: "Confirmed ulcerative colitis; initiated mesalamine therapy." },
    { date: "2014-11-05", title: "Hospital Admission for AKI", category: "Medical", description: "Creatinine peaked at 3.2 mg/dL, improved with IV fluids." },
    { date: "2016-05-10", title: "Hashimoto Hypothyroidism", category: "Medical", description: "Levothyroxine started; regular monitoring advised." },
    { date: "2019-02-18", title: "Orchiectomy — Seminoma Stage I", category: "Medical", description: "Right radical orchiectomy performed; pathology pT1." },
    { date: "2020-09-10", title: "Fibromyalgia Diagnosis", category: "Medical", description: "Amitriptyline started; PT and CBT referrals made." },
    { date: "2022-04-15", title: "CT Surveillance", category: "Imaging", description: "No recurrence or metastasis seen." },
    { date: "2025-09-20", title: "Complaint Filed", category: "Filing", description: "Suit filed alleging causation from chronic PFOA exposure." }
  ]
}

];

export const DOCUMENTS: Document[] = [
  { id: "doc-101", caseId: "case-101", patientName: "Johnson, Angela", fileName: "ER Records 12-18-2023.pdf", type: "Hospital Records", status: "Processed", uploadedAt: "Dec 21, 2023", pages: 42, size: "3.1 MB", localPath: "/pdfs/pathology_report.pdf" },
  { id: "doc-102", caseId: "case-101", patientName: "Johnson, Angela", fileName: "MRI Cervical Spine 01-09-2024.pdf", type: "Imaging Report", status: "Processed", uploadedAt: "Jan 12, 2024", pages: 4, size: "0.9 MB" },
  { id: "doc-103", caseId: "case-101", patientName: "Johnson, Angela", fileName: "Physical Therapy Notes Jan–Apr 2024.pdf", type: "Therapy Notes", status: "Processed", uploadedAt: "Apr 29, 2024", pages: 68, size: "6.2 MB" },

  { id: "doc-201", caseId: "case-102", patientName: "Miller, David", fileName: "DD214 and Service Records.pdf", type: "Service Records", status: "Processed", uploadedAt: "Jul 08, 2024", pages: 55, size: "7.4 MB" },
  { id: "doc-202", caseId: "case-102", patientName: "Miller, David", fileName: "Audiology Pack 2011–2025.pdf", type: "Audiology", status: "Processing", uploadedAt: "Jan 23, 2025", pages: 123, size: "10.9 MB" },

  { id: "doc-301", caseId: "case-103", patientName: "Santos, Maria", fileName: "Op Report 2021 Hernia Repair.pdf", type: "Operative Report", status: "Processed", uploadedAt: "Feb 02, 2024", pages: 6, size: "0.7 MB" },
  { id: "doc-302", caseId: "case-103", patientName: "Santos, Maria", fileName: "Revision Surgery Records 10-09-2024.pdf", type: "Hospital Records", status: "Processed", uploadedAt: "Oct 20, 2024", pages: 88, size: "9.2 MB" },
  { id: "doc-303", caseId: "case-103", patientName: "Santos, Maria", fileName: "Pathology Report Mesh Explant.pdf", type: "Pathology", status: "Processed", uploadedAt: "Oct 22, 2024", pages: 3, size: "0.4 MB" },

  { id: "doc-401", caseId: "case-104", patientName: "Perez, Daniel", fileName: "Operative Note 02-17-2024.pdf", type: "Operative Report", status: "Processed", uploadedAt: "Mar 01, 2024", pages: 5, size: "0.6 MB" },
  { id: "doc-402", caseId: "case-104", patientName: "Perez, Daniel", fileName: "CT Abdomen 03-03-2024.pdf", type: "Imaging Report", status: "Processed", uploadedAt: "Mar 04, 2024", pages: 2, size: "0.3 MB" },
  { id: "doc-403", caseId: "case-104", patientName: "Perez, Daniel", fileName: "Exploratory Laparotomy Op Note 03-05-2024.pdf", type: "Operative Report", status: "Processed", uploadedAt: "Mar 12, 2024", pages: 4, size: "0.5 MB" },

  { id: "doc-501", caseId: "case-105", patientName: "Thompson, Kelly", fileName: "ER Wrist Fracture 12-02-2023.pdf", type: "Hospital Records", status: "Processed", uploadedAt: "Dec 05, 2023", pages: 27, size: "2.2 MB" },
  { id: "doc-502", caseId: "case-105", patientName: "Thompson, Kelly", fileName: "Pain Management Notes 2025.pdf", type: "Specialist Notes", status: "Processing", uploadedAt: "Mar 18, 2025", pages: 19, size: "1.5 MB" },

  { id: "doc-601", caseId: "case-106", patientName: "Nguyen, Hanh", fileName: "Lumbar MRI 08-12-2024.pdf", type: "Imaging Report", status: "Processed", uploadedAt: "Aug 15, 2024", pages: 3, size: "0.8 MB" },
  { id: "doc-602", caseId: "case-106", patientName: "Nguyen, Hanh", fileName: "CBT Therapy Notes 2025 Q1.pdf", type: "Therapy Notes", status: "Processed", uploadedAt: "Apr 05, 2025", pages: 22, size: "1.2 MB" },

  { id: "doc-701", caseId: "case-107", patientName: "King, Robert", fileName: "Implant Stickers & UDI.pdf", type: "Device ID", status: "Processed", uploadedAt: "May 03, 2024", pages: 2, size: "0.2 MB" },
  { id: "doc-702", caseId: "case-107", patientName: "King, Robert", fileName: "Revision Surgery Packet 11-18-2024.pdf", type: "Hospital Records", status: "Processed", uploadedAt: "Nov 25, 2024", pages: 76, size: "7.8 MB" },

  { id: "doc-801", caseId: "case-108", patientName: "Williams, Tanya", fileName: "Urgent Care Burn Records 01-28-2025.pdf", type: "Clinic Records", status: "Processed", uploadedAt: "Feb 01, 2025", pages: 9, size: "0.9 MB" },
  { id: "doc-802", caseId: "case-108", patientName: "Williams, Tanya", fileName: "Product Testing Report Pending.pdf", type: "Lab Report", status: "Processing", uploadedAt: "Aug 05, 2025", pages: 0, size: "—" },

  {id:"doc-901",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-1-2.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:12,size:"0.10 MB",localPath:"/pdfs/pfoa/PFOA-1-2.pdf"},
  {id:"doc-902",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-3.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:6,size:"0.08 MB",localPath:"/pdfs/pfoa/PFOA-3.pdf"},
  {id:"doc-903",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-4-5.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:10,size:"0.09 MB",localPath:"/pdfs/pfoa/PFOA-4-5.pdf"},
  {id:"doc-904",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-6-7.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:8,size:"0.09 MB",localPath:"/pdfs/pfoa/PFOA-6-7.pdf"},
  {id:"doc-905",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-8-9.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:9,size:"0.10 MB",localPath:"/pdfs/pfoa/PFOA-8-9.pdf"},
  {id:"doc-906",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-10-11.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:12,size:"0.10 MB",localPath:"/pdfs/pfoa/PFOA-10-11.pdf"},
  {id:"doc-907",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-12-14.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:15,size:"0.11 MB",localPath:"/pdfs/pfoa/PFOA-12-14.pdf"},
  {id:"doc-908",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-15-16.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:8,size:"0.09 MB",localPath:"/pdfs/pfoa/PFOA-15-16.pdf"},
  {id:"doc-909",caseId:"case-109",patientName:"Doe, John",fileName:"PFOA-17-18.pdf",type:"Medical Record",status:"Processed",uploadedAt:"Sep 22, 2025",pages:7,size:"0.08 MB",localPath:"/pdfs/pfoa/PFOA-17-18.pdf"}

];

export const FINDINGS: Finding[] = [
  { id: "find-101", documentId: "doc-102", caseId: "case-101", type: "Test Result", category: "Musculoskeletal", description: "MRI cervical spine shows C5–C6 disc protrusion with mild canal narrowing; no myelopathy.", date: "1/09/2024", provider: "Dr. Patel, Radiology", confidence: 96 },
  { id: "find-102", documentId: "doc-103", caseId: "case-101", type: "Treatment", category: "Rehab", description: "PT with cervical stabilization and vestibular rehab, 24 sessions with partial improvement.", date: "4/15/2024", provider: "Emily Ross, DPT", confidence: 90 },

  { id: "find-201", documentId: "doc-201", caseId: "case-102", type: "Exposure", category: "Hearing", description: "Documented routine exposure to impulse noise >140 dBP during artillery training.", date: "7/08/2024", provider: "Army Hearing Conservation Program", confidence: 88 },
  { id: "find-202", documentId: "doc-202", caseId: "case-102", type: "Diagnosis", category: "Hearing", description: "Bilateral high-frequency sensorineural hearing loss with persistent tinnitus rated 7/10.", date: "1/21/2025", provider: "Dr. Nguyen, ENT", confidence: 93 },

  { id: "find-301", documentId: "doc-302", caseId: "case-103", type: "Treatment", category: "Surgery", description: "Revision hernia surgery with mesh explant and lysis of adhesions.", date: "10/09/2024", provider: "Dr. Collins, General Surgery", confidence: 97 },
  { id: "find-302", documentId: "doc-303", caseId: "case-103", type: "Pathology", category: "Implant", description: "Foreign-body giant cell reaction with polypropylene fibers identified.", date: "10/20/2024", provider: "Pathology Dept.", confidence: 95 },

  { id: "find-401", documentId: "doc-402", caseId: "case-104", type: "Test Result", category: "Abdominal", description: "CT abdomen reveals radiopaque linear density consistent with retained sponge.", date: "3/03/2024", provider: "Dr. Li, Radiology", confidence: 99 },
  { id: "find-402", documentId: "doc-403", caseId: "case-104", type: "Treatment", category: "Surgery", description: "Removal of retained foreign body with postoperative IV antibiotics for 14 days.", date: "3/05/2024", provider: "Dr. Allen, Surgery", confidence: 94 },

  { id: "find-501", documentId: "doc-501", caseId: "case-105", type: "Diagnosis", category: "Orthopedic", description: "Comminuted distal radius fracture treated with closed reduction and casting.", date: "12/02/2023", provider: "ER Attending", confidence: 92 },
  { id: "find-502", documentId: "doc-502", caseId: "case-105", type: "Diagnosis", category: "Pain", description: "Clinical features consistent with CRPS Type I of right upper extremity.", date: "3/18/2025", provider: "Dr. Ahmed, Pain Mgmt", confidence: 86 },

  { id: "find-601", documentId: "doc-601", caseId: "case-106", type: "Test Result", category: "Spine", description: "L4–L5 left paracentral herniation impinging L5 nerve root; mild facet arthropathy.", date: "8/12/2024", provider: "Dr. Romero, Radiology", confidence: 98 },
  { id: "find-602", documentId: "doc-602", caseId: "case-106", type: "Treatment", category: "Behavioral Health", description: "CBT addressing accident-related PTSD symptoms with improved sleep and reduced hypervigilance.", date: "4/05/2025", provider: "Laura Kim, PhD", confidence: 84 },

  { id: "find-701", documentId: "doc-702", caseId: "case-107", type: "Diagnosis", category: "Orthopedic", description: "Peri-acetabular osteolysis with elevated wear debris; component exchange performed.", date: "11/18/2024", provider: "Dr. Greene, Orthopedics", confidence: 95 },

  { id: "find-801", documentId: "doc-801", caseId: "case-108", type: "Diagnosis", category: "Burn", description: "Second-degree partial thickness burns forearm/wrist; conservative wound care with silver sulfadiazine.", date: "1/28/2025", provider: "PA Jackson", confidence: 91 },

  {id:"find-901",documentId:"doc-901",caseId:"case-109",type:"Lab Result",category:"Cholesterol",description:"Total cholesterol 220 mg/dL, LDL 140 mg/dL — borderline high.",date:"1/18/2005",provider:"Unity Diagnostics Lab",confidence:92},
  {id:"find-902",documentId:"doc-903",caseId:"case-109",type:"Diagnosis",category:"Hypertension",description:"Essential hypertension confirmed on multiple readings.",date:"3/15/2010",provider:"Dr. Evelyn Reed",confidence:95},
  {id:"find-903",documentId:"doc-904",caseId:"case-109",type:"Diagnosis",category:"IBD",description:"Ulcerative colitis confirmed by colonoscopy and biopsy.",date:"8/22/2012",provider:"Dr. Samuel Chen",confidence:98},
  {id:"find-904",documentId:"doc-905",caseId:"case-109",type:"Event",category:"Hospitalization",description:"Acute kidney injury treated with IV fluids; lisinopril held.",date:"11/05/2014",provider:"Dr. Laura Miller",confidence:97},
  {id:"find-905",documentId:"doc-906",caseId:"case-109",type:"Diagnosis",category:"Endocrine",description:"Primary hypothyroidism with positive TPO antibodies.",date:"5/10/2016",provider:"Dr. Sophia Chang",confidence:96},
  {id:"find-906",documentId:"doc-907",caseId:"case-109",type:"Diagnosis",category:"Oncology",description:"Stage I seminoma, right testis; orchiectomy performed.",date:"2/18/2019",provider:"Dr. Marcus Thorne",confidence:99},
  {id:"find-907",documentId:"doc-908",caseId:"case-109",type:"Diagnosis",category:"Rheumatology",description:"Fibromyalgia diagnosis meeting 2010 ACR criteria.",date:"9/10/2020",provider:"Dr. David Kim",confidence:94},
  {id:"find-908",documentId:"doc-909",caseId:"case-109",type:"Imaging",category:"Oncology",description:"CT abdomen/pelvis negative for recurrence.",date:"4/15/2022",provider:"Dr. Robert Lee",confidence:98}

];
