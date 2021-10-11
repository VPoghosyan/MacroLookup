import React, { useRef, useState, useEffect, useContext } from "react";
import Card from "../UI/Card";
import classes from "./FoodSearch.module.css";
import FoodList from "./FoodList";
import SearchStatus from "./SearchStatus";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./SearchStatus.css";
import { FoodListContext } from "../../Context/foodList-context";
import PacmanLoader from "react-spinners/PacmanLoader";

const FoodSearch = (props) => {
  const foodSearchCtx = useContext(FoodListContext);
  const [data, setData] = useState([]);
  const [enteredInput, setEnteredInput] = useState("");
  const [status, setStatus] = useState("");
  const inputRef = useRef();
  const brandNameRef = useRef();
  const [brandCheck, setBrandCheck] = useState(false);
  const [brandNameInput, setBrandNameInput] = useState();
  let statusObj = {};

  useEffect(() => {
    console.log("effect runs"); //
    const abortRequest = new AbortController();
    const getHim = { signal: abortRequest.signal };
    if (inputRef.current.value.length === 0) {
      setStatus("");
    }
    const timer = setTimeout(() => {
      if (
        enteredInput.trim().length !== 0 &&
        enteredInput === inputRef.current.value
      ) {
        setStatus("sending request");

        fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=3AhGQxx2Lzk91vAHZNfLo80yi6P6MO3KiFEi0aUr&query=${
            inputRef.current.value
          }*&dataType=SR%20Legacy${
            brandCheck ? `,Branded&brandOwner=` + brandNameInput + "*" : ""
          }&pageSize=1000`,
          getHim
        )
          .then((res) => res.json())
          .then((resData) => {
            setData(resData.foods);

            foodSearchCtx.onSetInputChanged(true);
            resData.foods.length
              ? setStatus("data received")
              : setStatus("no matches");
            //throw new Error("surprize mothafucka"); /////////test
          })
          .catch((err) => {
            if (err.name === "AbortError") {
            } else {
              alert(
                "Connection error " +
                  err.message +
                  ", check your connection and try again"
              );
            }
          });
      } else {
        setData([]);
        foodSearchCtx.onSetInputChanged(false);
        return;
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      abortRequest.abort();
    };
  }, [enteredInput, inputRef, brandCheck, brandNameInput]);
  //A GOOD CANDIDATE FOR useReducer()
  const statusHandler = () => {
    if (!status) {
      statusObj = { id: "SF", ele: <div>Search Food</div> };
    } else if (status === "sending request") {
      statusObj = {
        id: "L",
        ele: <PacmanLoader color={"black"} size={10} speedMultiplier={3} />,
      };
    } else if (status === "data received") {
      statusObj = data.length
        ? {
            id: "FL",
            ele: (
              <FoodList
                foodsData={data}
                k={
                  inputRef.current.value +
                  `${brandCheck ? " " + brandNameRef.current.value : ""}`
                }
              />
            ),
          }
        : { id: "SF", ele: <div>Search Food</div> };
    } else if (status === "no matches") {
      statusObj = { id: "NM", ele: <div>No match found</div> };
    } else {
      statusObj = { id: "NW", ele: <div>now what?</div> };
    }
    return statusObj;
  };

  statusHandler();
  let narr = [];

  return (
    <Card>
      <div>
        <div
          style={{
            marginBottom: "5px",
            position: "relative",
          }}
        >
          <label>
            Branded foods{" "}
            <TransitionGroup className={classes.labelCheckBox}>
              <CSSTransition key={brandCheck} timeout={1000} classNames="InEx">
                <span className={classes.labelInEx}>
                  {brandCheck ? "included" : "excluded"}
                </span>
              </CSSTransition>
            </TransitionGroup>
            <span>
              <span style={{ opacity: "0" }}> excluded</span>:
              <input
                onClick={() =>
                  setBrandCheck((prevCheck) => {
                    setBrandNameInput("");
                    return !prevCheck;
                  })
                }
                type="checkbox"
                style={{
                  top: "1px",
                  position: "relative",
                }}
              />
            </span>
          </label>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label> Brand's name: </label>
          <input
            style={{ fontFamily: "inherit" }}
            disabled={!brandCheck}
            type="text"
            ref={brandNameRef}
            value={brandNameInput}
            onChange={(e) => setBrandNameInput(e.target.value)}
          />
        </div>
        <div style={{ position: "relative" }}>
          <div>
            <label>Search: </label>

            <input
              ref={inputRef}
              type="text"
              value={enteredInput}
              onChange={(e) => setEnteredInput(e.target.value)}
              placeholder="ex. Apricot"
            />
          </div>
          <div>
            <TransitionGroup className={classes.resultList}>
              <CSSTransition key={statusObj.id} timeout={500} classNames="fade">
                <SearchStatus ss={statusObj} />
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FoodSearch;
