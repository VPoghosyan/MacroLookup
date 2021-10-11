import FoodItems from "./FoodItems";
import classes from "./FoodList.module.css";

const FoodList = (props) => {
  let priList = props.foodsData.filter((l) =>
    l.description.match(/(props.k)/gi)
  );
  //console.log(props.foodsData.length);
  return (
    <div className={classes.ingredientList}>
      <ul>
        {props.foodsData
          ? props.foodsData.map((food) => {
              return <FoodItems foodData={food} k={props.k} />;
            })
          : []}
      </ul>
    </div>
  );
};

export default FoodList;
