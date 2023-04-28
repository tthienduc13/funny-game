import gameLogo from "../assets/gameLogo.png";
import { useNavigate } from "react-router-dom";
import { Istate as Props } from "../App";
interface Iprops {
  playerList: Props["playerList"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
}
function Winner({ playerList, setPlayerList }: Iprops) {
  const navigate = useNavigate();
  const winner = localStorage.getItem("winner") ?? "Empty";
  const match: number =
    JSON.parse(`${window.localStorage.getItem("match")}`) ?? 0;
  const handleNextGame = () => {
    window.localStorage.setItem("match", JSON.stringify(match + 1));
    window.localStorage.setItem("playRound", JSON.stringify(1));
    window.localStorage.setItem("winner", JSON.stringify(""));
    setPlayerList([
      {
        id: 1,
        name: playerList[0].name,
        answer: [],
        correctAnswer: [],
        score: 0,
        time: 0,
      },
      {
        id: 2,
        name: playerList[1].name,
        answer: [],
        correctAnswer: [],
        score: 0,
        time: 0,
      },
    ]);
    navigate("/game");
  };
  const handlePlayAgain = () => {
    window.localStorage.setItem("match", JSON.stringify(1));
    window.localStorage.setItem("playRound", JSON.stringify(1));
    window.localStorage.setItem("winner", JSON.stringify(""));
    setPlayerList([
      {
        id: 1,
        name: "",
        answer: [],
        correctAnswer: [],
        score: 0,
        time: 0,
      },
      {
        id: 2,
        name: "",
        answer: [],
        correctAnswer: [],
        score: 0,
        time: 0,
      },
    ]);
    navigate("/");
  };
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <div className="w-[10rem]">
            <img src={gameLogo}></img>
          </div>
          <div className="text-4xl font-bold text-[#505150]">Funny Game</div>
          <h1 className="text-2xl font-bold text-[#505150] mt-2">
            Winner: {winner}
          </h1>
          {match === 1 ? (
            <button
              onClick={handleNextGame}
              className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 border-[#818181] bg-[#cccccc] rounded-md"
            >
              Play match 2
            </button>
          ) : (
            <button
              onClick={handlePlayAgain}
              className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 border-[#818181] bg-[#cccccc] rounded-md"
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Winner;
