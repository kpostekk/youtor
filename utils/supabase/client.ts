import { createBrowserClient } from "@supabase/ssr"
import { useMemo } from "react"
import { Database } from "./db"

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

export const useClient = () => {
  const client = useMemo(() => createClient(), [])

  return client
}
