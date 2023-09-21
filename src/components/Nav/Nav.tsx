import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export const Nav: React.FC = () => (
  <>
    <div className="header">
      <h1 className="header_title">Soccers Ponteilla-Nyls</h1>
    </div>
    <nav className="nav mt-4">
      <ul className="nav_list flex">
        <li className="nav_item ml-5">
          <Link to="/" className="nav_link">
            Accueil
          </Link>
        </li>
        <li className="nav_item ml-5">
          <Link to="/calendar" className="nav_link">
            Calendrier
          </Link>
        </li>
      </ul>
    </nav>
  </>
);
