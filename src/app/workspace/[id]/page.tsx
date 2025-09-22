"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { DOCUMENTS, FINDINGS } from "@/utils/mock-data";
import { getAllCases } from "@/utils/cases-store";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Stethoscope, Timer } from "lucide-react";
import DocumentPreview from "@/components/DocumentPreview";

export default function WorkspaceCasePage() {
    const { id } = useParams<{ id: string }>();
    const data = React.useMemo(() => getAllCases().find(c => c.id === id), [id]);
    if (!data) return notFound();

    const docs = React.useMemo(() => DOCUMENTS.filter(d => d.caseId === data.id), [data.id]);
    const findings = React.useMemo(() => FINDINGS.filter(f => f.caseId === data.id).slice(0, 6), [data.id]);

    const [selectedDocId, setSelectedDocId] = React.useState<string | null>(null);
    const selectedDoc = React.useMemo(() => docs.find(d => d.id === selectedDocId) ?? null, [docs, selectedDocId]);
    const previewSrc = selectedDoc?.localPath || selectedDoc?.previewUrl || "";

    return (
        <div className="space-y-6 flex-row h-full">
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

            {!selectedDoc ? (
                <div className="grid gap-6 lg:grid-cols-4 h-full">
                    <Card className="p-4 col-span-3">
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
                                        <TableRow
                                            key={d.id}
                                            onClick={() => setSelectedDocId(d.id)}
                                            className={`cursor-pointer ${selectedDoc?.id === d.id ? "bg-muted/60" : ""}`}
                                        >
                                            <TableCell className="pl-4 font-medium flex items-center gap-2">
                                                <FileText className="w-4 h-4" />{d.fileName}
                                            </TableCell>
                                            <TableCell className="text-sm">{d.type}</TableCell>
                                            <TableCell className="text-sm">{d.status}</TableCell>
                                            <TableCell className="text-sm">{d.uploadedAt}</TableCell>
                                            <TableCell className="text-sm">{d.pages}</TableCell>
                                            <TableCell className="text-sm">{d.size}</TableCell>
                                        </TableRow>
                                    ))}
                                    {docs.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-sm text-muted-foreground">No documents.</TableCell>
                                        </TableRow>
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
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Provider: {f.provider}{doc ? ` • Source: ${doc.fileName}` : ""}
                                        </div>
                                    </div>
                                );
                            })}
                            {findings.length === 0 && <div className="text-sm text-muted-foreground">No findings yet.</div>}
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-8 h-full">
                    <div className="space-y-6 col-span-5">
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
                                            <TableRow
                                                key={d.id}
                                                onClick={() => setSelectedDocId(d.id)}
                                                className={`cursor-pointer ${selectedDoc?.id === d.id ? "bg-muted/60" : ""}`}
                                            >
                                                <TableCell className="pl-4 font-medium flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />{d.fileName}
                                                </TableCell>
                                                <TableCell className="text-sm">{d.type}</TableCell>
                                                <TableCell className="text-sm">{d.status}</TableCell>
                                                <TableCell className="text-sm">{d.uploadedAt}</TableCell>
                                                <TableCell className="text-sm">{d.pages}</TableCell>
                                                <TableCell className="text-sm">{d.size}</TableCell>
                                            </TableRow>
                                        ))}
                                        {docs.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-sm text-muted-foreground">No documents.</TableCell>
                                            </TableRow>
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
                                            <div className="text-xs text-muted-foreground mt-1">
                                                Provider: {f.provider}{doc ? ` • Source: ${doc.fileName}` : ""}
                                            </div>
                                        </div>
                                    );
                                })}
                                {findings.length === 0 && <div className="text-sm text-muted-foreground">No findings yet.</div>}
                            </div>
                        </Card>
                    </div>

                    <Card className="p-0 overflow-hidden col-span-3">
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <div className="min-w-0">
                                <div className="text-xs text-muted-foreground">Preview</div>
                                <div className="font-medium truncate">{selectedDoc?.fileName ?? "No document selected"}</div>
                            </div>
                            {previewSrc && (
                                <Button asChild size="sm" variant="outline">
                                    <a href={previewSrc.replace("/preview", "/view")} target="_blank" rel="noreferrer">Open</a>
                                </Button>
                            )}
                        </div>
                        <div className="h-full">
                            {previewSrc ? (
                                <DocumentPreview fileUrl={previewSrc} initialPage={1} />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground p-6 text-center">
                                    Select a document with a preview URL or local path to display here.
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
