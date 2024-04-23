"use client"

import { useEffect, useRef, useState } from "react"

export default function Videosona(props: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    // if (ref.current) {
    //   ref.current.src = props.src
    // }
    ref.current?.play()
    ref.current!.playbackRate = 1.1

    // when video stops, hide the video
    ref.current?.addEventListener("ended", () => {
      setShow(false)
    })
  }, [props.src])

  // if (!show) {
  //   return null
  // }

  return (
    <div className="aspect-square absolute bottom-8 right-8 p-8 bg-white/20 backdrop-blur rounded-full w-96">
      {show ? (
        <video
          ref={ref}
          src={
            "https://xlexbirabqfeuqressbx.supabase.co/storage/v1/object/public/tutor_pfps/1713862313244.mp4"
          }
          autoPlay
          className="rounded-full"
        />
      ) : (
        <img
          className="rounded-full"
          src="https://xlexbirabqfeuqressbx.supabase.co/storage/v1/object/public/tutor_pfps/img-fQoESIftyKS0dolHl0WejY6I.png"
        />
      )}
    </div>
  )
}
