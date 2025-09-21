"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Landmark, Users } from "lucide-react";
import Link from "next/link";
import { CaseRecord } from "@/lib/chronologies/types";


export default function CaseList({ items }: { items: CaseRecord[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
                <Card key={c.id} className="p-4 space-y-3 rounded-2xl">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{c.title}</h3>
                            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                                <Users className="w-4 h-4" /> {c.parties.join(" · ")}
                            </div>
                        </div>
                        <Badge>{c.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{c.type}</Badge>
                        {c.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="outline">{t}</Badge>
                        ))}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Filed {c.filedAt}</span>
                        <span className="flex items-center gap-1"><Landmark className="w-3 h-3" />Updated {c.updatedAt}</span>
                    </div>
                    <div className="flex justify-end">
                        <Button asChild>
                            <Link href={`/chronologies/${c.id}`}>Open <ChevronRight className="ml-1 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}