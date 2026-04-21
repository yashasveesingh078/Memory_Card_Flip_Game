import React, { useState, useEffect } from "react";

const items = ["🍎","🍌","🍇","🍒","🍎","🍌","🍇","🍒"];

function shuffle(array){
  return [...array].sort(() => Math.random() - 0.5);
}

function GameBoard(){
  const [cards,setCards] = useState([]);
  const [first,setFirst] = useState(null);
  const [second,setSecond] = useState(null);
  const [matched,setMatched] = useState([]);
  const [won,setWon] = useState(false);

  useEffect(()=>{
    setCards(shuffle(items));
  },[]);

  const handleClick = (index)=>{
    if(won) return;
    if(index === first) return;

    if(first === null){
      setFirst(index);
    } else if(second === null){
      setSecond(index);

      if(cards[index] === cards[first]){
        const newMatched = [...matched, cards[index]];
        setMatched(newMatched);

        if(newMatched.length === 4){
          setWon(true);
        }

        setFirst(null);
        setSecond(null);
      } else {
        setTimeout(()=>{
          setFirst(null);
          setSecond(null);
        },800);
      }
    }
  };

  const restartGame = ()=>{
    setCards(shuffle(items));
    setFirst(null);
    setSecond(null);
    setMatched([]);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {won && <h2>You Won 🎉</h2>}

      <button onClick={restartGame}>Restart</button>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((item,index)=>{
          const isFlipped =
            index === first ||
            index === second ||
            matched.includes(item);

          return (
            <div key={index} onClick={()=>handleClick(index)}>
              {isFlipped ? item : "❓"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameBoard;