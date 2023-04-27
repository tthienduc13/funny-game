import { Istate as Props } from "../App";
import { useState } from "react";
interface Iprops {
  playerList: Props["playerList"];
}
interface IData {
  id: number;
  playerName: string;
  answer: string[];
  correctAnswer: string[];
  score: number;
  time: number;
}
function Result({ playerList }: Iprops) {
  const calculateScore = (
    answers: string[],
    correctAnswers: string[]
  ): number => {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        score++;
      }
    }
    return score;
  };

  const data: IData[] = playerList.map((player, index) => {
    const score = calculateScore(player.answer, player.correctAnswer);
    return {
      id: index + 1,
      playerName: player.name,
      answer: player.answer,
      correctAnswer: player.correctAnswer,
      score: score,
      time: player.time,
    };
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.playerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const winners = filteredData.filter(
    (item) => item.score === Math.max(...filteredData.map((item) => item.score))
  );
  const sortedWinners = winners.sort((a, b) => a.time - b.time);
  const winnerName = sortedWinners[0].playerName;
  localStorage.setItem("winner", JSON.stringify(winnerName));

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center p-2">
        <div className="lg:w-3/5 md:w-4/5 w-11/12 bg-[#f5f5f5] flex flex-col border-2 border-[#818181] p-4">
          <div className="flex flex-row justify-between items-center border-b-2 border-[#818181] pb-4">
            <h1 className="text-2xl font-bold text-[#6e6e6e]">Game Result</h1>
            <a href="/winner">
              <button className="text-lg text-[#59595a] px-8 py-1 border-2 border-[#818181] bg-[#cccccc] rounded-md">
                Finally
              </button>
            </a>
          </div>
          <form className="flex sm:flex-row flex-col items-strech mt-4 mx-auto">
            <input
              className="md:w-[16rem] outline-none border-2 border-[#818181] px-2 py-1 sm:rounded-l-full"
              type="text"
              placeholder="Search player"
              onChange={(e) => handleSearchChange(e)}
            ></input>
            <button className="border-2 sm:border-l-0 border-[#818181] sm:rounded-r-full sm:px-6 px-2 flex items-center justify-center cursor-pointer sm:mt-0 mt-2">
              Search
            </button>
          </form>
          <div className="w-full flex flex-col mt-4 text-sm">
            <div className="flex flex-row font-bold">
              <div className="w-1/5 flex justify-center items-center p-2 border-2 border-[#818181]">
                Player
              </div>
              <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
                Answer
              </div>
              <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
                Result
              </div>
              <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
                Score
              </div>
              <div className="w-1/5 flex justify-center items-center p-2 border-2 border-l-0 border-[#818181]">
                Time
              </div>
            </div>
            {filteredData.map((data) => (
              <div className="flex flex-row ">
                <div className="w-1/5 flex justify-center items-center p-2 border-2 border-t-0 border-[#818181]">
                  {data.playerName}
                </div>
                <div className="w-1/5 flex justify-center items-center p-2 border-2 border-t-0 border-l-0 border-[#818181]">
                  {data.answer
                    .map((answer) => (answer ? answer : "Empty"))
                    .join(" , ")}
                </div>
                <div className="w-1/5 flex justify-center items-center p-2 border-2 border-t-0 border-l-0 border-[#818181]">
                  {data.correctAnswer.join(" , ")}
                </div>
                <div className="w-1/5 flex justify-center items-center p-2 border-2 border-t-0 border-l-0 border-[#818181]">
                  {data.score}
                </div>
                <div className="w-1/5 flex justify-center items-center p-2 border-2 border-t-0 border-l-0 border-[#818181]">
                  {data.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
