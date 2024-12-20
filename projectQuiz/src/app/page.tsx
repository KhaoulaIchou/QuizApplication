import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/Button";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 mt-10">
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Apprenez, jouez et progressez avec{" "}
            <span className="text-purple-600">QuizApp</span> !
          </h1>
          <Button text="Commencez" link="/login" />
        </div>

        <div>
          <Image
            src="/happy-bunch-desk.png"  
            alt="Illustration"
            width={400}
            height={400}
            className="drop-shadow-lg"
            priority 
          />
        </div>
      </main>
    </div>
  );
}
