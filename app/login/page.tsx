import Link from "next/link"
import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SubmitButton } from "./submit-button"
import { defaultUrl } from "@/utils/url"

export default async function Login() {
  const supabase = createClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      scopes: "identify email",
      redirectTo: `${defaultUrl()}/auth/callback`,
    },
  })

  return (
    <div className="h-screen grid place-items-center">
      <Link
        href={data.url!}
        className="border bg-emerald-900 border-emerald-500 rounded-xl py-2 px-4 font-medium"
      >
        Sign in with Discord
      </Link>
    </div>
  )
}
