// NEW FILE
"use client";
import { CASES } from "@/utils/mock-data";
import type { Case } from "@/utils/types";

const STORAGE_KEY = "localCases";
const UPDATE_EVENT = "localCasesUpdated";

function readLocal(): Case[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function writeLocal(list: Case[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}
export function getAllCases(): Case[] { return [...CASES, ...readLocal()]; }
export function addLocalCase(partial: Partial<Case>): Case {
  const now = new Date().toISOString().slice(0,10);
  const c: Case = {
    id: `local-${Date.now()}`,
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
export function onCasesChanged(cb: () => void) {
  window.addEventListener(UPDATE_EVENT, cb);
  window.addEventListener("storage", (e) => { if (e.key === STORAGE_KEY) cb(); });
  return () => window.removeEventListener(UPDATE_EVENT, cb);
}
