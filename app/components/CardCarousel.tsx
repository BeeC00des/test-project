"use client";
import { useState } from "react";
import Card from "../components/Card"; // Import Card component

type CardData = {
  id: number;
  transparentText: string;
  numberTitle: string;
  unit: string;
  subTitle: string;
  text: string;
  img: string;
};

type CardCarouselProps = {
  cardsData: CardData[];
};

const CardCarousel = ({ cardsData }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= cardsData.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? cardsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full lg:h-[650px] sm:h-[300px] md:h-[450px] overflow-hidden lg:mt-40 md:mt-12 sm:mt-32">
      {/* Left Screen Area - Previous */}
      <div
        className="absolute left-0 top-0 h-full w-1/2 z-10 cursor-pointer"
        onClick={handlePrev}
      ></div>

      {/* Right Screen Area - Next */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 z-10 cursor-pointer"
        onClick={handleNext}
      ></div>

      {/* Carousel Content */}
      <div
        className="flex transition-transform duration-500 ease-in-out animate-slideIn "
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`flex-shrink-0 w-[90%] md:w-[90%] mr-[4%] md:mr-[1%] ${
              index === currentIndex ? "z-10" : "z-0"
            }`}
          >
            <Card
              transparentText={card.transparentText}
              numberTitle={card.numberTitle}
              unit={card.unit}
              subTitle={card.subTitle}
              text={card.text}
              img={card.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
