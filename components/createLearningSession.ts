"use server"

import { createClient } from "@/utils/supabase/server"
import { da } from "@faker-js/faker"
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

  // create a quiz prompt
  await fetch("https://badly-corp-jump-sampling.trycloudflare.com/prompt?id=" + data.id)

  redirect(`/you/${data.id}`)

  // return data
}
