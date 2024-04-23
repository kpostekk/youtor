"use server"

import { createClient } from "@/utils/supabase/server"
import { createSuperClient } from "@/utils/supabase/super"
import { da, vi } from "@faker-js/faker"
import { redirect } from "next/navigation"
// import { fakerPL } from '@faker-js/faker'
// import { createSuperClient } from "@/utils/supabase/super"

// api urk

export async function createLearningSession(formData: FormData) {
  const prompt = formData.get("prompt")

  if (!prompt) {
    throw new Error("You need to provide a prompt")
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from("learning_sessions")
    .insert({
      prompt: prompt.toString(),
    })
    .select("id")
    .single()

  if (!data) throw error

  const url = new URL("https://lone-sk-chen-appear.trycloudflare.com/prompt")
  url.searchParams.set("idp", data.id)
  // create a quiz prompt
  const result = await fetch(url)
  console.log(await result.text())

  const vid = await supabase
    .from("learning_sessions")
    .select("video_url")
    .filter("id", "eq", data.id)
    .single()

  if (!vid.data?.video_url) throw vid.error

  const video_temp_R = await fetch(vid.data.video_url)
  const video_temp = await video_temp_R.blob()

  const uploadr = await createSuperClient().storage
    .from("tutor_pfps")
    .upload(`video-${data.id}.mp4`, video_temp)
  console.log(uploadr)

  await createSuperClient()
    .from("learning_sessions")
    .update({
      video_url: supabase.storage
        .from("tutor_pfps")
        .getPublicUrl(uploadr.data!.path).data.publicUrl,
    })
    .filter("id", "eq", data.id)

  // update quiz problem
  const quiz = await supabase
    .from("learning_sessions")
    .select("id")
    .filter("lsId", "eq", data.id)
    .single()

  

  redirect(`/you/${data.id}`)

  // return data
}
