import React from "react";
import style from "./Cards.module.css";
import { NavLink } from "react-router-dom";

export default function Cards(props) {

  return (
    <div className={style.mo}>
      <div className={style.cards}>
        <img className={style.image} src={props.image} alt="" />
        <div className={style.dentro}>
          <NavLink to={`/details/${props.id}`}>
            <h5>{props.title}</h5>
          </NavLink>
          <p>
            <b>Dieta: </b>
            {props.diets.join(" ~ ")}
          </p>
          <p className={style.info}>Para mas info, clickea en el titulo</p>
        </div>
      </div>
    </div>
  );
}
