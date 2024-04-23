"use client"

import { useClient } from "@/utils/supabase/client"
import classNames from "classnames"
import { FormEvent, useCallback, useMemo, useState } from "react"
import { FaArrowRight } from "react-icons/fa6"
import { createLearningSession } from "./createLearningSession"

export default function InputForCourse() {
  const client = useClient()

  const [course, setCourse] = useState("")
  const canSubmit = useMemo(() => course.length > 5, [course])

  return (
    <form className="flex w-full px-24 my-4 text-xl relative">
      <input
        name="sessionTopic"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="appearance-none bg-transparent border-b-2 border-sky-900 duration-200 focus:border-sky-500 grow outline-none"
        placeholder="What is an eventloop in JavaScript?"
        // onSubmit={() => alert("submitted")}
      />
      <button
        formAction={createLearningSession}
        className={classNames(
          "duration-200 absolute top-0 h-full right-24 grid place-items-center",
          canSubmit ? "text-sky-500" : "text-transparent -rotate-180",
        )}
      >
        <FaArrowRight />
      </button>
    </form>
  )
}
