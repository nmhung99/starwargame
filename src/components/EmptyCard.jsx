import React from "react";
import "./CardItem.scss";
import { memo } from "react";

const EmptyCard = () => {
  return (
    <div className="card">
      <div className="card_header">Name ?</div>
      <div className="card_classstarship">Class ?</div>
      <div className="card_image">
        <img src="img/star-wars.png" alt="" />
      </div>
      <div className="card_list">
        <ul className="card_list-category">
          <li className="card_list-category-item speed">
            <p className="card_list-category-item-title">Max Speed</p>
            <p className="card_list-category-item-value">?</p>
          </li>
          <li className="card_list-category-item cost">
            <p className="card_list-category-item-title">Credit Cost</p>
            <p className="card_list-category-item-value">?</p>
          </li>
          <li className="card_list-category-item passengers">
            <p className="card_list-category-item-title">Passengers</p>
            <p className="card_list-category-item-value">?</p>
          </li>
          <li className="card_list-category-item films">
            <p className="card_list-category-item-title">Film Appearances</p>
            <p className="card_list-category-item-value">?</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(EmptyCard);
