import { Istate as Props } from "../App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
interface Iprops {
  playerList: Props["playerList"];
  playRound: number;
  playerTurn: number;
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
  playerTurn,
  playRound,
  question,
  setQuestion,
}: Iprops) {
  const totalRounds: number = 3;
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [selectedChoice, setSelectedChoice] = useState(-1);
  const allAnswer = question.answerChoices ?? [];
  const handlePlayerTurn = (playerTurn: number, correctAnswerIndex: number) => {
    const currentPlayer = playerList[playerTurn];
    currentPlayer.correctAnswer.push(correctAnswerIndex);
    currentPlayer.answer.push(countdown === 0 ? -1 : selectedChoice);
    currentPlayer.time += 10 - countdown;
    localStorage.setItem(
      "playerTurn",
      JSON.stringify(Math.abs(playerTurn - 1))
    );
  };
  const handleSubmit = () => {
    const correctAnswerIndex = allAnswer.findIndex(
      (answer) => answer === question.correctAnswer
    );
    if (playerTurn === 0) {
      handlePlayerTurn(0, correctAnswerIndex);
    } else if (playerTurn === 1) {
      handlePlayerTurn(1, correctAnswerIndex);
      window.localStorage.setItem("playRound", JSON.stringify(playRound + 1));
      if (playRound + 1 > totalRounds) {
        navigate("/result");
      }
    }
    const newQuestion = {
      ...question,
      question: "",
    };
    setQuestion(newQuestion);
    localStorage.setItem("playerList", JSON.stringify(playerList));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setCountdown(countdown - 1), 1000);
    if (countdown <= 0) {
      clearTimeout(timeout);
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
                  onClick={() =>
                    setSelectedChoice(index === selectedChoice ? -1 : index)
                  }
                  className={`flex flex-row items-center text-lg border-2 border-[#818181] px-2 cursor-pointer ${
                    index === selectedChoice
                      ? "bg-[#818181] text-[#fff] border-[#818181]"
                      : "text-[#818181] border-[#888]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 mr-2 rounded-full border-2 ${
                      index === selectedChoice
                        ? "border-[#fff]"
                        : "border-[#888]"
                    }`}
                  ></div>
                  <p className="w-11/12">{choices}</p>
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
