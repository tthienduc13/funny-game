import { Istate as Props } from "../App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
interface Iprops {
  playerList: Props["playerList"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
  playRound: number;
  playerTurn: number;
  totalRounds: number;
  question: {
    question: string;
    correctAnswer: string;
    incorrectAnswer: string[];
    answerChoices: string[];
  };
  setQuestion: React.Dispatch<
    React.SetStateAction<{
      question: string;
      correctAnswer: string;
      incorrectAnswer: string[];
      answerChoices: string[];
    }>
  >;
}
function GameConsole({
  playerList,
  setPlayerList,
  playerTurn,
  playRound,
  totalRounds,
  question,
  setQuestion,
}: Iprops) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(10);
  const [selectedChoice, setSelectedChoice] = useState<number>(-1);
  const allAnswer: string[] = question.answerChoices
    ? question.answerChoices
    : [];

  const handleChoices = (choice: string) => {
    const newPlayerList = [...playerList];
    const currentPlayer = newPlayerList[playerTurn];
    currentPlayer.answer[playRound - 1] = choice;
    setPlayerList(newPlayerList);
  };

  const handlePlayerTurn = (correct: string) => {
    playerList[playerTurn].correctAnswer.push(correct);
    if (countdown === 0) {
      playerList[playerTurn].answer.push("Empty");
    }
    playerList[playerTurn].time += 10 - countdown;
    window.localStorage.setItem(
      "playerTurn",
      JSON.stringify(Math.abs(playerTurn - 1))
    );
  };
  const handleSubmit = () => {
    let correctChar = "";
    let emptyAnswer = false;
    for (let i = 0; i <= totalRounds; i++) {
      if (allAnswer[i] === question.correctAnswer) {
        correctChar = String.fromCharCode(97 + i).toUpperCase();
      }
      if (playerList[playerTurn].answer[playRound - 1] === null) {
        emptyAnswer = true;
      }
    }
    if (playerTurn === 0) {
      handlePlayerTurn(correctChar);
      const newQuestion = {
        ...question,
        question: "",
      };
      setQuestion(newQuestion);
    } else if (playerTurn === 1) {
      handlePlayerTurn(correctChar);
      window.localStorage.setItem("playRound", JSON.stringify(playRound + 1));
      const newQuestion = {
        ...question,
        question: "",
      };
      setQuestion(newQuestion);
      if (playRound + 1 > totalRounds) {
        navigate("/result");
      }
    }
    const newPlayerList = [...playerList];
    const currentPlayer = newPlayerList[playerTurn];
    if (emptyAnswer) {
      currentPlayer.answer[playRound - 1] = "Empty";
    }
    setPlayerList(newPlayerList);
  };
  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    if (countdown <= 0) {
      clearTimeout(countdown);
      handleSubmit();
    }
  }, [countdown]);
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl text-[#818181] font-bold mb-4">
          {playerList[playerTurn].name}'s turn
        </h1>
        <div className="lg:w-3/5 md:w-4/5 w-11/12 bg-[#f5f5f5] flex flex-col border-2 border-[#818181] p-4">
          <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-4">
            <h1 className="md:text-xl text-md font-bold text-[#818181] flex-1">
              {totalRounds - playRound} questions left
            </h1>
            <p className="text-sm text-[#6e6e6e]">Time remaining</p>
            <div className="w-10 h-10 rounded-full border-2 border-[#818181] text-center leading-[36px] ml-2">
              {countdown}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start mt-2">
            <p className="mb-2 text-lg text-start font-bold text-[#6e6e6e]">
              {question.question}
            </p>
            <ul className="lg:w-3/5 md:w-3/5 w-full flex flex-col gap-2 mx-auto">
              {allAnswer.map((choices, index) => (
                <li
                  key={index}
                  onClick={
                    index !== selectedChoice
                      ? () => setSelectedChoice(index)
                      : () => setSelectedChoice(-1)
                  }
                  className={
                    index === selectedChoice
                      ? "flex flex-row items-center text-lg bg-[#818181] text-[#fff] border-2 border-[#818181] px-2 cursor-pointer"
                      : "flex flex-row items-center text-lg text-[#818181] border-2 border-[#818181] px-2 cursor-pointer"
                  }
                >
                  <div
                    className={
                      index === selectedChoice
                        ? "w-4 h-4 mr-2 rounded-full border-2 border-[#fff]"
                        : "w-4 h-4 mr-2 rounded-full border-2 border-[#888]"
                    }
                  ></div>
                  <p
                    onClick={() =>
                      handleChoices(String.fromCharCode(65 + index))
                    }
                    className="w-11/12"
                  >
                    {choices}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmit}
              className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 mx-auto border-[#818181] bg-[#cccccc] rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameConsole;
