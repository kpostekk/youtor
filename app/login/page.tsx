// import Link from "next/link"
import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
// import { SubmitButton } from "./submit-button"
// import { defaultUrl } from "@/utils/url"

export default async function Login() {
  const signIn = async () => {
    'use server'

    const supabase = createClient()
    const origin = headers().get("origin")

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        scopes: "identify email",
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (data?.url) {
      redirect(data.url)
    }

    throw new Error("Failed to sign in")
  }

  return (
    <div className="h-screen grid place-items-center">
      <form>
        <button
          formAction={signIn}
          className="border bg-emerald-900 border-emerald-500 rounded-xl py-2 px-4 font-medium"
        >
          Sign in with Discord
        </button>
      </form>
    </div>
  )
}
