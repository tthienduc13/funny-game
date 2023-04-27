import React, { useState, useEffect } from "react";
import { Istate as Props } from "../App";
import { isValidInput } from "../utils";
import { useNavigate } from "react-router-dom";
interface Iprops {
  playerList: Props["playerList"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
}
function CreateGame({ playerList, setPlayerList }: Iprops) {
  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const navigate = useNavigate();
  const addPlayer = () => {
    if (!(name1 && name2)) {
      alert("Please Enter 2 Player Name");
    } else if (!isValidInput(name1, name2)) {
      alert("Invalid Player Name");
    } else {
      setPlayerList([
        ...playerList,
        {
          id: 1,
          name: name1,
          answer: [],
          correctAnswer: [],
          score: 0,
          time: 0,
        },
        {
          id: 2,
          name: name2,
          answer: [],
          correctAnswer: [],
          score: 0,
          time: 0,
        },
      ]);
      localStorage.setItem("match", "1");
      localStorage.setItem("playerTurn", "0");
      localStorage.setItem("playRound", "1");
      navigate("/game");
    }
  };
  useEffect(() => {
    localStorage.setItem("playerList", JSON.stringify(playerList));
  }, [playerList]);
  const handleSubmit = () => {
    addPlayer();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      e.preventDefault;
      handleSubmit();
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 bg-[#fff] border-4 border-[#818181] flex flex-col p-4">
          <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-2">
            <h1 className="text-2xl font-bold text-[#6e6e6e]"> Create Game</h1>
            <a href="/">
              <i className="fa-sharp fa-solid fa-xmark text-2xl"></i>
            </a>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <form className="flex lg:flex-row flex-col lg:items-center lg:gap-4 mt-4">
              <label className="text-lg text-[#6e6e6e] font-bold">
                Player 1:
              </label>
              <input
                className="outline-none border-2 border-[#818181] px-2 py-1"
                type="text"
                placeholder="Name"
                onChange={(e) => setName1(e.target.value)}
              ></input>
            </form>
            <form className="flex lg:flex-row flex-col lg:items-center lg:gap-4 mt-4">
              <label className="text-lg text-[#6e6e6e] font-bold">
                Player 2:
              </label>
              <input
                className="outline-none border-2 border-[#818181] px-2 py-1"
                placeholder="Name"
                type="text"
                onChange={(e) => setName2(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              ></input>
            </form>
            <button
              className="border-2 border-[#818181] text-[#6e6e6e] px-6 mt-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateGame;
