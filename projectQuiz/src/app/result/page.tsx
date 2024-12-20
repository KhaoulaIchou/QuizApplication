import Button from "@/components/Button";

export default function Result() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">🎉 Félicitations ! 🎉</h2>
        <p className="text-xl mb-6">Votre score est de <span className="font-bold text-purple-600">4</span>.</p>
        <Button text="Continuer" link="/" />
      </div>
    </div>
  );
}
