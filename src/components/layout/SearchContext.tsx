"use client"
import * as React from "react"


export type SearchCtx = {
query: string
setQuery: (q: string) => void
focusSearch: () => void
}


export const SearchContext = React.createContext<SearchCtx | null>(null)


export function useSearch() {
const ctx = React.useContext(SearchContext)
if (!ctx) throw new Error("useSearch must be used within SearchContext provider")
return ctx
}