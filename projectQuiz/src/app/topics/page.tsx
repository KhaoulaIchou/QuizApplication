"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

interface Topic {
  id: number;
  name: string;
  description: string;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [username, setUsername] = useState<string>("");
  const router = useRouter(); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          throw new Error("Aucun token trouvé");
        }

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

    const fetchTopics = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/topics/");
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Erreur lors du chargement des topics :", error);
      }
    };

    fetchUserInfo();
    fetchTopics();
  }, []);

  const toggleTopicSelection = (topicId: number) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  const startQuiz = () => {
    if (selectedTopics.length < 3) {
      alert("Veuillez sélectionner au moins 3 topics.");
      return;
    }

    const queryParams = selectedTopics.map((id) => `topics=${id}`).join("&");
    router.push(`/quiz?${queryParams}`); 
  };

  return (
    <div className="flex flex-col items-center px-6 md:px-20 min-h-screen bg-white">
      <header className="flex justify-between items-center w-full py-4">
        <h1 className="text-3xl font-bold">
          Quiz<span className="text-purple-600">App</span>
        </h1>
        <p className="text-purple-600 font-semibold">{username}</p>

      </header>

      <h1 className="text-3xl md:text-4xl font-bold mt-10">Choisissez vos sujets préférés</h1>
      <p className="text-gray-500 mt-4 mb-8">Sélectionnez plus de 3 sujets pour commencer le quiz</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => toggleTopicSelection(topic.id)}
            className={`border p-3 rounded text-center ${
              selectedTopics.includes(topic.id)
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border-purple-600"
            } hover:bg-purple-100`}
          >
            {topic.name}
          </button>
        ))}
      </div>

      <button
        onClick={startQuiz}
        className="bg-purple-600 text-white font-semibold py-3 px-6 rounded hover:bg-purple-700"
      >
        Commencez le quiz
      </button>
    </div>
  );
}
