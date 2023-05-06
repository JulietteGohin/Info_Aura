import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const Menu = ({ items, activeItem, setActiveItem }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll event and update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollX);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  // Calculate the width of each menu item based on the number of items
  const itemWidth = 100 / items.length;

  return (
    <div className={styles.menu}>
      {items.map((item, index) => (
        <a
          key={index}
          className={`${styles.menuItem} ${
            activeItem === index ? styles.active : ''
          }`}
          style={{ width: `${itemWidth}%` }}
          onClick={() => setActiveItem(index)}
        >
          {item}
        </a>
      ))}
      {/* Render a line to indicate the active menu item */}
      <div
        className={styles.line}
        style={{
          width: `${itemWidth}%`,
          transform: `translateX(${activeItem * itemWidth + scrollPosition}px)`,
        }}
      />
    </div>
  );
};

export default Menu;
