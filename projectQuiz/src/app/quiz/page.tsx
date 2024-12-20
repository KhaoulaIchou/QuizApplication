"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Quiz {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  selected_option?: string | null; 
}


export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/user-info/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des informations utilisateur");
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Erreur lors du chargement des informations utilisateur :", error);
      }
    };

    fetchUserInfo();
  }, []);

useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch(
        `http://127.0.0.1:8000/api/quizzes/merged/?${params}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des questions");
      }

      const data = await response.json();

      const quizzesWithSelectedOption = data.map((quiz: Quiz) => ({
        ...quiz,
        selected_option: null, 
      }));

      setQuizzes(quizzesWithSelectedOption);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  fetchQuizzes();
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev === 1) {
        handleNext();
        return 10;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [currentIndex, quizzes]);

const handleOptionSelect = (option: string) => {
  setQuizzes((prevQuizzes) =>
    prevQuizzes.map((quiz, index) =>
      index === currentIndex
        ? { ...quiz, selected_option: option } 
        : quiz
    )
  );
  setSelectedOption(option); 
};

const handleNext = () => {
  if (selectedOption === quizzes[currentIndex]?.correct_option) {
    setScore((prev) => prev + 1);
  }

  setSelectedOption(null);
  setTimer(10);

  if (currentIndex < quizzes.length - 1) {
    setCurrentIndex((prev) => prev + 1);
  } else {
    setScore(calculateScore());
    setShowPopup(true);
  }
};

const handlePrevious = () => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
    setSelectedOption(quizzes[currentIndex - 1]?.selected_option || null); 
  }
};

const calculateScore = () => {
  return quizzes.reduce((total, quiz) => {
    if (quiz.selected_option === quiz.correct_option) {
      return total + 1;
    }
    return total;
  }, 0);
};

const handleContinue = () => {
  setShowPopup(false);
  router.push("/topics");
};

if (quizzes.length === 0) {
  return <div>Chargement des questions...</div>;
}

const currentQuiz = quizzes[currentIndex];


  return (
    <div className="relative flex flex-col items-center px-6 md:px-20 min-h-screen bg-white">
      <header className="flex justify-between items-center w-full py-4">
        <h1 className="text-3xl font-bold">
          Quiz<span className="text-purple-600">App</span>
        </h1>
        <p className="text-purple-600 font-semibold">{username}</p>
       
      </header>

      <h1 className="text-3xl md:text-4xl font-bold mt-10">
        Question {currentIndex + 1}/{quizzes.length}
      </h1>

      <div className="flex items-center mt-4 mb-8">
        {quizzes.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-1 rounded-full ${
              index <= currentIndex ? "bg-purple-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <p className="text-xl font-semibold mb-6 text-center">
        {currentQuiz.question}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {["option_a", "option_b", "option_c", "option_d"].map((optionKey) => (
          <button
  key={optionKey}
  onClick={() => {
    const optionValue = currentQuiz[optionKey as keyof Quiz]?.toString();
    if (optionValue) {
      handleOptionSelect(optionValue); 
    }
  }}
  className={`border p-3 rounded text-center ${
    selectedOption === currentQuiz[optionKey as keyof Quiz]?.toString()
      ? "bg-purple-600 text-white"
      : "bg-white text-purple-600 border-purple-600"
  } hover:bg-purple-100`}
>
  {currentQuiz[optionKey as keyof Quiz]}
</button>

        ))}
      </div>

      <div className="flex items-center justify-center text-purple-600 font-bold text-2xl mb-4">
        ⏱️ {timer}s
      </div>

      <div className="flex justify-between w-full max-w-md">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 disabled:bg-gray-300"
        >
          <span>⬅️</span> Précédent
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700"
        >
          Suivant <span>➡️</span>
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 text-center w-96">
            <img
              src="/Pebble People Trophy.png"
              alt="Trophée"
              className="w-24 h-24 mx-auto mb-4"
            />

            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Félicitations ! Votre score est {score}/{quizzes.length}.
            </h2>
            <button
              onClick={handleContinue}
              className="bg-purple-600 text-white font-semibold py-2 px-6 rounded hover:bg-purple-700"
            >
              Continuer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
