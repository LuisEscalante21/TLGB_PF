import React from 'react'
import '../../Console.css'; 

import PcIcon from '../../svg/PcIcon';
import PlayStationIcon from '../../svg/PlayStationIcon';
import XboxIcon from '../../svg/XboxIcon';
import NintendoIcon from '../../svg/NintendoIcon';
import { NavLink } from 'react-router';


const ConsoleNav = () => {
  return (
    <nav className="console-menu">
      <ul className="console-contenedor">
        <li className="menu-list select-pc">
          <NavLink to="/pc" className={({ isActive }) => (isActive ? "nav-console-link active-pc" : "nav-console-link")}>
            <PcIcon  iconColor="#FFFFFF" />
            PC
          </NavLink>
        </li>
        <li className="menu-list select-playstation">
          <NavLink to="/playstation" className={({ isActive }) => (isActive ? "nav-console-link active-ps" : "nav-console-link")}>
            <PlayStationIcon iconColor="#FFFFFF" />
            PlayStation
          </NavLink>
        </li>
        <li className="menu-list select-xbox">
          <NavLink to="/xbox" className={({ isActive }) => (isActive ? "nav-console-link active-xbox" : "nav-console-link")}>
            <XboxIcon iconColor="#FFFFFF" />
            Xbox
          </NavLink>
        </li>
        <li className="menu-list select-nintendo">
          <NavLink to="/nintendo" className={({ isActive }) => (isActive ? "nav-console-link active-nintendo" : "nav-console-link")}>
            <NintendoIcon iconColor="#FFFFFF"  />
            Nintendo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};


export default ConsoleNav