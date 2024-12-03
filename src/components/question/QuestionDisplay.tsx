import React, { useState } from 'react';
import { usePlayerContext } from '@/components/player/PlayerContext';

interface Question {
  id: number;
  label: string;
  question: string;
}

interface QuestionDisplayProps {
  selectedPlayerId: number | null;
  onNext: () => void;
  onPass: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ selectedPlayerId, onNext, onPass }) => {
  const questionsData = JSON.parse(process.env.NEXT_PUBLIC_QUESTIONS || '[]'); // Ambil data dari environment
  const [questions, setQuestions] = useState<Question[]>(questionsData); // Semua pertanyaan
  const [usedQuestions, setUsedQuestions] = useState<Question[]>([]); // Pertanyaan yang sudah ditampilkan
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null); // Pertanyaan yang akan ditampilkan

  const { players } = usePlayerContext();

  // Fungsi untuk menampilkan pertanyaan acak
  const getRandomQuestion = () => {
    if (questions.length === 0) {
      alert('Semua pertanyaan sudah ditampilkan.');
      return;
    }

    // Ambil pertanyaan acak yang belum pernah ditampilkan
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];

    // Perbarui state untuk memindahkan pertanyaan ke "usedQuestions"
    setUsedQuestions([...usedQuestions, selectedQuestion]);

    // Hapus pertanyaan dari daftar yang tersisa
    const updatedQuestions = questions.filter((_, index) => index !== randomIndex);
    setQuestions(updatedQuestions);

    // Tampilkan pertanyaan yang dipilih
    setCurrentQuestion(selectedQuestion);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {currentQuestion ? (
        <div>
          <p
            className={`text-lg font-bold mb-2 ${
              currentQuestion.label === 'truth' ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            {currentQuestion.label === 'truth' ? 'Truth' : 'Dare'}
          </p>
          <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
        </div>
      ) : (
        <p className="text-lg text-gray-500 mb-4">Klik tombol untuk mulai!</p>
      )}

      {selectedPlayerId !== null && (
        <div className="space-x-4">
          <button
            onClick={onNext}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Next
          </button>
          <button
            onClick={onPass}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Pass
          </button>
        </div>
      )}

      <button
        onClick={getRandomQuestion}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Tampilkan Pertanyaan Acak
      </button>
    </div>
  );
};

export default QuestionDisplay;
