interface Iprops {
  playRound: number;
}

function LoadingRound({ playRound }: Iprops) {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="lg:w-2/5 md:w-4/5 w-11/12 min-h-[20rem] bg-[#f5f5f5] flex flex-col justify-center items-center">
          <div className="text-4xl font-bold text-[#505150]">Loading....</div>
          <div className="text-xl font-bold text-[#505150]">
            Round {playRound}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingRound;
