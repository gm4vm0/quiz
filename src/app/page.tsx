import { Libre_Franklin } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import globe from "@/assets/globe.svg";
import { button } from "@/components/button";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col py-10 mx-10 h-screen">
      <Image src={globe} width={250} alt="A spinning globe" priority={true} />
      <h1
        className={`text-3xl lg:text-5xl font-semibold text-center ${libreFranklin.className}`}
      >
        Create and share awesome quizzes!
      </h1>
      <div className="flex justify-center mx-auto gap-4">
        <Link
          href="/create"
          className={button({
            variant: "solid",
            size: "large",
            className: "mt-8",
          })}
        >
          Create a quiz
        </Link>
        {/* <Link
          href="#"
          className={button({
            variant: "outline",
            size: "large",
            className: "mt-8",
          })}
        >
          Take a quiz
        </Link> */}
      </div>
    </main>
  );
}
