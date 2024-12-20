interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
  }
  
  export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    );
  }
  