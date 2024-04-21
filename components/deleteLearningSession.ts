'use server'

import { createClient } from "@/utils/supabase/server"

export async function deleteLearningSession(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("learning_sessions")
    .delete()
    .filter("id", "eq", id)

  if (error) throw error
}