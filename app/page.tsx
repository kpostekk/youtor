import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Flashcards from "../images/Flashcards.png"
import Link from "next/link"

export default async function Index() {
  const supabase = createClient()

  return (
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
