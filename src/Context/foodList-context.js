import React, { useState } from "react";

export const FoodListContext = React.createContext();

const FoodListContextProvider = (props) => {
  const [sfl, setSfl] = useState([]);
  const [removeClicked, setRemovedClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);
  const [urlSpecialDelivery, seturlSpecialDelivery] = useState({
    url: false,
    color: "17, 121, 31",
  });
  const [compareFoods, setCompareFoods] = useState(false);
  const [sflImageShow, setSflImageShow] = useState(false);
  const [imagesObj, setImagesObj] = useState({
    startColor: "17, 121, 31",
    endColor: "17, 121, 31",
    image: false,
  });
  const convert = require("color-convert");

  const sflAddHandler = (
    sflName,
    sflId,
    sflInput,
    sflFoodCategory,
    sflMacros,
    sflColor,
    sflUrl
  ) => {
    setSfl((prevSfl) =>
      prevSfl.filter((f) => f.id === sflId).length
        ? prevSfl
        : [
            ...prevSfl,
            {
              name: sflName,
              id: sflId,
              input: sflInput,
              foodCategory: sflFoodCategory,
              macros: sflMacros,
              color: sflColor,
              url: sflUrl,
            },
          ]
    );
    setRemovedClicked(false);
    console.log("sfl", sfl); //test
  };
  const scrollToSearch = () => {
    document.getElementById("header").scrollIntoView();
  };
  console.log("ContextAdd", sfl); //test
  console.log("inputChanged", inputChanged); //test
  console.log("urlSpecialDelivery", urlSpecialDelivery); //test

  const sflRemoveHandler = (sflId) => {
    console.log("ContextRm", sfl);
    console.log("ContextId", sflId);
    setSfl(sfl.filter((f) => f.id !== sflId));
    setRemovedClicked(true);
    console.log("removeClicked", removeClicked);
  };

  console.log(imagesObj); //test

  return (
    <FoodListContext.Provider
      value={{
        sflAdd: sflAddHandler,
        sflRemove: sflRemoveHandler,
        sflarr: sfl,
        onsetRemovedClicked: setRemovedClicked,
        vRemoveClicked: removeClicked,
        onSetShowResults: setShowResults,
        onshowResults: showResults,
        onScrollToSearch: scrollToSearch,
        onSetInputChanged: setInputChanged,
        onInputChanged: inputChanged,
        onseturlSpecialDelivery: seturlSpecialDelivery,
        onUrlSpecialDelivery: urlSpecialDelivery,
        onSflImageShow: sflImageShow,
        onSetSflImageShow: setSflImageShow,
        onSetImagesObj: setImagesObj,
        onImagesObj: imagesObj,
        onCompareFoods: compareFoods,
        onSetCompareFoods: setCompareFoods,
      }}
    >
      {props.children}
    </FoodListContext.Provider>
  );
};

export default FoodListContextProvider;
