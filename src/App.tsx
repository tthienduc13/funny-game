import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Winner from "./pages/Winner";
export interface Istate {
  playerList: {
    id: number;
    name: string;
    answer: number[];
    correctAnswer: number[];
    score: 0;
    time: 0;
  }[];
  question: {
    question: string;
    correctAnswer: string;
    incorrectAnswer: string[];
  };
}
function App() {
  const [playerList, setPlayerList] = useState<Istate["playerList"]>(
    JSON.parse(`${window.localStorage.getItem("playerList")}`) || [
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
    ]
  );
  useEffect(() => {
    localStorage.setItem("playerList", JSON.stringify(playerList));
  }, [playerList]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/create-game"
          element={<CreateGame setPlayerList={setPlayerList}></CreateGame>}
        ></Route>
        <Route
          path="/game"
          element={<Game playerList={playerList}></Game>}
        ></Route>
        <Route
          path="/result"
          element={<Result playerList={playerList}></Result>}
        ></Route>
        <Route
          path="/winner"
          element={
            <Winner
              playerList={playerList}
              setPlayerList={setPlayerList}
            ></Winner>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
