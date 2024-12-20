"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access); 
        setSuccessMessage("Connexion réussie !");
        console.log("User ID:", data.user_id);
  
        router.push("/topics");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Erreur lors de la connexion.");
      }
    } catch (error) {
      setErrorMessage("Impossible de se connecter au serveur.");
    }
  };
  

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-20 bg-white">
        <h1 className="text-5xl font-bold mb-4">
          Quiz<span className="text-purple-600">App</span>
        </h1>
        <p className="text-gray-500 mb-8">
          Veuillez vous connecter ou créer un compte.
        </p>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="votre-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mot de Passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-1/2 bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-700"
            >
              Login
            </button>
            <button
              type="button"
              className="w-1/2 border border-purple-600 text-purple-600 font-semibold py-3 rounded hover:bg-purple-100"
            >
              Signup
            </button>
          </div>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
        <Image
          src="/Dayflow Sitting.png"
          alt="Illustration"
          width={400}
          height={400}
          priority
        />
      </div>
    </div>
  );
}
