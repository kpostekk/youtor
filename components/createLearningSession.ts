"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function createLearningSession(formData: FormData) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("learning_sessions")
    .insert({
      prompt: formData.get("sessionTopic")!.toString(),
    })
    .select("id")
    .single()

  if (!data) throw error

  redirect(`/you/${data.id}`)
}
