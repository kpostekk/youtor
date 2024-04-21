import { createClient } from "@/utils/supabase/server"
import { useParams } from "next/navigation"

export default async function YouLearningSessionPage(props: {
  params: { id: string }
}) {
  const supabase = createClient()

  // get the id from the url
  const { id } = props.params

  const learningSession = await supabase
    .from("learning_sessions")
    .select()
    .filter("id", "eq", id)
    .single()

  const chapters = await supabase
    .from("learning_chapters")
    .select()
    .filter("learning_session_id", "eq", id)

  return (
    <>
      <h1 className="text-5xl font-bold">{learningSession.data?.prompt}</h1>
      <p>{learningSession.data?.summary}</p>
      {!chapters.count && <p>No chapters available yet! Please wait...</p>}
    </>
  )
}
