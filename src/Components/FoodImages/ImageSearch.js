import React, { useState, useEffect, useContext, useRef } from "react";
import { FoodListContext } from "../../Context/foodList-context";
import mainImage from "../../images/beans1.jpg";

const ImageSearch = ({
  foodCategory,
  input,
  itemDescription,
  foodId,
  foodMacros,
  onSetItemClicked,
  onItemClicked,
}) => {
  console.log(typeof input); //test
  const imageSearchCtx = useContext(FoodListContext);
  const keyWords = [
    "food",
    "fruit",
    "vegetable",
    "meat",
    "fish",
    "nut",
    "water",
    "dairy",
    "poultry",
    "fresh",
    "dried",
    "green",
  ];

  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(result);
    return result
      ? result
          .slice(1)
          .map((i, j) => parseInt(result[j + 1], 16))
          .join()
      : "17, 121, 31";
  };

  const searchCriteriaPrep = () => {
    const foodCategoryPrep = foodCategory.replace(
      /(the )|( with )|( and )|[^\w]/gi,
      " "
    );
    const regexInput = input.trim().includes(" ")
      ? input
      : new RegExp(`${input}\\w*`, "gi");
    const completeInput = itemDescription
      .replace(/([,:])|(\Wraw)/gi, "")
      .match(regexInput); //this is where for ex. 'avo' turns to avocado
    const finalCompleteInput = completeInput ? completeInput[0] : input;
    console.log(finalCompleteInput); //test
    console.log(foodCategoryPrep); //test
    let toBeSearched = [
      ...finalCompleteInput.split(" "),
      ...foodCategoryPrep.split(" "),
      ...keyWords,
    ].filter((i) => i.length > 2);
    return [finalCompleteInput, toBeSearched];
  };

  const imageFilter = (data, searchWords) => {
    let matchArr = [];
    const checkIng = data.results.map((i) =>
      matchArr.push({
        id: i.id,
        color: i.color,
        url: i.urls.full,
        score: searchWords.filter((j) => {
          const regexFly = new RegExp(`${j}`, "gi");

          return i["alt_description"]?.match(regexFly);
        }),
      })
    );

    const sortedMatchArr = matchArr
      .filter((i) => i.score)
      .sort((a, b) => a.score.length - b.score.length);
    return sortedMatchArr;
  };

  useEffect(() => {
    if (imageSearchCtx.onInputChanged && onItemClicked) {
      const [keyWord, keyWordArr] = searchCriteriaPrep();
      fetch(
        `https://api.unsplash.com/search/photos?query=${
          keyWord + " food"
        }*&page=1&per_page=100&orientation=landscape&client_id=ESp_LZUI1G9BprOhFmiTw9nCTOS2IeUKA3iUEU1qioY`
      )
        .then((ressponse) => ressponse.json())
        .then((resData) => {
          let finalImage;

          console.log(resData);
          resData.results.length
            ? (finalImage = imageFilter(resData, keyWordArr).pop()?.score.length
                ? imageFilter(resData, keyWordArr).pop()
                : (finalImage.url = mainImage))
            : (finalImage.url = mainImage);
          console.log(finalImage); //test

          console.log(imageSearchCtx.onImagesObj); //test
          imageSearchCtx.onSetImagesObj({
            startColor: "17, 121, 31",
            endColor: hexToRgb(finalImage.color),
            image: finalImage.url,
          });
          imageSearchCtx.onseturlSpecialDelivery({
            url: finalImage.url,
            color: finalImage.url,
          });
          imageSearchCtx.sflAdd(
            itemDescription,
            foodId,
            input,
            foodCategory,
            foodMacros,
            finalImage.color,
            finalImage.url
          );
          imageSearchCtx.onSetInputChanged(false);
        })
        .catch((err) => {
          alert(
            "Connection error " +
              err.message +
              ", check your connection and try again"
          );
        });
    } else {
      console.log("input is the same");
      console.log("mostRecentImage", imageSearchCtx.onUrlSpecialDelivery);
      imageSearchCtx.sflAdd(
        itemDescription,
        foodId,
        input,
        foodCategory,
        foodMacros,
        imageSearchCtx.onUrlSpecialDelivery.color,
        imageSearchCtx.onUrlSpecialDelivery.url
      );
    }
    onSetItemClicked(false);
  });

  return (
    <>
      <span>...</span>
    </>
  );
};

export default ImageSearch;
