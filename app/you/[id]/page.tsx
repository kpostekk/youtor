import { createClient } from "@/utils/supabase/server"
import { useParams } from "next/navigation"

export default async function YouLearningSessionPage(props: {
  params: { id: string }
}) {
  const supabase = createClient()

  // get the id from the url
  const { id } = props.params

  const result = await supabase
    .from("learning_sessions")
    .select()
    .filter("id", "eq", id)
    .single()

  return (
    <>
      <h1 className="text-5xl font-bold">{result.data?.prompt}</h1>
      <p>{result.data?.summary}</p>
    </>
  )
}
