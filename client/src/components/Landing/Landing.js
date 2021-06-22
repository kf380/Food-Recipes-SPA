import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div data-testid="todo" className={style.todo}>
      <div className={style.land}>
        <div className={style.la}>
          <h1>Bienvenidos al mejor sitio de recetas   <br>
          </br>
            Elegi la que mas te guste! </h1>

          <p className={style.join}>
            <NavLink data-testid="" className="dd" to="/home">
              Ingresa
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}