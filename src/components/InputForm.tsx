import React, { useState, useRef } from "react";

interface Player {
  id: number;
  name: string;
  color: string;
  score: string;
}

interface InputFormProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const InputForm: React.FC<InputFormProps> = ({ players, setPlayers }) => {
  const [visibleInputs, setVisibleInputs] = useState<number>(2);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;
    setPlayers((prevState) =>
      prevState.map((player) =>
        player.id === id ? { ...player, name: value } : player
      )
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(players);
  };

  const addInput = () => {
    if (visibleInputs < 5) {
      setVisibleInputs(visibleInputs + 1);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {players.slice(0, visibleInputs).map((player, index) => (
        <div key={player.id}>
          <h6>Player {player.id}</h6>
          <input
            type="text"
            id={`name-${player.id}`}
            value={player.name}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => onChange(e, player.id)}
            onKeyDown={(e) => onKeyDown(e, index)}
          />
          <br />
        </div>
      ))}
      {visibleInputs < 5 && (
        <button type="button" onClick={addInput}>
          Add Input
        </button>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
