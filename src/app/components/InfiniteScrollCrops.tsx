"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Crop Data
const crops = [
  { name: "Tomato", img: "/crops/Tomatoes.png" },
  { name: "Chiili Pepper", img: "/crops/Chilli peppers.png" },
  { name: "Okro", img: "/crops/okro.png" },
  { name: "Pepper", img: "/crops/Pepper.png" },
  { name: "Potato", img: "/crops/Potato.png" },
  // { name: "sticks", img: "/crops/Sticks.png" },
  { name: "Maize", img: "/crops/Maize.png" },
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
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {crops.map((crop, index) => (
          <div key={`${crop.name}-${index}`} className="flex items-center justify-center px-2">
            <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden shadow-md bg-white">
              <img
                src={crop.img}
                alt={crop.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-green-900 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
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
