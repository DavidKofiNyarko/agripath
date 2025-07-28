"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Crop Data
const crops = [
  { name: "Tomato", img: "/crops/Tomatoes.png" },
  { name: "Chilli Pepper", img: "/crops/chilli-pepper.png" },
  { name: "Okro", img: "/crops/okro.png" },
  { name: "Pepper", img: "/crops/Pepper.png" },
  { name: "Potato", img: "/crops/Potato.png" },
  // { name: "sticks", img: "/crops/Sticks.png" },
  { name: "Maize", img: "/crops/Maize.png" },
  { name: "Bell Pepper", img: "/crops/Bell_Pepper.png" },
  { name: "Pigs", img: "/crops/Pigs.png" },
  {name:"Broilers", img:"/crops/Broiler.png"},
];

const InfiniteScrollCrops = () => {
  // Settings for react-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: "15px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden px-2 sm:px-4 md:px-6">
      <Slider {...settings}>
        {crops.map((crop, index) => (
          <div key={`${crop.name}-${index}`} className="px-2 sm:px-3 md:px-4">
            <div className="relative w-full max-w-[180px] sm:max-w-[200px] h-[150px] sm:h-[180px] md:h-[200px] rounded-md overflow-hidden shadow-md bg-white mx-auto">
              <img
                src={crop.img}
                alt={crop.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-green-900 text-white text-xs px-2 sm:px-3 py-1 rounded-full shadow font-semibold">
                {crop.name}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfiniteScrollCrops;
