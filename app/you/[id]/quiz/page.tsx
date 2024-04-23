import { createClient } from "@/utils/supabase/server"

export default async function YouPage(props: { params: { id: string } }) {
  const { id } = props.params
  const supabase = createClient()

  await supabase.auth.getUser()

  // fetch quiz for this learning session
  const quiz_result = await supabase
    .from("quizes")
    .select("*, quizes_questions(*, quizes_answers(*))")
    .filter("lsId", "eq", id)
    .single()

  console.log(JSON.stringify(quiz_result.data, null, 2))

  if (!quiz_result.data) throw quiz_result.error

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">{quiz_result.data.name}</h1>
      <div>
        {quiz_result.data.quizes_questions.map((question) => (
          <div key={question.id}>
            <h2 className="text-lg mb-2 mt-4">{question.question}</h2>
            <div className="grid grid-cols-4 gap-8 my-2">
              {question.quizes_answers.map((answer) => (
                <label key={answer.id} className="flex border rounded-xl border-sky-200 py-1 px-4">
                  <span className="grow">{answer.answer}</span>
                  <input type="checkbox" name={answer.id.toString()} />
                </label>
              ))}
            </div>
            <ul></ul>
          </div>
        ))}
        {/* {quiz_questions.data.map((question) => (
          <div key={question.id}>
            <h2>{question.question}</h2>
            <ul>
              {quiz_answers.data
                .filter((answer) => answer.qId === question.id)
                .map((answer) => (
                  <li key={answer.id}>{answer.answer}</li>
                ))}
            </ul>
          </div>
        ))} */}
      </div>
    </div>
  )
}
