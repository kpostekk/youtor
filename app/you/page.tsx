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
    <div className="grid h-full place-items-center">
      <div>
        <h1 className="text-5xl font-semibold">
          What do you want to learn today?
        </h1>
        <InputForCourse />
      </div>
    </div>
  )
}
