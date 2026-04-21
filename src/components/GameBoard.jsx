import React, { useState, useEffect } from "react";
const items = ["🍎", "🍌", "🍇", "🍒", "🍎", "🍌", "🍇", "🍒"];
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
function GameBoard() {
  const [cards, setCards] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [matched, setMatched] = useState([]);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(shuffle(items));
  }, []);
  const handleClick = (index) => {
    if (won) return;
    if (index === first) return;

    if (first === null) {
      setFirst(index);
    } else if (second === null) {
      setSecond(index);

      // 🆕 increment moves
      setMoves((prev) => prev + 1);

      if (cards[index] === cards[first]) {
        const newMatched = [...matched, cards[index]];
        setMatched(newMatched);

        if (newMatched.length === 4) {
          setWon(true);
        }

        setFirst(null);
        setSecond(null);
      } else {
        setTimeout(() => {
          setFirst(null);
          setSecond(null);
        }, 800);
      }
    }
  };

  const restartGame = () => {
    setCards(shuffle(items));
    setFirst(null);
    setSecond(null);
    setMatched([]);
    setWon(false);
    setMoves(0); // reset moves
  };

  return (
    <div className="flex flex-col items-center mt-10">

      {won && (
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          You Won 🎉
        </h2>
      )}

      {/* 🆕 Styled Moves */}
      <p className="mb-2 px-4 py-1 bg-gray-200 rounded-lg font-semibold shadow-sm">
        Moves: {moves}
      </p>

      <button
        onClick={restartGame}
        className="mb-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Restart
      </button>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((item, index) => {
          const isFlipped =
            index === first ||
            index === second ||
            matched.includes(item);

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-20 h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer shadow-md transition
              ${isFlipped ? "bg-white" : "bg-purple-400 text-white"}`}
            >
              {isFlipped ? item : "❓"}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default GameBoard;