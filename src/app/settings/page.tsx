"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Bell, Brain, Database, Layout, Settings, Shield, User } from "lucide-react";


const SECTIONS = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "ai", label: "AI Settings", icon: Brain },
    { key: "privacy", label: "Data & Privacy", icon: Shield },
    { key: "display", label: "Display", icon: Layout },
    { key: "system", label: "System", icon: Settings },
] as const;


type SectionKey = typeof SECTIONS[number]["key"];


function useSection(): [SectionKey, (k: SectionKey) => void] {
    const params = useSearchParams();
    const router = useRouter();
    const current = (params.get("s") as SectionKey) ?? "profile";
    const set = (k: SectionKey) => {
        const next = new URLSearchParams(params.toString());
        next.set("s", k);
        router.replace(`/settings?${next.toString()}`);
    };
    return [current, set];
}

export default function SettingsPage() {
    const [section, setSection] = useSection();
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <p className="text-sm text-muted-foreground">Manage your account and application preferences</p>
                </div>
                <Button form="settings-form" type="submit">Save Changes</Button>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-[240px_1fr]">
                {/* Sidebar */}
                <nav className="rounded-xl border p-2 h-max">
                    <ul className="space-y-1">
                        {SECTIONS.map(({ key, label, icon: Icon }) => (
                            <li key={key}>
                                <button
                                    onClick={() => setSection(key)}
                                    className={cn(
                                        "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent",
                                        section === key && "bg-accent"
                                    )}
                                >
                                    <Icon className="w-4 h-4" /> {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>


                {/* Content */}
                <section className="space-y-4">
                    <Card className="p-4">
                        <form id="settings-form" className="space-y-8" onSubmit={(e) => { e.preventDefault(); /* wire to API later */ }}>
                            {section === "profile" && <ProfileSection />}
                            {section === "notifications" && <NotificationsSection />}
                            {section === "ai" && <AISection />}
                            {section === "privacy" && <PrivacySection />}
                            {section === "display" && <DisplaySection />}
                            {section === "system" && <SystemSection />}
                        </form>
                    </Card>
                </section>
            </div>
        </div>

    );
}

// ---------- Panels ----------
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            {children}
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
    );
}


function GridTwo({ children }: { children: React.ReactNode }) {
    return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}


function ProfileSection() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">Profile</h2>
            <GridTwo>
                <Field label="First Name"><Input defaultValue="John" /></Field>
                <Field label="Last Name"><Input defaultValue="Smith" /></Field>
            </GridTwo>
            <GridTwo>
                <Field label="Email Address"><Input type="email" defaultValue="john.smith@law.com" /></Field>
                <Field label="Phone Number"><Input defaultValue="+1 (555) 123-4567" /></Field>
            </GridTwo>
            <Field label="Law Firm"><Input defaultValue="Artemis LPO" /></Field>
            {/* <Field label="Bar Number"><Input defaultValue="BAR123456" /></Field> */}
        </div>
    );
}


function NotificationsSection() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="space-y-4">
                <ToggleRow label="Email Notifications" hint="Receive notifications via email" defaultChecked />
                <ToggleRow label="Brief Completion" hint="Notify when briefs are completed" defaultChecked />
                <ToggleRow label="Processing Errors" hint="Notify when document processing fails" defaultChecked />
                <ToggleRow label="Weekly Reports" hint="Receive weekly activity summaries" />
            </div>
        </div>
    );
}


function ToggleRow({ label, hint, defaultChecked }: { label: string; hint?: string; defaultChecked?: boolean }) {
    const [checked, setChecked] = React.useState(!!defaultChecked);
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <div className="font-medium text-sm">{label}</div>
                {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
            </div>
            <Switch checked={checked} onCheckedChange={setChecked} />
        </div>
    );
}

function AISection() {
    const [value, setValue] = React.useState<number[]>([85]);
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">AI Settings</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Confidence Threshold ({value[0]}%)</Label>
                    </div>
                    <Slider value={value} min={50} max={99} step={1} onValueChange={setValue} />
                    <p className="text-xs text-muted-foreground">Minimum confidence level for AI findings</p>
                </div>
                <ToggleRow label="Auto Processing" hint="Automatically process uploaded documents" defaultChecked />
                <div className="space-y-2">
                    <Label>Citation Format</Label>
                    <Select defaultValue="exhibit">
                        <SelectTrigger className="w-full md:w-[300px]"><SelectValue placeholder="Select format" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exhibit">Exhibit & Page (e.g., 3F at 19/150)</SelectItem>
                            <SelectItem value="pin">Pin Cite (e.g., Ex. 3F, p.19)</SelectItem>
                            <SelectItem value="short">Short (3F:19)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ToggleRow label="Include Confidence Scores" hint="Show AI confidence scores in outputs" defaultChecked />
            </div>
        </div>
    );
}


function PrivacySection() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">Data & Privacy</h2>
            <GridTwo>
                <div className="space-y-2">
                    <Label>Data Retention Period</Label>
                    <Select defaultValue="7y">
                        <SelectTrigger className="w-full md:w-[240px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1y">1 Year</SelectItem>
                            <SelectItem value="3y">3 Years</SelectItem>
                            <SelectItem value="7y">7 Years</SelectItem>
                            <SelectItem value="forever">Indefinite</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Export Format</Label>
                    <Select defaultValue="pdf">
                        <SelectTrigger className="w-full md:w-[240px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </GridTwo>
            <ToggleRow label="Automatic Backup" hint="Enable daily automatic backups" defaultChecked />
            <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Import Data</Button>
            </div>
        </div>
    );
}

function DisplaySection() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">Display</h2>
            <GridTwo>
                <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select defaultValue="system">
                        <SelectTrigger className="w-full md:w-[240px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger className="w-full md:w-[240px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </GridTwo>
            <GridTwo>
                <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="est">
                        <SelectTrigger className="w-full md:w-[240px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                            <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                            <SelectItem value="cst">Central Time (CST)</SelectItem>
                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                            <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="mdy">
                        <SelectTrigger className="w-full md:w-[240px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </GridTwo>
        </div>
    );
}

function SystemSection() {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold">System</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 space-y-2">
                    <div className="text-sm text-muted-foreground">System Information</div>
                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                        <div>Version:</div><div className="font-medium">Medical AI Assistant v2.1.0</div>
                        <div>Last Update:</div><div className="font-medium">January 15, 2024</div>
                        <div>License:</div><div className="font-medium">Professional</div>
                        <div>Storage Used:</div><div className="font-medium">2.4 GB / 10 GB</div>
                    </div>
                </Card>
                <div className="flex items-start gap-2">
                    <Button>Check for Updates</Button>
                    <Button variant="outline">Clear Cache</Button>
                </div>
            </div>
        </div>
    );
}