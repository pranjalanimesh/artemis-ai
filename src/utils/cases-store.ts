// NEW/UPDATED FILE
"use client";
import { CASES } from "@/utils/mock-data";
import type { Case, TimelineEvent } from "@/utils/types";

const STORAGE_KEY = "localCases";
const UPDATE_EVENT = "localCasesUpdated";

function readLocal(): Case[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function writeLocal(list: Case[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  if (typeof window !== "undefined") window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function getAllCases(): Case[] {
  // Prefer local overrides if same id exists
  const local = readLocal();
  const localIds = new Set(local.map(c => c.id));
  return [...local, ...CASES.filter(c => !localIds.has(c.id))];
}

export function addLocalCase(partial: Partial<Case>): Case {
  const now = new Date().toISOString().slice(0,10);
  const c: Case = {
    id: partial.id || `local-${Date.now()}`,
    title: partial.title || "Untitled Case",
    parties: partial.parties || [],
    summary: partial.summary || "",
    status: partial.status || "Open",
    type: partial.type || "Other",
    filedAt: partial.filedAt || now,
    updatedAt: partial.updatedAt || now,
    tags: partial.tags || ["local"],
    timeline: partial.timeline || []
  };
  const list = readLocal();
  writeLocal([c, ...list]);
  return c;
}

export function updateLocalCase(id: string, updater: (c: Case) => Case): boolean {
  const list = readLocal();
  const idx = list.findIndex(c => c.id === id);
  if (idx === -1) return false;
  const next = updater(list[idx]);
  list[idx] = { ...next, updatedAt: new Date().toISOString().slice(0,10) };
  writeLocal(list);
  return true;
}

export function appendTimelineEvents(id: string, events: TimelineEvent[]): boolean {
  return updateLocalCase(id, (c) => {
    const existingKeys = new Set(c.timeline.map(t => `${t.date}|${t.title}`));
    const deduped = events.filter(e => !existingKeys.has(`${e.date}|${e.title}`));
    return { ...c, timeline: [...c.timeline, ...deduped] };
  });
}

export function onCasesChanged(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(UPDATE_EVENT, handler);
  window.addEventListener("storage", (e) => { if (e.key === STORAGE_KEY) cb(); });
  return () => {
    window.removeEventListener(UPDATE_EVENT, handler);
    window.removeEventListener("storage", handler as any);
  };
}

/** One-shot medical enrichment for demo uploads. Safe to call multiple times. */
export function enrichCaseWithHardcodedMedical(caseId: string): boolean {
  const list = readLocal();
  const idx = list.findIndex(c => c.id === caseId);
  if (idx === -1) return false; // only enrich true local cases
  const caseRec = list[idx];

  // Guard to avoid re-enrichment noise
  if (caseRec.tags?.includes("auto-enriched")) return false;

  const ev = (date: string, title: string, description: string): TimelineEvent => ({
    date, title, description, category: "Evidence" // constrained union; use Evidence bucket
  });

  const events: TimelineEvent[] = [
    ev("2005-01-18","Lipid Panel: High Cholesterol","Total 220, LDL 140, HDL 50, TG 100. Monitor and lifestyle counseling."),
    ev("2005-01-20","Routine Physical Exam","Normal exam. Healthy male. Plan: diet and exercise; yearly follow-up."),
    ev("2010-03-15","Diagnosis: Essential Hypertension (I10)","BP ~155/95 to 150/92. Headaches. Start Lisinopril 10 mg daily; DASH diet; home BP log."),
    ev("2012-08-01","GI Consult for IBD Symptoms","6 months of pain and bloody diarrhea. Colonoscopy scheduled."),
    ev("2012-08-22","Colonoscopy Findings","Proctosigmoiditis with friability and ulcerations. Biopsies taken."),
    ev("2012-08-29","Pathology: Chronic Active Colitis","Features consistent with Ulcerative Colitis. No dysplasia."),
    ev("2012-09-01","Diagnosis: Ulcerative Colitis","Start Mesalamine oral + rectal. Diet guidance; follow-up planned."),
    ev("2014-11-05","Admission: Acute Kidney Injury","Cr 3.2, BUN 45, K 5.5, Na 130 with dehydration. Hold ACEi. IV fluids."),
    ev("2014-11-08","Discharge: AKI Improved","Cr 1.8. Resume Lisinopril 5 mg. Instructions: hydration, avoid NSAIDs."),
    ev("2016-05-10","Diagnosis: Primary Hypothyroidism (Hashimoto)","TSH 8.5 high, Free T4 0.7 low, TPO Ab positive. Start Levothyroxine 50 mcg."),
    ev("2016-05-12","Thyroid Treatment Plan","Education on dosing and recheck labs in 6–8 weeks."),
    ev("2017-07-25","Elevated Liver Enzymes","AST 55, ALT 60. Order abdominal ultrasound; counsel on lifestyle."),
    ev("2017-08-01","Abdominal Ultrasound: Normal","No hepatic steatosis or structural abnormality."),
    ev("2019-02-05","Scrotal Ultrasound: Right Testicular Mass","2.5 cm hypoechoic mass. Tumor markers normal except LDH 280."),
    ev("2019-02-18","Surgery: Right Radical Orchiectomy","Uneventful procedure. Specimen sent to pathology."),
    ev("2019-02-25","Pathology: Classic Seminoma pT1","Confined to testis. Margins negative. No LVI."),
    ev("2019-03-10","Oncology Plan: Active Surveillance","Stage I seminoma. Imaging and markers per protocol."),
    ev("2020-09-10","Diagnosis: Fibromyalgia","Meets ACR criteria. Start Amitriptyline 25 mg qHS; PT, CBT referrals."),
    ev("2022-04-15","CT A/P w/ Contrast: Surveillance","No evidence of recurrence or metastasis. Stable compared to 2021."),
    ev("2022-04-16","Radiology Report Finalized","Continue surveillance per protocol.")
  ];

  const updated: Case = {
    ...caseRec,
    tags: Array.from(new Set([...(caseRec.tags || []), "auto-enriched", "medical"])),
    summary: caseRec.summary || "Auto-enriched from uploaded medical records.",
    updatedAt: new Date().toISOString().slice(0,10),
    timeline: [...caseRec.timeline, ...events]
  };

  list[idx] = updated;
  writeLocal(list);
  return true;
}
