import React, { useState } from 'react';
import { TbMapSearch } from 'react-icons/tb';
import { BiSolidContact } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/',
      name: 'Contact',
      icon: <BiSolidContact />,
    },
    {
      path: '/maps',
      name: 'Charts & Map',
      icon: <TbMapSearch />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? '200px' : '50px' }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main
        style={{
          height: '90vh',
          overflow: 'scroll',
          overflowX: 'hidden',
          ...(isOpen
            ? {
                paddingLeft: '120px',
                paddingRight: '50px',
                overflowX: 'visible',
              }
            : null),
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
