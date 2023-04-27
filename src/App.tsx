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
    answer: string[];
    correctAnswer: string[];
    score: 0;
    time: 0;
  }[];
  match: number;
  question: {
    question: string;
    correctAnswer: string;
    incorrectAnswer: string[];
  };
}
function App() {
  const [playerList, setPlayerList] = useState<Istate["playerList"]>(
    JSON.parse(`${window.localStorage.getItem("playerList")}`) || []
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
          element={
            <CreateGame
              playerList={playerList}
              setPlayerList={setPlayerList}
            ></CreateGame>
          }
        ></Route>
        <Route
          path="/game"
          element={
            <Game playerList={playerList} setPlayerList={setPlayerList}></Game>
          }
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
