import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { PropsWithChildren, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { SessionButton } from "@/components/SessionButton"
import { FaPlus, FaSpinner } from "react-icons/fa6"
import Logolike from '../../images/logolike.png'

/**
 * Check if the user is authenticated
 */
export default async function YouLayout(props: PropsWithChildren) {
  const supabase = createClient()

  const user = await supabase.auth.getUser()
  const recentSessions = await supabase
    .from("learning_sessions")
    .select()
    .limit(50)

  if (!user.data.user) {
    redirect("login")

    // return null
  }

  const logout = async () => {
    "use server"
    const supabase = createClient()

    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <div className="grid grid-cols-[28rem_auto] h-screen bg-black">
      <div className="bg-black grid grid-cols-1 grid-rows-[auto_1fr_auto] border-r border-white/25">
        <div>
          {/* <Image src={Logolike} alt="logo" /> */}
        </div>
        <div className="py-4 px-6">
          <div className="flex p-1 w-full hover:bg-white/10 rounded-lg mb-2">
            <Link href={`/you`} className="grow text-lg truncate">
              New
            </Link>
            <button className="ml-4 px-1">
              <FaPlus />
            </button>
          </div>
          <p className="opacity-25 px-1">Your recent sessions</p>
          <Suspense>
            {recentSessions.data?.map((r) => (
              <SessionButton key={r.id} session={r} />
            ))}
          </Suspense>
          {/* {JSON.stringify(recentSessions.data)} */}
        </div>
        <div className="flex items-center w-full gap-4 px-6 pb-5">
          <Image
            width={32}
            height={32}
            src={user.data.user.user_metadata.picture}
            className="border border-white/25 rounded-xl"
            alt="profile pic"
          />
          <span>{user.data.user.user_metadata.custom_claims.global_name}</span>
          <div className="grow" />
          <form>
            <button formAction={logout}>Logout</button>
          </form>
        </div>
      </div>
      <div className="overflow-auto">
        <Suspense>{props.children}</Suspense>
      </div>
    </div>
  )
}
