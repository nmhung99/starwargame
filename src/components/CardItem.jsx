import React, { useEffect, useRef, useState } from "react";
import "./CardItem.scss";
import { memo } from "react";

const CardItem = ({ cardUser, cardComputer, handleClickCate, hightLightClass, clickCate }) => {
  console.log(hightLightClass);
  const { name, "max_atmosphering_speed": speed, "starship_class": sclass, "cost_in_credits": cost, passengers, films } = cardUser;
  const { "max_atmosphering_speed": speedComputer, "cost_in_credits": costComputer, "passengers": psgComputer, "films": filmsComputer } = cardComputer;
  const [listCategories, setListCategories] = useState();
  const cate = useRef(null);

  // Get list category of card when component mount
  useEffect(() => {
    const categoryChildren = [...cate.current.children];
    setListCategories(categoryChildren);
  }, []);

  // Handle when click category on carrd
  const handleClick = (e) => {
    const highLightCate = [...e.target.classList][1];

    let colorHightLight;
    if ([...e.target.classList][1] === 'speed') {
      if (isNaN(speed - speedComputer)) {
        colorHightLight = 'draw'
      } else {
        colorHightLight = speed - speedComputer >= 0 ? (speed - speedComputer === 0 ? 'draw' : 'win') : 'lose'
      }
    }

    if ([...e.target.classList][1] === 'cost') {
      if (isNaN(cost - costComputer)) {
        colorHightLight = 'draw'
      } else {
        colorHightLight = cost - costComputer >= 0 ? (cost - costComputer === 0 ? 'draw' : 'win') : 'lose'
      }
    }

    if ([...e.target.classList][1] === 'passengers') {
      if (isNaN(passengers - psgComputer)) {
        colorHightLight = 'draw'
      } else {
        colorHightLight = passengers - psgComputer >= 0 ? (passengers - psgComputer === 0 ? 'draw' : 'win') : 'lose'
      }
    }

    if ([...e.target.classList][1] === 'films') {
      if (isNaN(films.length - filmsComputer.length)) {
        colorHightLight = 'draw'
      } else {
        colorHightLight = films.length - filmsComputer.length >= 0 ? (films.length - filmsComputer.length === 0 ? 'draw' : 'win') : 'lose'
      }
    }
    handleClickCate(highLightCate, colorHightLight);
    // setHightLight(colorHightLight)
    e.target.classList.add(colorHightLight);
  };

  // Add event click for each category on card
  if (listCategories) {
    listCategories.forEach((element) => {
      element.onclick = !clickCate ? handleClick : null;

      // Remove hight light category after notify result
      if (Object.keys(hightLightClass).length === 0) {
        element.classList.remove('win') || element.classList.remove('lose') || element.classList.remove('draw')
      }
    });
    clickCate = true;
  }

  return (
    <div className="card">
      <div className="card_header">{name}</div>
      <div className="card_classstarship">{sclass}</div>
      <div className="card_image">
        <img src="img/star-wars.png" alt="" />
      </div>
      <div className="card_list">
        <ul className="card_list-category" ref={cate}>
          <li className={`card_list-category-item speed`}>
            <p className="card_list-category-item-title">Max Speed</p>
            <p className="card_list-category-item-value">
              {speed}
            </p>
          </li>
          <li className={`card_list-category-item cost`}>
            <p className="card_list-category-item-title">Credit Cost</p>
            <p className="card_list-category-item-value">
              {cost !== "unknown"
                ? new Intl.NumberFormat().format(cost)
                : cost}
            </p>
          </li>
          <li className={`card_list-category-item passengers`}>
            <p className="card_list-category-item-title">Passengers</p>
            <p className="card_list-category-item-value">{passengers}</p>
          </li>
          <li className={`card_list-category-item films`}>
            <p className="card_list-category-item-title">Film Appearances</p>
            <p className="card_list-category-item-value">{films.length}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(CardItem);
