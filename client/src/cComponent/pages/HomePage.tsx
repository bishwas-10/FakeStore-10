import React from 'react'
import pic1 from '../../../image/1.jpg';
import pic2 from '../../../image/2.jpg';
import pic3 from '../../../image/3.jpg';
import pic4 from '../../../image/4.jpg';
import pic5 from '../../../image/5.jpg';
import pic7 from '../../../image/7.jpg';
import pic8 from '../../../image/8.jpg';
import pic6 from '../../../image/6.jpg';
import mens from '../../../image/mens.jpg';
import electronics from '../../../image/Electronic.jpg';
import jewellery from '../../../image/jewell.jpg';
import womens from '../../../image/womens.jpg';
import ImageSlider from '../ImageSlider';
import CategoryHome from '../CategoryHome';
import BackToTop from '../reusable/BackToTop';
import Footer from '../Footer';
const IMAGES = [
    {url: pic1, alt: "pic 1"},
    {url: pic2, alt: "pic 2"},
    {url: pic3, alt: "pic 3"},
    {url: pic4, alt: "pic 4"},
    {url: pic5, alt: "pic 5"},
    {url: pic6, alt: "pic 6"},
    {url: pic7, alt: "pic 7"},
    {url: pic8, alt: "pic 8"}
  ];
  const CATEGORIES= [
    {name: "electronics", url :electronics , alt : "electronics"},
    {name: "men's clothing", url :mens , alt : "mens"},
    {name: "women's clothing", url :womens , alt : "womens"},
    {name: "jewelery", url :jewellery , alt : "jewellery"},
  
  ];

const HomePage = () => {

  return (
    <div>
         <div className="h-80 w-full flex items-center justify-center ">
      <ImageSlider images={IMAGES}/>
    </div>
    <div className="mt-4 py-4 ">
      <h2 className="text-2xl font-bold capitalize tracking-wide text-center">Categories for you</h2>
        <CategoryHome categories= {CATEGORIES}/>
    </div>
    <div className="h-40 mx-4 my-2 flex flex-col items-center justify-center shadow-sm  border-2 border-gray-400 rounded-lg ">
     <p>See Personalized Recommendation</p>
     <button className="bg-yellow-600 px-4 py-1 mt-1 font-medium text-[15px] rounded">Sign In</button>
     <span className="text-sm">New Customer? <a href="#" className="text-blue-600 text-[14px]">Start here</a></span>
    </div>
    <BackToTop/>
    <Footer/>
    </div>
  )
}

export default HomePage