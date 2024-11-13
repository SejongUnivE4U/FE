import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (delta: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + delta;
      if (newIndex < 0) {
        return prevIndex;
      } else if (newIndex >= children.length) {
        return prevIndex;
      }
      return newIndex;
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    trackMouse: true,
  });

  return (
    <CarouselContainer {...handlers}>
      <SlideWrapper currentIndex={currentIndex}>
        {children.map((child, index) => (
          <Slide key={index}>{child}</Slide>
        ))}
      </SlideWrapper>
      <DotsContainer>
        {children.map((_, index) => (
          <Dot
            key={index}
            isActive={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  width: 328px;
  height: 198px;
  border-radius: 15px;
  background: #f7f7fa;
  overflow: hidden;
  position: relative;
  touch-action: pan-y;
`;

const SlideWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const Slide = styled.div`
  min-width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 171px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.div<{ isActive: boolean }>`
  width: 6px;
  height: 6px;
  margin: 0 2.5px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? '#333' : '#ccc')};
  cursor: pointer;
  transition: background-color 0.3s;
`;

export default Carousel;
