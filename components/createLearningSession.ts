"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { fakerPL } from '@faker-js/faker'
import { createSuperClient } from "@/utils/supabase/super"

export async function createLearningSession(prevState: any, formData: FormData) {
  if (!formData.get("sessionTopic")) {
    throw new Error("You need to provide a topic")
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from("learning_sessions")
    .insert({
      prompt: formData.get("sessionTopic")!.toString(),
    })
    .select("id")
    .single()

  if (!data) throw error

  // fake chapter generation
  for (let i = 0; i < 5; i++) {
    await createSuperClient()
      .from("learning_chapters")
      .insert({
        lsId: data.id,
        title: fakerPL.lorem.sentence(),
        content: fakerPL.lorem.paragraphs(5),
        // learning_session_id: data.id,
      })
      .single()

    // console.log(x)
  }

  redirect(`/you/${data.id}`)

  return data
}
