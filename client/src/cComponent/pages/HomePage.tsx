import pic1 from "../../../image/1.jpg";
import pic2 from "../../../image/2.jpg";
import pic3 from "../../../image/3.jpg";
import pic4 from "../../../image/4.jpg";
import pic5 from "../../../image/5.jpg";
import pic7 from "../../../image/7.jpg";
import pic8 from "../../../image/8.jpg";
import pic6 from "../../../image/6.jpg";
import ImageSlider from "../ImageSlider";
import CategoryHome from "../CategoryHome";
import useAuth from "../../../hooks/useAuth";
import TopPicksForYou from "../TopPicksForYou";
import Personalized from "../Personalized";

const IMAGES = [
  { url: pic1, alt: "pic 1" },
  { url: pic2, alt: "pic 2" },
  { url: pic3, alt: "pic 3" },
  { url: pic4, alt: "pic 4" },
  { url: pic5, alt: "pic 5" },
  { url: pic6, alt: "pic 6" },
  { url: pic7, alt: "pic 7" },
  { url: pic8, alt: "pic 8" },
];

const HomePage = () => {
  const { auth } = useAuth();
  
  return (
    <div>
      <div className="h-max w-full flex items-center justify-center ">
        <ImageSlider images={IMAGES} />
      </div>
      <div className="mt-4 py-4 ">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-center">
          Categories for you
        </h2>
        <CategoryHome />
      </div>
      <div className="mt-4 py-4 ">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-center">
          Top Picks for you
        </h2>
        <TopPicksForYou />
      </div>
      {!auth?.token && <Personalized />}
    </div>
  );
};

export default HomePage;
