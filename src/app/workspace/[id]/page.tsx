"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { CASES, DOCUMENTS, FINDINGS } from "@/utils/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Stethoscope, Timer } from "lucide-react";

export default function WorkspaceCasePage() {
  const { id } = useParams<{ id: string }>();
  const data = CASES.find(c => c.id === id);
  if (!data) return notFound();

  const docs = DOCUMENTS.filter(d => d.caseId === data.id);
  const findings = FINDINGS.filter(f => f.caseId === data.id).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">{data.title}</h1>
          <div className="flex items-center gap-2">
            <Badge>{data.status}</Badge>
            <Badge variant="secondary">{data.type}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/chronologies/${data.id}`}><Timer className="w-4 h-4 mr-2" />View Chronology</Link>
          </Button>
          <Button asChild>
            <Link href={`/medical/${data.id}`}><Stethoscope className="w-4 h-4 mr-2" />Medical Findings</Link>
          </Button>
        </div>
      </div>

      {data.summary && <Card className="p-4 text-sm">{data.summary}</Card>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Documents</h2>
            <span className="text-sm text-muted-foreground">{docs.length} total</span>
          </div>
          <div className="rounded-lg border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-3">File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="pl-4 font-medium flex items-center gap-2"><FileText className="w-4 h-4" />{d.fileName}</TableCell>
                    <TableCell className="text-sm">{d.type}</TableCell>
                    <TableCell className="text-sm">{d.status}</TableCell>
                    <TableCell className="text-sm">{d.uploadedAt}</TableCell>
                    <TableCell className="text-sm">{d.pages}</TableCell>
                    <TableCell className="text-sm">{d.size}</TableCell>
                  </TableRow>
                ))}
                {docs.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-sm text-muted-foreground">No documents.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Medical Findings</h2>
            <Button asChild variant="outline" size="sm">
              <Link href={`/medical/${data.id}`}>Show more</Link>
            </Button>
          </div>
          <div className="grid gap-3">
            {findings.map(f => {
              const doc = DOCUMENTS.find(d => d.id === f.documentId);
              return (
                <div key={f.id} className="border rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{f.type}</div>
                    <Badge variant={f.confidence >= 90 ? "default" : "secondary"}>{f.confidence}%</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{f.category} • {f.date}</div>
                  <p className="text-sm mt-1">{f.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">Provider: {f.provider}{doc ? ` • Source: ${doc.fileName}` : ""}</div>
                </div>
              );
            })}
            {findings.length === 0 && <div className="text-sm text-muted-foreground">No findings yet.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
