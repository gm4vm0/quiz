"use client";

import { Libre_Franklin } from "next/font/google";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { button } from "@/components/button";
import { input } from "@/components/input";
import supabase from "@/utils/supabase";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

interface Inputs {
  title: string;
  questions: {
    content: string;
    correct: string;
    option1: string;
    option2: string;
    option3: string;
  }[];
}

export default function CreateQuizPage() {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<Inputs>({
    defaultValues: { questions: [{}] },
  });
  const { fields, append } = useFieldArray({ name: "questions", control });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { data: quizData } = await supabase
      .from("quiz")
      .insert({ title: data.title })
      .select();
    if (!quizData) return;

    for (const question of data.questions) {
      const { data: questionData } = await supabase
        .from("question")
        .insert({
          content: question.content,
          quiz_id: quizData[0].id,
          answer_id: -1,
        })
        .select();
      if (!questionData) return;
      const { data: answerData } = await supabase
        .from("answer")
        .insert({
          question_id: questionData[0].id,
          correct: question.correct,
          option_1: question.option1,
          option_2: question.option2,
          option_3: question.option3,
        })
        .select();
      if (!answerData) return;
      await supabase
        .from("question")
        .update({ answer_id: answerData[0].id })
        .eq("id", questionData[0].id);
    }

    router.replace(`/quizzes/${quizData[0].id}/share`);
  };

  return (
    <main className="flex flex-col my-10 mx-10">
      <h2 className={`text-3xl font-semibold ${libreFranklin.className}`}>
        Create your quiz:
      </h2>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Quiz title"
          className={input()}
        />
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1 mt-10">
            <p className="font-bold text-lg">Question #{index + 1}</p>
            <div className="mt-2">
              <input
                {...register(`questions.${index}.content`, { required: true })}
                type="text"
                placeholder="Question"
                className={input()}
              />
            </div>
            <div className="mt-2">
              <p className="block mb-2 text-neutral-900">Correct Answer</p>
              <input
                {...register(`questions.${index}.correct`, { required: true })}
                type="text"
                placeholder="Correct answer"
                className={input()}
              />
            </div>
            <div className="mt-2">
              <p className="block mb-2 text-neutral-900">Option 1</p>
              <input
                {...register(`questions.${index}.option1`, { required: true })}
                type="text"
                placeholder="Wrong answer"
                className={input()}
              />
            </div>
            <div className="mt-2">
              <p className="block mb-2 text-neutral-900">Option 2</p>
              <input
                {...register(`questions.${index}.option2`, { required: true })}
                type="text"
                placeholder="Wrong answer"
                className={input()}
              />
            </div>
            <div className="mt-2">
              <p className="block mb-2 text-neutral-900">Option 3</p>
              <input
                {...register(`questions.${index}.option3`, { required: true })}
                type="text"
                placeholder="Wrong answer"
                className={input()}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              content: "",
              correct: "",
              option1: "",
              option2: "",
              option3: "",
            })
          }
          className={`${button({ variant: "solid", size: "small" })} mt-8`}
        >
          New Question
        </button>
        <input
          type="submit"
          value="Create"
          className={`${button({
            variant: "outline",
            size: "small",
          })} mt-8 ml-4`}
        />
      </form>
    </main>
  );
}
