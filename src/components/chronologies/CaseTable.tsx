"use client";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CaseRecord } from "@/lib/chronologies/types";


export default function CaseTable({ items }: { items: CaseRecord[] }) {
    return (
        <div className="rounded-xl border bg-background">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-3">Case</TableHead>
                        <TableHead>Parties</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Filed</TableHead>
                        <TableHead>Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((c) => (
                        <TableRow key={c.id} className="hover:bg-muted/50 cursor-pointer" asChild={false}>
                            <TableCell className="font-medium"><Link href={`/chronologies/${c.id}`} className="underline underline-offset-2 pl-1">{c.title}</Link></TableCell>
                            <TableCell className="text-sm text-muted-foreground">{c.parties.join(" · ")}</TableCell>
                            <TableCell><Badge variant="secondary">{c.type}</Badge></TableCell>
                            <TableCell><Badge>{c.status}</Badge></TableCell>
                            <TableCell className="text-sm">{c.filedAt}</TableCell>
                            <TableCell className="text-sm">{c.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}