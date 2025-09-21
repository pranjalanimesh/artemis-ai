"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, CheckCircle2, FileText, Clock } from "lucide-react"
import { cn } from "@/lib/utils"


export type Notice = {
    id: string
    title: string
    meta: string
    when: string
    type: "success" | "info" | "warning"
    read?: boolean
}


type Props = {
    query: string
    setQuery: (q: string) => void
    inputRef: React.RefObject<HTMLInputElement>
    notices: Notice[]
    setNotices: React.Dispatch<React.SetStateAction<Notice[]>>
    onRefresh?: () => void
}
export default function TopBar({ query, setQuery, inputRef, notices, setNotices, onRefresh }: Props) {
    const unread = notices.filter(n => !n.read).length
    const markAllRead = () => setNotices(prev => prev.map(n => ({ ...n, read: true })))


    return (
        <header className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
                <div className="relative w-full max-w-xl">
                    <button
                        type="button"
                        aria-label="Focus search with slash"
                        onClick={() => inputRef.current?.focus()}
                        className="absolute left-2 top-1.5 h-6 px-1.5 inline-flex items-center rounded border text-[11px] text-gray-600 border-gray-300 bg-white"
                    >
                        [/]
                    </button>
                    <Input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search cases, findings, docs"
                        className="pl-14 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black border-black/20"
                    />
                </div>
            </div>


            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {unread > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-medium">
                                    {unread}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden">
                        <div className="px-3 py-2 border-b bg-white/70 backdrop-blur">
                            <div className="flex items-center justify-between">
                                <DropdownMenuLabel className="p-0 text-gray-800">Notifications</DropdownMenuLabel>
                                <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>
                            </div>
                        </div>
                        <div className="max-h-72 overflow-auto">
                            {notices.map(n => (
                                <DropdownMenuItem key={n.id} className="py-3 px-3 gap-3 focus:bg-emerald-50">
                                    {n.type === "success" ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                        <FileText className="h-4 w-4 text-gray-500" />
                                    )}
                                    <div className="flex-1">
                                        <p className={cn("text-sm", n.read ? "text-gray-600" : "text-gray-900 font-medium")}>{n.title}</p>
                                        <p className="text-xs text-gray-500">{n.meta}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400">{n.when}</span>
                                </DropdownMenuItem>
                            ))}
                            {notices.length === 0 && (
                                <div className="py-8 text-center text-sm text-gray-500">No notifications</div>
                            )}
                        </div>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <Button variant="outline" className="w-full" onClick={() => alert("Opening activity…")}>Open Activity</Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>


                <Button variant="outline" size="sm" className="text-gray-700" onClick={onRefresh}>Refresh</Button>
            </div>
        </header>
    )
}