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


  const url = new URL("https://lips-prozac-knock-cornwall.trycloudflare.com/prompt")
  url.searchParams.set("idp", data.id)
  // create a quiz prompt
  const result = await fetch(url)
  console.log(await result.text())

  redirect(`/you/${data.id}`)

  // return data
}
