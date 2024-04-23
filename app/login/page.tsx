// import Link from "next/link"
import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { FaDiscord } from "react-icons/fa6"
// import { SubmitButton } from "./submit-button"
// import { defaultUrl } from "@/utils/url"

export default async function Login() {
  const signIn = async () => {
    "use server"

    const supabase = createClient()
    const origin = headers().get("origin")

    const { data } = await supabase.auth.signInWithOAuth({
      provider: "discord",
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
      <form className="grid place-items-center p-16 border border-white/25 rounded-lg bg-white/5">
        <button
          formAction={signIn}
          className="border bg-sky-900 border-sky-500 rounded-xl py-2 px-4 font-medium flex items-center gap-2"
        >
          <FaDiscord /> Sign in with Discord
        </button>
      </form>
    </div>
  )
}
