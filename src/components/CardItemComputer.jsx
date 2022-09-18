import React, { useEffect, useRef, useState } from "react";
import "./CardItem.scss";
import { memo } from "react";

const CardItemComputer = ({ cardComputer, hightlight }) => {
  const [listCategories, setListCategories] = useState();

  // Get list category of card when component mount
  useEffect(() => {
    const categoryChildren = [...cate.current.children];
    setListCategories(categoryChildren);
  }, []);

  // Set high light category for computer card
  if (hightlight && listCategories) {
    listCategories.forEach((element) => {
      console.log(element);
      const classCategory = [...element.classList];
      if (classCategory.includes(hightlight.hightlight)) {
        element.classList.add(hightlight.colorHightLight);
      }
    });
  }

  const cate = useRef(null);

  console.log("re-render");
  const {
    name,
    max_atmosphering_speed,
    starship_class,
    cost_in_credits,
    passengers,
    films,
  } = cardComputer;
  return (
    <div className="card">
      <div className="card_header">{name}</div>
      <div className="card_classstarship">{starship_class}</div>
      <div className="card_image">
        <img src="img/star-wars.png" alt="" />
      </div>
      <div className="card_list">
        <ul className="card_list-category" ref={cate}>
          <li className="card_list-category-item speed">
            <p className="card_list-category-item-title">Max Speed</p>
            <p className="card_list-category-item-value">
              {max_atmosphering_speed}
            </p>
          </li>
          <li className="card_list-category-item cost">
            <p className="card_list-category-item-title">Credit Cost</p>
            <p className="card_list-category-item-value">
              {cost_in_credits !== "unknown"
                ? new Intl.NumberFormat().format(cost_in_credits)
                : cost_in_credits}
            </p>
          </li>
          <li className="card_list-category-item passengers">
            <p className="card_list-category-item-title">Passengers</p>
            <p className="card_list-category-item-value">{passengers}</p>
          </li>
          <li className="card_list-category-item films">
            <p className="card_list-category-item-title">Film Appearances</p>
            <p className="card_list-category-item-value">{films.length}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(CardItemComputer);
