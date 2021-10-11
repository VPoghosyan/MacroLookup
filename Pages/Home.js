import React, { useContext, useEffect, useRef, useState } from "react";

import FoodSearch from "../Components/Foods/FoodSearch";

import SelectedFoodList from "../Components/Foods/SelectedFoodList";
import Card from "../Components/UI/Card";
import { CSSTransition, Transition } from "react-transition-group";
import { FoodListContext } from "../Context/foodList-context";
import "./Home.css";

import DelayLink from "react-delay-link";

const Home = ({ onShowIntro }) => {
  const homeCtx = useContext(FoodListContext);
  const selectedFoodCardRef = useRef();
  const [cardHeight, setCardHeight] = useState(0);

  const CombineResults = () => {
    onShowIntro(false);
    homeCtx.onSetShowResults(true);
    homeCtx.onScrollToSearch();
  };
  const CompareResults = () => {
    onShowIntro(false);
    homeCtx.onSetShowResults(true);
    homeCtx.onSetCompareFoods(true);
    homeCtx.onScrollToSearch();
  };

  useEffect(() => {
    console.log("changing");

    if (homeCtx.sflarr.length > 2) {
      setCardHeight(selectedFoodCardRef.current.getBoundingClientRect().height);
    }

    if (!homeCtx.sflarr.length && homeCtx.vRemoveClicked) {
      setTimeout(homeCtx.onScrollToSearch, 500);
    }
    //console.log(selectedFoodCardRef.current.getBoundingClientRect().height);
  }, [homeCtx.sflarr.length]);

  let transitionStylesHome = {
    entering: {
      maxHeight: `${cardHeight - 50}px`,
    },
  };
  let defaultStylesHome = {
    maxHeight: "1000rem",
    transition: "all 1800ms",
    flex: "95%",
  };

  console.log("cardHeight", cardHeight);

  return (
    <div style={{ width: "100%", position: "absolute" }}>
      <div>
        <FoodSearch />
      </div>

      <CSSTransition
        in={homeCtx.sflarr.length > 0}
        timeout={800}
        classNames="showSelectedFoodList"
        unmountOnExit
      >
        <Transition
          in={homeCtx.vRemoveClicked && cardHeight > 380}
          onEntered={() => {
            console.log("I entered");
            homeCtx.onsetRemovedClicked(false);
          }}
          timeout={1800}
        >
          {(state) => (
            <div>
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "25rem",
                  }}
                >
                  <div
                    ref={selectedFoodCardRef}
                    style={{
                      ...defaultStylesHome,

                      ...transitionStylesHome[state],
                    }}
                  >
                    <SelectedFoodList />
                  </div>
                  <div className="buttonsContainer">
                    <span
                      style={{
                        transform: `scale(${
                          homeCtx.sflarr.length > 1 ? 1 : 0
                        })`,
                        transition: "all 600ms",
                        marginTop: "7px",
                      }}
                    >
                      <DelayLink
                        delay={2300}
                        to="/Compare"
                        clickAction={CompareResults}
                        replace={false}
                      >
                        <button className="button">Compare Macros</button>
                      </DelayLink>
                    </span>

                    <span
                      style={{
                        marginTop: "7px",
                      }}
                    >
                      <DelayLink
                        delay={2300}
                        to="/LookUpOrCombine"
                        clickAction={CombineResults}
                        replace={false}
                      >
                        <button className="button">
                          {homeCtx.sflarr.length > 1
                            ? "Combine Macros"
                            : "Show Macros"}
                        </button>
                      </DelayLink>
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Transition>
      </CSSTransition>
      <div style={{ minHeight: "10rem" }}></div>
    </div>
  );
};

export default Home;
