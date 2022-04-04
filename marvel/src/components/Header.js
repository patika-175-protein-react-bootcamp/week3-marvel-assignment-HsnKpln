import React from 'react'
import mrvImage from '../images/marvel.png'
import mainImage from '../images/image1.png'
function Header() {
  return (
    <div className='header'>
      <img src={mainImage} className="mainImage"></img>
      <img src={mrvImage} className="marvel"></img>
    </div>
  )
}

export default Header