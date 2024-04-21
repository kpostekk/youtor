import { FaSpinner } from "react-icons/fa6"

export default function Loading() {
  return (
    <div className="h-full w-full grid place-items-center">
      <FaSpinner className="animate-spin text-emerald-500 text-2xl" />
    </div>
  )
}
