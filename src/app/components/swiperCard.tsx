import React, { useState } from "react";

const SwipeCard = () => {
  const [animating, setAnimating] = useState(false);
  const [cardsCounter, setCardsCounter] = useState(0);
  const [numOfCards, setNumOfCards] = useState(6);
  const [decisionVal, setDecisionVal] = useState(80);
  const [pullDeltaX, setPullDeltaX] = useState(0);
  const [deg, setDeg] = useState(0);

  const pullChange = () => {
    setAnimating(true);
    setDeg(pullDeltaX / 10);
    const opacity = pullDeltaX / 100;
    const rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
    const likeOpacity = opacity <= 0 ? 0 : opacity;

    // Update the styles of the card, reject, and like elements
  };

  const release = () => {
    if (pullDeltaX >= decisionVal) {
      // Add 'to-right' class
    } else if (pullDeltaX <= -decisionVal) {
      // Add 'to-left' class
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      // Add 'inactive' class
      setTimeout(() => {
        // Add 'below' class, remove 'inactive', 'to-left', and 'to-right' classes
        setCardsCounter(cardsCounter + 1);
        if (cardsCounter === numOfCards - 1) {
          setCardsCounter(0);
          // Remove 'below' class from all cards
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      // Add 'reset' class
    }

    setTimeout(() => {
      // Remove inline styles and 'reset' class
      setPullDeltaX(0);
      setAnimating(false);
    }, 300);
  };

  const handleMouseDown = (e: any) => {
    if (animating) return;
    const startX = e.pageX || e.touches[0].pageX;

    const handleMouseMove = (e: any) => {
      const x = e.pageX || e.touches[0].pageX;
      setPullDeltaX(x - startX);
      if (pullDeltaX) {
        pullChange();
      }
    };

    const handleMouseUp = () => {
      if (pullDeltaX) {
        release();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
  };

  return (
    <div className="demo">
      <header className="demo__header"></header>
      <div className="demo__content">
        <div className="demo__card-cont">
          <div
            className="demo__card"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="demo__card__top brown">
              <div className="demo__card__img"></div>
              <p className="demo__card__name">Hungry cat 6</p>
            </div>
            <div className="demo__card__btm">
              <p className="demo__card__we">Whatever</p>
            </div>
            <div className="demo__card__choice m--reject"></div>
            <div className="demo__card__choice m--like"></div>
            <div className="demo__card__drag"></div>
          </div>
          <div
            className="demo__card"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="demo__card__top lime">
              <div className="demo__card__img"></div>
              <p className="demo__card__name">Hungry cat 5</p>
            </div>
            <div className="demo__card__btm">
              <p className="demo__card__we">Whatever</p>
            </div>
            <div className="demo__card__choice m--reject"></div>
            <div className="demo__card__choice m--like"></div>
            <div className="demo__card__drag"></div>
          </div>
          <div
            className="demo__card"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="demo__card__top cyan">
              <div className="demo__card__img"></div>
              <p className="demo__card__name">Hungry cat 4</p>
            </div>
            <div className="demo__card__btm">
              <p className="demo__card__we">Whatever</p>
            </div>
            <div className="demo__card__choice m--reject"></div>
            <div className="demo__card__choice m--like"></div>
            <div className="demo__card__drag"></div>
          </div>
          <div
            className="demo__card"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="demo__card__top indigo">
              <div className="demo__card__img"></div>
              <p className="demo__card__name">Hungry cat 3</p>
            </div>
            <div className="demo__card__btm">
              <p className="demo__card__we">Whatever</p>
            </div>
            <div className="demo__card__choice m--reject"></div>
            <div className="demo__card__choice m--like"></div>
            <div className="demo__card__drag"></div>
          </div>
          <div
            className="demo__card"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="demo__card__top blue">
              <div className="demo__card__img"></div>
              <p className="demo__card__name">Hungry cat 2</p>
            </div>
            <div className="demo__card__btm">
              <p className="demo__card__we">Whatever</p>
            </div>
            <div className="demo__card__choice m--reject"></div>
            <div className="demo__card__choice m--like"></div>
            <div className="demo__card__drag"></div>
          </div>
          <div
            className="demo__card"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="demo__card__top purple">
              <div className="demo__card__img"></div>
              <p className="demo__card__name">Hungry cat</p>
            </div>
            <div className="demo__card__btm">
              <p className="demo__card__we">Whatever</p>
            </div>
            <div className="demo__card__choice m--reject"></div>
            <div className="demo__card__choice m--like"></div>
            <div className="demo__card__drag"></div>
          </div>
        </div>
        <p className="demo__tip">Swipe left or right</p>
      </div>
    </div>
  );
};

export default SwipeCard;
