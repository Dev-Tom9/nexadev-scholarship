import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <CheckCircle size={80} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold">Application Sent!</h1>
      <p className="text-gray-600 mt-2">Check your email for the next steps.</p>
    </div>
  );
}