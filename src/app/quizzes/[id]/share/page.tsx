"use client";

import { Libre_Franklin } from "next/font/google";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import globe from "@/assets/globe.svg";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

export default function Home() {
  const params = useParams<{ id: string }>();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <main className="flex justify-center items-center flex-col py-10 mx-10 h-screen">
      <Image src={globe} width={250} alt="A spinning globe" priority={true} />
      <h2
        className={`text-xl lg:text-5xl font-semibold text-center ${libreFranklin.className}`}
      >
        Share your quiz!
      </h2>
      <h3 className="text-lg mt-5 underline">{`${origin}/quizzes/${params.id}`}</h3>
    </main>
  );
}
