"use client"
import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import TopBar, { Notice } from "@/components/layout/TopBar"
import { SearchContext } from "@/components/layout/SearchContext"
import { InteractiveGridPattern } from "@/components/ui/shadcn-io/interactive-grid-pattern"
import { cn } from "@/lib/utils"


const LS_KEY = "artemis.sidebar.collapsed"


export default function WorkspaceFrame({ children }: { children: React.ReactNode }) {
    // Sidebar collapsed with persistence
    const [collapsed, setCollapsed] = React.useState(false)
    React.useEffect(() => {
        const raw = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null
        if (raw != null) setCollapsed(raw === "1")
    }, [])
    const toggle = React.useCallback(() => {
        setCollapsed(v => {
            const nv = !v
            try { localStorage.setItem(LS_KEY, nv ? "1" : "0") } catch { }
            return nv
        })
    }, [])
    const sidebarWidth = collapsed ? 56 : 256


    // Global search state
    const [query, setQuery] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const focusSearch = React.useCallback(() => inputRef.current?.focus(), [])


    // Slash hotkey, ignoring when typing
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            const isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
            if (isTyping) return
            if (e.key === "/") { e.preventDefault(); focusSearch() }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [focusSearch])


    // Notifications (global). Could also persist if needed.
    const [notices, setNotices] = React.useState<Notice[]>([
        { id: "n1", title: "Processing complete", meta: "Lee_Disability_File.pdf", when: "Just now", type: "success" },
        { id: "n2", title: "23 findings extracted", meta: "Davis, Jennifer • 94% confidence", when: "1h", type: "info" },
        { id: "n3", title: "Brief exported", meta: "Wilson_Brief.docx", when: "Yesterday", type: "success" },
    ])

    return (
        <SidebarProvider>
            <SearchContext.Provider value={{ query, setQuery, focusSearch }}>
                <div
                    className="h-screen w-full bg-white grid relative"
                    style={{ gridTemplateColumns: `${sidebarWidth}px 1fr`, transition: "grid-template-columns 300ms ease-in-out" }}
                >
                    <AppSidebar collapsed={collapsed} onToggle={toggle} />


                    <main className="w-full overflow-auto relative">
                        {/* Background under everything */}
                        <div className="absolute inset-0 overflow-hidden">
                            <InteractiveGridPattern
                                className={cn(
                                    "inset-x-[0%] inset-y-[-0%] h-[200%] w-full",
                                    "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                                    "pointer-events-none opacity-50"
                                )}
                            />
                        </div>

                        {/* Sticky TopBar */}
                        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
                            <div className="px-6 py-5">
                                <TopBar
                                    query={query}
                                    setQuery={setQuery}
                                    inputRef={inputRef}
                                    notices={notices}
                                    setNotices={setNotices}
                                    onRefresh={() => window.location.reload()}
                                />
                            </div>
                        </div>

                        {/* Page content with padding and spacing */}
                        <div className="p-6 space-y-6 relative">
                            {children}
                        </div>
                    </main>
                </div>
            </SearchContext.Provider>
        </SidebarProvider>
    )
}
