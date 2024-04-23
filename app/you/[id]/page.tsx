import { createClient } from "@/utils/supabase/server"
import { useParams } from "next/navigation"
import Image from 'next/image'
import Finguy from '../../../images/finguy.png'

export default async function YouLearningSessionPage(props: {
  params: { id: string }
}) {
  const supabase = createClient()

  // get the id from the url
  const { id } = props.params

  await supabase.auth.getUser()

  const learningSession = await supabase
    .from("learning_sessions")
    .select()
    .filter("id", "eq", id)
    .single()

  const chapters = await supabase
    .from("learning_chapters")
    .select()
    .filter("lsId", "eq", id)

  return (
    <>
      <Image src={Finguy} alt="Finguy" width={200} height={200} className="absolute rounded-lg right-6 top-6" />
      <h1 className="text-5xl font-bold">{learningSession.data?.prompt}</h1>
      <p>{learningSession.data?.summary}</p>
      {!chapters.data?.length && <p>No chapters available yet! Please wait...</p>}
      {chapters.data?.map((chapter) => (
        <div className="my-10 border border-emerald-800 rounded-xl p-4" key={chapter.id}>
          <h2 className="text-3xl mb-2">{chapter.title}</h2>
          <hr className="border border-emerald-800 my-4" />
          <p>{chapter.content}</p>
        </div>
      ))}
    </>
  )
}
