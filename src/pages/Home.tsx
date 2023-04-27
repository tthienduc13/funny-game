import gameLogo from "../assets/gameLogo.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <div className="w-[10rem]">
            <img src={gameLogo}></img>
          </div>
          <div className="text-4xl font-bold text-[#505150]">Funny Game</div>
          <Link to={"/create-game"}>
            <button className="text-lg text-[#59595a] px-8 py-1 border-2 mt-4 border-[#818181] bg-[#cccccc] rounded-md">
              Start Game
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
