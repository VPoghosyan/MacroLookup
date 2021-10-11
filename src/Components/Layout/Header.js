import { Fragment, useContext, useEffect } from "react";
import mainImage from "../../../src/images/beans1.jpg";

import classes from "./Header.module.css";
import { FoodListContext } from "../../Context/foodList-context";

import "./Header.css";
import DelayLink from "react-delay-link";

const Header = ({ mainRef, history }) => {
  const headerCtx = useContext(FoodListContext);

  console.log(headerCtx.onImagesObj);
  ///////for later
  // useEffect(() => {
  //   console.log(headerCtx.onImagesObj);
  //   history.listen((location) => {
  //     // console.log(`You changed the page to: ${location.pathname}`);
  //     // console.log(headerCtx.onImagesObj);
  //     // console.log(history);
  //     // console.log(headerCtx.sflarr);

  //     mainRef.current.animate(
  //       [
  //         {
  //           background: `linear-gradient(rgb(${headerCtx.onImagesObj.startColor}) 50%, rgb(252, 252, 252) 100%)`,
  //         },
  //         { background: `rgb(${headerCtx.onImagesObj.startColor})` },
  //         { background: `rgb(${headerCtx.onImagesObj.endColor})` },
  //         {
  //           background: `linear-gradient(rgb(${headerCtx.onImagesObj.endColor}) 50%, rgb(252, 252, 252) 100%)`,
  //         },
  //         // {
  //         //   background: `transparent 100%`,
  //         // },
  //       ],
  //       {
  //         duration: 2000,
  //         easing: "ease-in-out",

  //         iterations: 1,
  //         direction: "alternate",
  //         fill: "forwards",
  //       }
  //     );
  //   });
  // });

  const toHome = () => {
    headerCtx.onScrollToSearch();

    headerCtx.onSetImagesObj((prevObj) => {
      headerCtx.onSetShowResults(false);

      return {
        ...prevObj,
        startColor: prevObj.endColor,
        endColor: "17, 121, 31",
      };
    });
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <DelayLink delay={1500} to="/" clickAction={toHome} replace={false}>
          <h1
            style={{
              cursor: "pointer",
            }}
          >
            <span style={{ color: "rgb(210, 247, 210)" }}>Macro</span>
            <span style={{ color: "white" }}>Lookup</span>
          </h1>
        </DelayLink>
      </header>

      <div className={`${classes["main-image"]} `}>
        <img
          className={`${classes["main-imageImg"]} ${
            headerCtx.onshowResults ? "" : classes["main-image-invisible"]
          }`}
          src={headerCtx.onImagesObj.image}
          alt="Apricots"
        />
        <img
          className={`${classes["main-imageImg"]} ${
            !headerCtx.onshowResults ? "" : classes["main-image-invisible"]
          }`}
          src={mainImage}
          alt="Apricots"
        />

        <div className={classes.cover}></div>
      </div>
    </Fragment>
  );
};

export default Header;
