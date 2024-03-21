"use client";

import { useEffect, useState } from "react";
import { button } from "@/components/button";

interface Question {
  content: string;
  correct: string;
  option1: string;
  option2: string;
  option3: string;
}

export default function Question(props: Question) {
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const evaluate = (given: string) => {
    // return 0 if did not choose, 1 if chose correct, 2 if chose wrong
    return given != answer ? 0 : given == props.correct ? 1 : 2;
  };

  useEffect(() => {
    setIsActive(true);
    const rand = Math.floor(Math.random() * 4);
    rand == 0
      ? setOptions([props.correct, props.option1, props.option2, props.option3])
      : rand == 1
      ? setOptions([props.option1, props.option2, props.option3, props.correct])
      : rand == 2
      ? setOptions([props.option2, props.option3, props.correct, props.option1])
      : setOptions([
          props.option3,
          props.correct,
          props.option1,
          props.option2,
        ]);
  }, [props]);

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <h3 className="text-lg lg:text-3xl font-semibold">{props.content}</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={!isActive}
          className={`${button({ variant: "outline", size: "large" })} ${
            evaluate(options[0]) == 1
              ? " border-green-500"
              : evaluate(options[0]) == 2
              ? " border-red-500"
              : ""
          }`}
          onClick={() => {
            setAnswer(options[0]);
            setIsActive(false);
          }}
        >
          {options[0]}
        </button>
        <button
          disabled={!isActive}
          className={`${button({ variant: "outline", size: "large" })} ${
            evaluate(options[1]) == 1
              ? " border-green-500"
              : evaluate(options[1]) == 2
              ? " border-red-500"
              : ""
          }`}
          onClick={() => {
            setAnswer(options[1]);
            setIsActive(false);
          }}
        >
          {options[1]}
        </button>
        <button
          disabled={!isActive}
          className={`${button({ variant: "outline", size: "large" })} ${
            evaluate(options[2]) == 1
              ? " border-green-500"
              : evaluate(options[2]) == 2
              ? " border-red-500"
              : ""
          }`}
          onClick={() => {
            setAnswer(options[2]);
            setIsActive(false);
          }}
        >
          {options[2]}
        </button>
        <button
          disabled={!isActive}
          className={`${button({ variant: "outline", size: "large" })} ${
            evaluate(options[3]) == 1
              ? " border-green-500"
              : evaluate(options[3]) == 2
              ? " border-red-500"
              : ""
          }`}
          onClick={() => {
            setAnswer(options[3]);
            setIsActive(false);
          }}
        >
          {options[3]}
        </button>
      </div>
    </div>
  );
}
