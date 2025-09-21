"use client";
import React from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { CASES } from "@/lib/chronologies/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Chrono } from "react-chrono";


export default function CaseDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const data = CASES.find((c) => c.id === id);
    if (!data) return notFound();


    const items = data.timeline
        .slice()
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .map((t) => ({
            title: t.date,
            cardTitle: t.title,
            cardSubtitle: t.category ?? "",
            cardDetailedText: t.description ?? "",
            url: t.sourceUrl,
        }));

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button asChild variant="outline"><Link href="/chronologies"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link></Button>
                <h1 className="text-2xl font-semibold">{data.title}</h1>
                <Badge>{data.status}</Badge>
                <Badge variant="secondary">{data.type}</Badge>
            </div>


            <Card className="p-4">
                <div className="text-sm text-muted-foreground">Parties</div>
                <div className="font-medium">{data.parties.join(" · ")}</div>
                {data.summary && <p className="mt-2 text-sm">{data.summary}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                    {data.tags.map((t) => (
                        <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                </div>
            </Card>


            {/* React Chrono timeline */}
            <div className="rounded-xl border p-2">
                <Chrono
                    items={items}
                    mode="VERTICAL_ALTERNATING"
                    slideShow
                    scrollable={{ scrollbar: true }}
                    theme={{
                        primary: "hsl(var(--primary))",
                        secondary: "hsl(var(--muted-foreground))",
                        cardBgColor: "hsl(var(--card))",
                        titleColor: "hsl(var(--foreground))",
                        titleColorActive: "hsl(var(--primary-foreground))",
                    }}
                    cardHeight={120}
                    useReadMore
                    fontSizes={{ cardSubtitle: "0.75rem", cardText: "0.85rem" }}
                />
            </div>



            {/* Sources list */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Sources</h2>
                <ul className="list-disc pl-5 text-sm">
                    {data.timeline.filter(t => t.sourceUrl).map((t) => (
                        <li key={`${t.date}-${t.title}`}>
                            <a className="underline underline-offset-2" href={t.sourceUrl} target="_blank" rel="noreferrer">
                                {t.title} — {t.date}
                            </a>
                            <ExternalLink className="inline w-3 h-3 ml-1" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}