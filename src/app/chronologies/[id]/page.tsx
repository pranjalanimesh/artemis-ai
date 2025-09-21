// src/app/chronologies/[id]/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
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

  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(
    () =>
      data.timeline
        .slice()
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .map((t) => ({
          title: t.date,                   // ← string only
          cardTitle: t.title,
          cardSubtitle: t.category ?? "",
          cardDetailedText: t.description ?? "",
          url: t.sourceUrl,
        })),
    [data.timeline]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="outline">
          <Link href="/chronologies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
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
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      </Card>

<Chrono
  items={items}
  mode="VERTICAL_ALTERNATING"
  scrollable={false}           // disable scrollable container + scrollbar
  borderLessCards
  highlightCardsOnHover
  slideShow
  activeItemIndex={activeIndex}
  onItemSelected={(_i, idx) => setActiveIndex(idx)}
  lineWidth={1}
  timelinePointDimension={14}
  classNames={{ title: "rc-title" }}
  theme={{
    primary: "#111827",
    secondary: "#6b7280",
    cardBgColor: "#ffffff",
    cardTitleColor: "#111827",
    cardSubtitleColor: "#6b7280",
    shadowColor: "rgba(0,0,0,0.06)",
    titleColor: "#111827",
    titleColorActive: "#ffffff",
  }}
/>


      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Sources</h2>
        <ul className="list-disc pl-5 text-sm">
          {data.timeline
            .filter((t) => t.sourceUrl)
            .map((t) => (
              <li key={`${t.date}-${t.title}`}>
                <a
                  className="underline underline-offset-2"
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
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
