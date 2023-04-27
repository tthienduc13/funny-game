import { useEffect, useState } from "react";
import { Istate as Props } from "../App";
import LoadingMatch from "../components/LoadingMatch";
import LoadingRound from "../components/LoadingRound";
import GameConsole from "../components/GameConsole";
import axios from "axios";
interface Iprops {
  playerList: Props["playerList"];
  setPlayerList: React.Dispatch<React.SetStateAction<Props["playerList"]>>;
}
interface Istate {
  question: {
    question: string;
    correctAnswer: string;
    incorrectAnswer: string[];
    answerChoices: string[];
  };
}

function Game({ playerList, setPlayerList }: Iprops) {
  const [question, setQuestion] = useState<Istate["question"]>(
    JSON.parse(`${window.localStorage.getItem("question")}`) ?? {
      question: "",
      correctAnswer: "",
      incorrectAnswer: "",
      answerChoices: "",
    }
  );

  const [loadingMatch, setLoadingMatch] = useState<boolean>(true);
  const [loadingRound, setLoadingRound] = useState<boolean>(false);
  const playerTurn: number =
    JSON.parse(`${window.localStorage.getItem("playerTurn")}`) ?? 0;
  const playRound: number =
    JSON.parse(`${window.localStorage.getItem("playRound")}`) ?? 0;
  const match: number =
    JSON.parse(`${window.localStorage.getItem("match")}`) ?? 0;
  const totalRounds: number = 3;
  const fetchQuestion = async () => {
    try {
      setLoadingRound(true);
      const responses = await axios.get(
        "https://opentdb.com/api.php?amount=2&type=multiple"
      );
      const { question, correct_answer, incorrect_answers } =
        responses.data.results[0];
      const answerChoices = [...incorrect_answers, correct_answer].sort();
      const formattedQuestion = {
        question: question,
        answerChoices: answerChoices,
        correctAnswer: correct_answer,
        incorrectAnswer: incorrect_answers,
      };
      setQuestion(formattedQuestion);
      setLoadingRound(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (playerTurn !== undefined) {
      fetchQuestion();
      setLoadingMatch(false);
    }
  }, [playerTurn]);
  return (
    <>
      {loadingMatch && <LoadingMatch match={match}></LoadingMatch>}
      {loadingRound ? (
        <LoadingRound playRound={playRound}></LoadingRound>
      ) : (
        <GameConsole
          playerList={playerList}
          setPlayerList={setPlayerList}
          playRound={playRound}
          playerTurn={playerTurn}
          totalRounds={totalRounds}
          question={question}
          setQuestion={setQuestion}
        ></GameConsole>
      )}
    </>
  );
}

export default Game;
