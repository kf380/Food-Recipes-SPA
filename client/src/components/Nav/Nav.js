import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <nav>
        <ul className="list">
          <li className="list-item">
            <NavLink className="name" exact to="/home">
              Inicio
            </NavLink>
          </li>

          <li className="list-item">
            <NavLink to="/create">Crear Recetas</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}