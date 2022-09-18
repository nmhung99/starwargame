import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CardItem from "./CardItem";
import axios from "axios";
import "./StarWarGame.scss";
import CardItemComputer from "./CardItemComputer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStarShips } from "../api";
import { notifyResult } from "../notify";
import EmptyCard from "./EmptyCard";

const StarWarGame = () => {
  const [starShips, setStarShips] = useState([]);
  const [clickCate, setClickCate] = useState(false);
  const [hightLightClass, setHightLightClass] = useState({});
  const [turn, setTurn] = useState(0);
  const [getNewCard, setGetNewCard] = useState(0);
  const [score, setScore] = useState({
    playerScore: 0,
    botScore: 0,
  })

  const timeNotify = useRef();

  // Get all starships card when component mount
  useEffect( () => {
    // setStarShips(getStarShips());
    (async () => {
      const data = await getStarShips();
      // console.log(data);
      setStarShips(data);
    })()

    return clearTimeout(timeNotify.current);
  }, []);

  // Get random card for User
  const getRandomCardForUser = useMemo(() => {
    const randomStarShips = starShips[Math.floor(Math.random() * starShips.length)];
    starShips.splice(starShips.indexOf(randomStarShips), 1);
    return randomStarShips;
  }, [starShips, getNewCard]);

  // Get random card for Computer
  const getRandomCardForComputer = useMemo(() => {
    let randomStarShips = starShips[Math.floor(Math.random() * starShips.length)];
    starShips.splice(starShips.indexOf(randomStarShips), 1);
    return randomStarShips;
  }, [starShips, getNewCard]);

  // Handle when user click category on card
  const handleClickCate = useCallback((hightlight, colorHightLight) => {
    setClickCate(!clickCate);
    setHightLightClass({ hightlight, colorHightLight });
    
    if (colorHightLight === "win") {
      setScore(prev => ({...prev, playerScore: prev.playerScore+=1, botScore: prev.botScore > 0 ? prev.botScore-=1 : 0}))
      console.log('win');
      notifyResult("You Win","success");
    } else if (colorHightLight === "lose"){
      setScore(prev => ({...prev, botScore: prev.botScore+=1, playerScore: prev.playerScore > 0 ? prev.playerScore-=1 : 0}))
      notifyResult("You Lose","error");
    } else {
      notifyResult("Draw Card","warning");
    }

    timeNotify.current = setTimeout(() => {
      setClickCate(false);
      setHightLightClass({});
      if (colorHightLight !== "draw") {
        setTurn(prev => prev + 1);
      }  
      setGetNewCard(prev => prev + 1);
    }, 3000);
  }, []);

  return (
    <>
    
    <div className="wrapper">
      {turn >= 3 && <div className="wrapper_layer_endgame">
        <h1 className="wrapper_layer_endgame-title">
          Game Over - {score.playerScore >= score.botScore ? (score.playerScore === score.botScore ? 'Draw' : 'You Win') : 'You Lose'}
        </h1>
      </div>}
      <div className="wrapper_card">
        {starShips.length > 0 ? (
          <><div className="wrapper_card-score"><h4>User Score </h4> <p>{score.playerScore}</p> </div>
          <CardItem
            cardUser={getRandomCardForUser}
            cardComputer={getRandomCardForComputer}
            handleClickCate={handleClickCate}
            hightLightClass={hightLightClass}
            clickCate={clickCate}
          /></>
        ) : (<><h3>Loading...</h3></>)}
      </div>
      
      <div className="wrapper_card">
        {
          clickCate ? (
            <>
            <CardItemComputer
            cardComputer={getRandomCardForComputer}
              hightlight={hightLightClass}
            />
            <div className="wrapper_card-score"><h4>Bot Score </h4> <p>{score.botScore}</p> </div>
            </>
            
          ) : (starShips.length > 0 && <> <EmptyCard/> <div className="wrapper_card-score"><h4>Bot Score </h4> <p>{score.botScore}</p> </div></>)
        
        }
        
      </div>
      
      <ToastContainer />
    </div>
    </>
    
  );
};

export default StarWarGame;
