import React from "react";

import { FaTrash } from "react-icons/fa";

import "./SFI.css";

const SelectedFoodItems = ({
  itemName,
  itemId,
  onsflRemoveHandler,
  onSmoothMoveList,

  onFindHeight,
}) => {
  const defaultStyle = {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",

    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.26)`,
  };

  return (
    <div style={{ ...defaultStyle }} id={itemId}>
      <span style={{ left: "0%" }}>{itemName}</span>
      <span>
        <div
          onClick={() => {
            onSmoothMoveList(itemId);
            console.log("remove clicked");
            onsflRemoveHandler(itemId);
            onFindHeight(itemId);
          }}
          style={{ right: "0%" }}
        >
          <FaTrash style={{ marginLeft: "2px", cursor: "pointer" }} />
        </div>
      </span>
    </div>
  );
};

export default SelectedFoodItems;

// const SelectedFoodItems = ({
//   itemName,
//   itemId,
//   onsflRemoveHandler,
//   onSmoothMoveList,
//   idArrI,
//   heightI,
//   onstartAnime,
//   ontweeksetIdArr,
//   onFindHeight,
// }) => {
//   //console.log("test", idArrI, itemId, idArrI.includes(itemId)); //test

//   let transitionStylesSFL = {
//     entering: {
//       transform: `translateY(-${heightI}px)`,
//       transition: "all 1800ms",
//       position: "relative",
//     },
//   };

//   const defaultStyle = {
//     padding: "1rem",
//     display: "flex",
//     justifyContent: "space-between",

//     boxShadow: `0 2px 8px rgba(0, 0, 0, 0.26)`,
//   };

//   return (
//     <Transition
//       in={idArrI.includes(itemId)}
//       onEntered={() => {
//         ontweeksetIdArr();
//       }}
//       timeout={1800}
//     >
//       {(state) => (
//         <div
//           style={{ ...defaultStyle, ...transitionStylesSFL[state] }}
//           id={itemId}
//         >
//           <span style={{ left: "0%" }}>{itemName}</span>
//           <span>
//             <div
//               onClick={() => {
//                 onSmoothMoveList(itemId);
//                 console.log("remove clicked");
//                 onsflRemoveHandler(itemId);
//                 onFindHeight(itemId);
//               }}
//               style={{ right: "0%" }}
//             >
//               <FaTrash style={{ marginLeft: "2px", cursor: "pointer" }} />
//             </div>
//           </span>
//         </div>
//       )}
//     </Transition>
//   );
// };

// export default SelectedFoodItems;
