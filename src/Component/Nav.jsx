import React, { useState } from "react";

function NavBarComponent() {
  const menuItems = [
    { id: 1, label: "Home", href: "#home" },
    { id: 2, label: "About", href: "#about" },
    { id: 3, label: "Services", href: "#services" },
    { id: 4, label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="navbar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={item.id}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBarComponent;
