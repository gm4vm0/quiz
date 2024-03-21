"use client";

import { Libre_Franklin } from "next/font/google";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { button } from "@/components/button";
import supabase from "@/utils/supabase";
import Question from "./question";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

interface Quiz {
  title: string;
  questions: {
    content: string;
    correct: string;
    option1: string;
    option2: string;
    option3: string;
  }[];
}

export default function Home() {
  const params = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz>();
  const [index, setIndex] = useState<number>(-1);

  const advance = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const results: Quiz = { title: "", questions: [] };
      const { data } = await supabase.from("quiz").select().eq("id", params.id);
      if (!data || data?.length <= 0) {
        setQuiz(results);
        return;
      }
      results.title = data[0].title;

      const { data: questionData } = await supabase
        .from("question")
        .select()
        .eq("quiz_id", params.id);
      if (!questionData) {
        setQuiz(results);
        return;
      }
      for (const question of questionData) {
        const { data: answerData } = await supabase
          .from("answer")
          .select()
          .eq("id", question.answer_id);
        if (!answerData) {
          setQuiz(results);
          return;
        }
        results.questions.push({
          content: question.content,
          correct: answerData[0].correct,
          option1: answerData[0].option_1,
          option2: answerData[0].option_2,
          option3: answerData[0].option_3,
        });
      }

      setQuiz(results);
    };
    fetchData();
  }, [params.id]);

  return (
    <main className="flex justify-center items-center flex-col py-10 mx-10 h-screen">
      {!quiz || quiz.title.length <= 0 ? (
        <h2
          className={`text-xl lg:text-5xl font-semibold text-center ${libreFranklin.className}`}
        >
          Quiz not found!
        </h2>
      ) : index == -1 ? (
        <div className="flex justify-center items-center flex-col gap-10">
          <h3
            className={`text-lg lg:text-3xl font-semibold ${libreFranklin.className}`}
          >
            Take the quiz!
          </h3>
          <h2
            className={`text-xl lg:text-5xl font-semibold ${libreFranklin.className}`}
          >
            {quiz.title}
          </h2>
          <button
            className={button({ variant: "solid", size: "large" })}
            onClick={advance}
          >
            Start
          </button>
        </div>
      ) : index >= quiz.questions.length ? (
        <h2
          className={`text-xl lg:text-5xl font-semibold text-center ${libreFranklin.className}`}
        >
          That&apos;s the end!
        </h2>
      ) : (
        <div className="flex justify-center items-center flex-col gap-10">
          <Question {...quiz.questions[index]} />
          <button
            className={button({ variant: "solid", size: "large" })}
            onClick={advance}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
