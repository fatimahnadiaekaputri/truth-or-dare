import React, { useState } from "react";

interface Player {
  id: number;
  name: string;
  color: string;
  score: number;
}

interface InputFormProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const colors = ['green', 'purple', 'orange'];

const InputForm: React.FC<InputFormProps> = ({ players, setPlayers }) => {
  const [tempPlayers, setTempPlayers] = useState(players);
  const [visibleInputs, setVisibleInputs] = useState(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;
    setTempPlayers((prevState) =>
      prevState.map((player) =>
        player.id === id ? { ...player, name: value } : player
      )
    );
  };

  const onBlur = (id: number) => {
    setPlayers(tempPlayers);
  };

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [name]: value
    };
    setPlayers(updatedPlayers);
  }

  const addInput = () => {
    if(visibleInputs < 5) {
      setVisibleInputs(visibleInputs + 1);
      const newPlayer: Player = {
        id: tempPlayers.length + 1,
        name: "",
        color: colors[tempPlayers.length % colors.length],
        score: 0
      };
      setTempPlayers([...tempPlayers, newPlayer]);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Players: ", players);
  };

  return (
    <form onSubmit={onSubmit}>
      {tempPlayers.map((player) => (
        <div key={player.id}>
          <h6>Player {player.id}</h6>
          <input
            type="text"
            id={`name-${player.id}`}
            name="name"
            placeholder="Masukkan nama"
            value={player.name} // Menggunakan state sementara untuk mengelola value
            onChange={(e) => handleChange(e, player.id)} // Mengubah nilai input
            onBlur={() => onBlur(player.id)} // Memperbarui state global saat kehilangan fokus
            className="border rounded py-2 px-3 mb-2"
          />
        </div>
      ))}
      {visibleInputs < 5 && (
        <button type="button" onClick={addInput}>
          Add Player
        </button>
      )}
      <button type="submit" className="bg-green-900 hover:bg-green-200 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default InputForm;
