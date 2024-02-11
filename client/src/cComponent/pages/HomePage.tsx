import React from 'react'
import pic1 from '../../image/1.jpg';
import pic2 from '../../image/2.jpg';
import pic3 from '../../image/3.jpg';
import pic4 from '../../image/4.jpg';
import pic5 from '../../image/5.jpg';
import pic7 from '../../image/7.jpg';
import pic8 from '../../image/8.jpg';
import pic6 from '../../image/6.jpg';
import mens from '../../image/mens.jpg';
import electronics from './image/Electronic.jpg';
import jewellery from './image/jewell.jpg';
import womens from './image/womens.jpg';
import ImageSlider from '../ImageSlider';
const IMAGES = [
    {url: pic1, alt: "pic 1"},
    {url: pic2, alt: "pic 2"},
    {url: pic3, alt: "pic 3"},
    {url: pic4, alt: "pic 4"},
    {url: pic5, alt: "pic 5"},
    {url: pic6, alt: "pic 6"},
    {url: pic7, alt: "pic 7"},
    {url: pic8, alt: "pic 8"}
  ]

const HomePage = () => {

  return (
    <div>
         <div className="h-80 w-full flex items-center justify-center bg-white">
      <ImageSlider images={IMAGES}/>
    </div>
        
    </div>
  )
}

export default HomePage