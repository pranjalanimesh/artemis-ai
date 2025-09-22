"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getAllCases } from "@/utils/cases-store";
import { DOCUMENTS, FINDINGS } from "@/utils/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, FileText, Timer } from "lucide-react";

export default function MedicalFindingsPage() {
  const { id } = useParams<{ id: string }>();
  const caseData = React.useMemo(() => getAllCases().find((c) => c.id === id), [id]);
  if (!caseData) return notFound();

  const findings = React.useMemo(() => FINDINGS.filter((f) => f.caseId === caseData.id), [caseData.id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/workspace/${caseData.id}`}><ArrowLeft className="w-4 h-4 mr-2" />Back to Workspace</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/chronologies/${caseData.id}`}><Timer className="w-4 h-4 mr-2" />View Chronology</Link>
          </Button>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-semibold">{caseData.title}</h1>
          <div className="flex items-center gap-2 justify-end">
            <Badge>{caseData.status}</Badge>
            <Badge variant="secondary">{caseData.type}</Badge>
          </div>
        </div>
      </div>

      {caseData.summary && <Card className="p-4 text-sm">{caseData.summary}</Card>}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Medical Findings</h2>
          <span className="text-sm text-muted-foreground">{findings.length} total</span>
        </div>
        <div className="rounded-lg border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-3">Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {findings.map((f) => {
                const doc = DOCUMENTS.find((d) => d.id === f.documentId);
                return (
                  <TableRow key={f.id}>
                    <TableCell className="pl-4 font-medium">{f.type}</TableCell>
                    <TableCell className="text-sm">{f.category}</TableCell>
                    <TableCell className="text-sm max-w-xl">{f.description}</TableCell>
                    <TableCell className="text-sm">{f.date}</TableCell>
                    <TableCell className="text-sm">{f.provider}</TableCell>
                    <TableCell className="text-sm">
                      <Badge variant={f.confidence >= 90 ? "default" : "secondary"}>{f.confidence}%</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {doc ? (
                        <div className="inline-flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span className="truncate max-w-48">{doc.fileName}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {findings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-sm text-muted-foreground">No findings yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
