import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Flashcards from "../images/Flashcards.png"
import Link from "next/link"

export default async function Index() {
  return (
    <div className="grid grid-cols-2 place-content-center h-screen">
      <div className="flex justify-end">
        <Image src={Flashcards} alt="" />
      </div>
      <div className="grid place-content-start gap-6 translate-y-8 -translate-x-9">
        <h1 className="font-bold font-eepy text-6xl">YOUtor</h1>
        <p>learn anything in minutes</p>
        <div className="flex">
          <Link
            className="border bg-emerald-900 border-emerald-500 rounded-xl py-2 px-4 font-medium"
            href="/login"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
