import React, { useRef, useState, useEffect } from "react";
import Home from "./Pages/Home";
import { Redirect, Route } from "react-router-dom";
import LookUpOrCombine from "./Pages/LookUpOrCombine";
import Compare from "./Pages/Compare";
import Header from "./Components/Layout/Header";

import { useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { Switch } from "react-router";
import "./App.css";
import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Fade";
import Flip from "react-reveal/Fade";

import Bounce from "react-reveal/Fade";
import { useBeforeunload } from "react-beforeunload";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [bullets, setBullets] = useState("none");
  const history = useHistory();
  const location = useLocation();

  const appStyle = {
    background: `linear-gradient(rgb(17, 121, 31) 50%, rgb(252, 252, 252) 100%)`,
    scrollBehavior: "smooth",
    transition: "all 1500ms ease-in",
  };
  const mainDivRef = useRef();
  const midDiv = useRef();

  useBeforeunload((event) => {
    event.preventDefault();
    return "Click 'MacroLookip' to return to homepage";
  });

  useEffect(() => {
    setTimeout(() => {
      midDiv.current.scrollIntoView();
    }, 1000);
  }, []);

  console.log(bullets); //test

  return (
    <Fade duration={1000}>
      <div style={appStyle} id="mainDiv" ref={mainDivRef}>
        <div id="header">
          <Header mainRef={mainDivRef} history={history} />
        </div>
        <div ref={midDiv}></div>
        <div>
          <Rotate
            top
            left
            opposite
            duration={2000}
            delay={1000}
            appear={true}
            when={showIntro}
            unmountOnExit={true}
            wait={2000}
            collapse
          >
            <div
              id="intro"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="miniCardA">
                <Flip duration={800} delay={3200}>
                  <p>
                    Welcome to{" "}
                    <span style={{ color: "rgb(210, 247, 210)" }}>Macro</span>
                    <span style={{ color: "white" }}>Lookup</span>. Here you can
                  </p>
                </Flip>
                <Fade right cascade delay={4000} duration={1200}>
                  <ul>
                    <li>Lookup nutrition facts of individual foods</li>
                    <li>Compare macronutrient content of different foods</li>
                    <li>
                      Combine foods and find out macronutrient content of your
                      diet
                    </li>
                  </ul>
                </Fade>

                <h4>
                  <Bounce right cascade delay={5200} duration={1200}>
                    Tips on searching food:
                  </Bounce>
                </h4>

                <p style={{ textAlign: "justify" }}>
                  <Flip top cascade delay={5800} duration={1000}>
                    There are two modes of search:
                  </Flip>
                  <Flip top cascade delay={6500} duration={1200}>
                    <ul
                      style={{
                        listStyleType: bullets,
                        transition: "all 1200ms",
                      }}
                    >
                      <b>
                        <Flip
                          top
                          cascade
                          delay={6500}
                          duration={1200}
                          onReveal={() =>
                            setTimeout(() => {
                              setBullets("disc");
                            }, 6500)
                          }
                        >
                          <li>Branded</li>
                          <li>Unbranded</li>
                        </Flip>
                      </b>
                    </ul>
                  </Flip>

                  <Flip top cascade delay={7200} duration={1200}>
                    Unbranded food search is the default search mode. For
                    example, if you want to search for an apricot, start typing
                    apricot in the 'Search:' window (no need to press enter) and
                    choose from the suggested list of apricot foods provided by
                    the USDA food database. If you want to look up an apricot
                    product of a specific manufacturer, you need to first check
                    the box labeled 'Branded foods excluded:' which will then
                    turn to 'Branded foods included:' and after you enter the
                    name of the brand you had in mind in newly enabled 'Brand's
                    name:' field, you will be presented with a list of apricot
                    foods by that brand. You can always click on 'MacroLookup'
                    logo to come back to homepage and add or remove foods from
                    your list.
                  </Flip>
                </p>
              </div>
            </div>
          </Rotate>

          <TransitionGroup>
            <CSSTransition key={location.key} timeout={5000} classNames="slide">
              <Switch location={location}>
                <Route path="/" exact>
                  <Home id="home" onShowIntro={setShowIntro} />
                </Route>
                <Route path="/LookUpOrCombine">
                  <LookUpOrCombine />
                </Route>
                <Route path="/Compare">
                  <Compare />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>

          <div
            id="buffer"
            style={{
              minHeight: "25rem",
              backgroundColor: "transparent",
            }}
          ></div>
        </div>
      </div>
    </Fade>
  );
}

export default App;
