import React from 'react';
import ReactNavbar from './ReactNavbar.js';
import logo from '../../../images/logo.png';
import searchIconImage from '../../../images/searchIconImage.png'
import cartIconImage from '../../../images/cartIconImage.png'
import profileIconImage from '../../../images/profileIconImage.png'

const options = {
burgerColorHover : "#eb4034",
logo,
logoWidth : "20vmax",
navColour1 : "rgba(0,0,0,0.4)",
logoHoverSize : "15px",
logoHoverColor :"antiquewhite",
link1Text :"Home",
link2Text :"Products",
link3Text :"Contact",
link4Text :"About",
link1Url : "/",
link2Url : "/products",
link3Url : "/contact",
link4Url : "/about",
link1Size : "2vmax",
link1Color:"antiquewhite",
nav1justifyContent : "flex end",
nav2justifyContent : "flex end",
nav3justifyContent : "flex start",
nav4justifyContent : "flex start",
link1ColorHover : "#eb4034",
link1Margin:"3vmax",
link3ColorHover : "#eb4034",
link3Margin:"3vmax",
profileIconUrl: "/login",
profileIconColor : "rgba(35,35,35,0.8)",
searchIconColor : "rgba(35,35,35,0.8)",
cartIconColor : "rgba(35,35,35,0.8)",
profileIconColorHover : "#eb4034",
searchIconColorHover : "#eb4034",
cartIconColorHover : "#eb4034",
cartIconMargin :"1vmax",
searchIconImage,
searchIconMargin: "2vmax",
searchIconTransition: "0.5s",
cartIconImage,
cartIconMargin: "2vmax",
profileIconImage,
profileIconMargin: "2vmax",
  '@media (max-width: 768px)': {
    logoWidth: '15vmax', // Adjust logo width for medium-sized screens
    link1Size: '1.2vmax', // Adjust link size for medium-sized screens
    /* Add more styles for medium-sized screens if needed */
  },

  /* Media query for small screens */
  '@media (max-width: 480px)': {
    logoWidth: '10vmax', // Adjust logo width for small screens
    link1Size: '1vmax', // Adjust link size for small screens
    /* Add more styles for small screens if needed */
  },
};

const Header = () => {
  return (
    <ReactNavbar {...options}/>
  );
}

export default Header;


