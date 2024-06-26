import "./App.css";

import { useState, useEffect } from "react";

import patternDividerMobile from "./assets/pattern-divider-mobile.svg";
import patternDividerDesktop from "./assets/pattern-divider-desktop.svg";
import iconDice from "./assets/icon-dice.svg";

function App() {
  const [isDesktopWidth, setIsDesktopWidth] = useState(
    window.innerWidth >= 520
  );

  /**** This effect handles window width changes */
  useEffect(() => {
    const handleResize = () => {
      setIsDesktopWidth(window.innerWidth >= 520);
    };

    /*** This event listener ensures state updates on window width change */
    window.addEventListener("resize", handleResize);

    handleResize();

    /*** Removed event listener as component unmounts */
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsDesktopWidth]);

  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState({});

  //This function fetched quote from API
  async function fetchQuote() {
    setIsLoading(true);
    setQuote({});
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  //Fetch a quote on mount
  useEffect(() => {
    fetchQuote();
  }, [setQuote]);

  function handleDiceClick() {
    fetchQuote();
  }

  return (
    <div className="relative w-full min-h-screen font-extrabold font-manrope bg-darkBlue">
      <main className="absolute top-[50%] left-[50%] translate-x-[-50%] -translate-y-[50%] w-[calc(100%-2rem)] max-w-[400px]">
        <div className="relative w-full h-full p-5 pb-12 mx-auto bg-darkGrayishBlue rounded-lg text-lightCyan text-center">
          {/*** Render only if quote isnt empty */}
          {quote.slip && (
            <>
              {/** Heading */}
              <h2 className="text-[12px] text-neonGreen md:text-sm">
                ADVICE #{quote.slip.id}
              </h2>

              {/** Quote */}
              <p className="text-white text-lg mt-4 md:text-xl">
                {`"${quote.slip.advice}"`}
              </p>
            </>
          )}

          {/** Loading */}
          {isLoading && (
            <>
              <p className=" text-lg mt-4 md:text-xl">Loading...</p>
            </>
          )}

          {/** Pattern Divider Image */}
          <img
            src={isDesktopWidth ? patternDividerDesktop : patternDividerMobile}
            className="w-full mt-5 md:mt-7"
          />

          {/** Dice icon */}
          <div
            className="icon-dice absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] bg-neonGreen p-3 rounded-full cursor-pointer md:p-4"
            onClick={handleDiceClick}
          >
            <img src={iconDice} className="h-5" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
