import React, { useState, useContext, useEffect } from "react";
import SelectedFoodItems from "./SelectedFoodItems";
import { FoodListContext } from "../../Context/foodList-context";
import { TransitionGroup } from "react-transition-group";
import "./SelectedFoodList.css";
import Fade from "react-reveal/Fade";

const SelectedFoodList = () => {
  const [idArr, setIdArr] = useState([]);
  const [height, setHeight] = useState(0);

  const selectFoodListCtx = useContext(FoodListContext);
  const findHeight = (id) => {
    setHeight(document.getElementById(`${id}`).offsetHeight);
    const heightO = document.getElementById(`${id}`).offsetHeight;
    console.log("divElement", height, heightO);
  };
  const smoothMoveList = (id) => {
    const i = selectFoodListCtx.sflarr.findIndex((f) => f.id === id);
    const tempArr = [];
    selectFoodListCtx.sflarr.slice(i + 1).map((f) => tempArr.push(f.id));
    setIdArr(tempArr);
    console.log("index", idArr);
  };

  return (
    <div>
      <TransitionGroup>
        {selectFoodListCtx.sflarr.map((f) => (
          <Fade
            key={f.id}
            appear={true}
            collapse
            left
            opposite
            onReveal={() => console.log("onReveal", f.id)}
          >
            <SelectedFoodItems
              itemName={f.name}
              itemId={f.id}
              key={f.id}
              onsflRemoveHandler={selectFoodListCtx.sflRemove}
              onSmoothMoveList={smoothMoveList}
              onFindHeight={findHeight}
            />
          </Fade>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default SelectedFoodList;

// const SelectedFoodList = () => {
//   const [idArr, setIdArr] = useState([]);
//   const [height, setHeight] = useState(0);
//   const [slideUp, setSlideUp] = useState(true);
//   const [startAnime, setStartAnime] = useState(false);
//   const selectFoodListCtx = useContext(FoodListContext);
//   const findHeight = (id) => {
//     setHeight(document.getElementById(`${id}`).offsetHeight);
//     const heightO = document.getElementById(`${id}`).offsetHeight;
//     console.log("divElement", height, heightO);
//   };
//   const smoothMoveList = (id) => {
//     const i = selectFoodListCtx.sflarr.findIndex((f) => f.id === id);
//     const tempArr = [];
//     selectFoodListCtx.sflarr.slice(i + 1).map((f) => tempArr.push(f.id));
//     setIdArr(tempArr);
//     console.log("index", idArr);
//   };

//   const tweeksetIdArr = () => {
//     setIdArr([]);
//   };

//   return (
//     <div>
//       <TransitionGroup>
//         {selectFoodListCtx.sflarr.map((f) => (
//           <CSSTransition
//             onEnter={() => findHeight(f.id)}
//             onExit={() => setSlideUp(true)}
//             key={f.id}
//             timeout={1800}
//             classNames="showSelectedFoodItems"
//           >
//             <SelectedFoodItems
//               itemName={f.name}
//               itemId={f.id}
//               key={f.id}
//               onsflRemoveHandler={selectFoodListCtx.sflRemove}
//               onSmoothMoveList={smoothMoveList}
//               idArrI={idArr}
//               heightI={height}
//               onstartAnime={startAnime}
//               ontweeksetIdArr={tweeksetIdArr}
//               onFindHeight={findHeight}
//             />
//           </CSSTransition>
//         ))}
//       </TransitionGroup>
//     </div>
//   );
// };

// export default SelectedFoodList;
