import { createClient } from "@/utils/supabase/server"
import { useParams } from "next/navigation"
import Image from "next/image"
import Finguy from "../../../images/img-fQoESIftyKS0dolHl0WejY6I.png"
import { FaArrowRight } from "react-icons/fa6"
import Link from "next/link"
import Videosona from "@/components/videosona"

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

  // const chapters = await supabase
  //   .from("learning_chapters")
  //   .select()
  //   .filter("lsId", "eq", id)

  return (
    <>
      {/* <Image src={Finguy} alt="Finguy" width={200} height={200} className="absolute rounded-lg right-6 top-6" /> */}
      {/* <div className="flex w-full justify-center mb-12">
        <div>
          <Image
            src={Finguy}
            alt="Finguy"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div> */}
      <Videosona src={learningSession.data!.video_url!} />
      <div className="container mx-auto my-48">
        <h1 className="text-5xl font-bold">{learningSession.data?.prompt}</h1>

        <div className="grid grid-cols-2 grid-rows-2 gap-10 mx-auto w-2/3 my-8">
          <Link href={`/you/${id}/quiz`}>
            <div className="p-8 text-xl font-semibold border border-sky-600 rounded-lg flex items-center gap-2 duration-100 hover:translate-x-2 hover:-translate-y-2">
              <FaArrowRight /> Quiz
            </div>
          </Link>
          <Link href={`/you/${id}/learn`}>
            <div className="p-8 text-xl font-semibold border border-sky-600 rounded-lg flex items-center gap-2 duration-100 hover:translate-x-2 hover:-translate-y-2">
              <FaArrowRight /> Learn
            </div>
          </Link>

        </div>
      </div>
      {/* <p>{learningSession.data?.summary}</p>
      {!chapters.data?.length && (
        <p>No chapters available yet! Please wait...</p>
      )}
      {chapters.data?.map((chapter) => (
        <div className="my-10 border border-sky-800 rounded-xl p-4" key={chapter.id}>
          <h2 className="text-3xl mb-2">{chapter.title}</h2>
          <hr className="border border-sky-800 my-4" />
          <p>{chapter.content}</p>
        </div>
      ))} */}
    </>
  )
}
