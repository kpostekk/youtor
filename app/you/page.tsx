import InputForCourse from "@/components/InputForCourse"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Logolike from "../../images/logolike.png"

export default async function YouPage() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) throw error

  const name = user.user_metadata.custom_claims.global_name

  return (
    <div className="grid my-24">
      <div className="w-full space-y-8">
        <Image src={Logolike} alt="logo" className="w-full" />
        <div className="w-2/3 text-center mx-auto">
          <h1 className="text-5xl font-semibold">
            What do you want to learn today?
          </h1>
          <form className="flex w-full px-24 my-4 text-xl relative text-center">
            <InputForCourse />
          </form>
        </div>
      </div>
    </div>
  )
}
