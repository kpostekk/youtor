import { Database, Tables } from "@/utils/supabase/db"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { FaCross, FaRegTrashCan } from "react-icons/fa6"

export type SessionButtonProps = {
  session: Pick<Tables<"learning_sessions">, "id" | "summary" | "prompt">
}

export function SessionButton(props: SessionButtonProps) {
  const session = props.session

  // return (
  //   <p className="text-lg truncate my-2 py-1 hover:bg-white/10 rounded-lg">{session.prompt}</p>
  // )
  return (
    <div className="flex p-1 w-full hover:bg-white/10 rounded-lg">
      <Link href={`/you/${session.id}`} className="grow text-lg truncate">
        {session.prompt}
      </Link>
      <button className="ml-4 px-1">
        <FaRegTrashCan />
      </button>
    </div>
  )
}
