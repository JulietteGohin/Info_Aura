import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'




const Menu = ({ items, activeItem, setActiveItem, list_0, list_1, list_2, list_3}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  let sub_list = [];
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

  function sub_menu(index) {
    console.log(sub_list,index);
    switch (index) {
      case 0:
        sub_list=list_0;
        break;
      case 1:
        sub_list=list_1;
        break;
      case 2:
        sub_list=list_2;
        break;
      case 3:
        sub_list=list_3;
        break;
    }
    return(sub_list);
  };
  function updateDiv() {
    // Step 1: Select the <div> element
    const divElement = document.getElementById("sub_menu");

    // Step 3: Update the content of the <div> element
    divElement.innerHTML = "Updated content";
  }
  

  // Calculate the width of each menu item based on the number of items
  const itemWidth = 100 / items.length;
  const sub_itemWidth = 100 / sub_list.length;

  return (
    <>
      <div className={styles.menu}>
        {items.map((item, index) => (
          <a
            key={index}
            className={`${styles.menuItem} ${
              activeItem === index ? styles.active : ''
            }`}
            style={{ width: `${itemWidth}%` }}
            
            onClick={() => {sub_menu(index),setActiveItem(index),updateDiv()}}
            /*onClick={() => }
            onClick={() => }*/
          >
            {item}
          </a>
        ))} 
      </div>
      <div id='sub_menu' className={styles.menu}>
        {sub_list.map((sub_item, sub_index) => (
          <a
            key={sub_index}
            className={`${styles.menuItem} ${
              activeItem === sub_index ? styles.active : ''
            }`}
            style={{ width: `${sub_itemWidth}%` }}
            onClick={() => setActiveItem(sub_index)}
          >
            {sub_item}
          </a>
        ))}
      </div>
    </>
  );
};
export default Menu;
