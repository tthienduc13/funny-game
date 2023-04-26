import loadingMatch from "../assets/loadingMatch.png";
interface Iprops {
  match: number;
}
function LoadingMatch({ match }: Iprops) {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <div className="text-3xl font-bold text-[#505150]">Match {match}</div>
          <div>
            <img src={loadingMatch}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingMatch;
