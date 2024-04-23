"use client"

import { useClient } from "@/utils/supabase/client"
import classNames from "classnames"
import { FormEvent, useCallback, useMemo, useState } from "react"
import { FaArrowRight } from "react-icons/fa6"
import { createLearningSession } from "./createLearningSession"

export default function InputForCourse() {
  const client = useClient()

  const [course, setCourse] = useState("")
  const canSubmit = useMemo(() => course.length > 0, [course])

  return (
    <form className="flex w-full px-24 my-4 text-xl relative">
      <textarea
        name="prompt"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="appearance-none bg-transparent border-b-2 border-sky-900 duration-200 focus:border-sky-500 grow outline-none"
        placeholder="I am a teacher and I would like to learn more about Polish history, specifically the 18th century. My knowledge is advanced."
        rows={3}
        required
        // onSubmit={() => alert("submitted")}
      />
      <button
        formAction={createLearningSession}
        className={classNames(
          "duration-200 absolute top-0 h-full right-16 grid place-items-center",
          canSubmit ? "text-sky-500" : "text-transparent -rotate-180",
        )}
      >
        <FaArrowRight />
      </button>
    </form>
  )
}
