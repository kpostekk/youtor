import DeployButton from "../components/DeployButton"
import AuthButton from "../components/AuthButton"
import { createClient } from "@/utils/supabase/server"
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps"
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps"
import Header from "@/components/Header"
import Image from "next/image"
import Flashcards from "../images/Flashcards.png"
import Link from "next/link"

export default async function Index() {
  const supabase = createClient()

  return (
    // <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //   <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //     <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    //       <DeployButton />
    //       {isSupabaseConnected && <AuthButton />}
    //     </div>
    //   </nav>

    //   <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
    //     <Header />
    //     <main className="flex-1 flex flex-col gap-6">
    //       <h2 className="font-bold text-4xl mb-4">Next steps</h2>
    //       {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
    //     </main>
    //   </div>

    //   <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
    //     <p>
    //       Powered by{" "}
    //       <a
    //         href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
    //         target="_blank"
    //         className="font-bold hover:underline"
    //         rel="noreferrer"
    //       >
    //         Supabase
    //       </a>
    //     </p>
    //   </footer>
    // </div>
    <div className="grid grid-cols-2 place-content-center h-screen">
      <div className="flex justify-end">
        <Image src={Flashcards} alt="" />
      </div>
      <div className="space-y-8 my-24 -translate-x-4">
        <h1 className="font-bold font-eepy text-6xl">YOUtor</h1>
        <div>
          <Link
            href="/login"
            className="border bg-emerald-900 border-emerald-500 rounded-xl py-2 px-4 font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
