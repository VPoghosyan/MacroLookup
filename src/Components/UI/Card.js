import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <section>
      <div className={classes.card}>{props.children}</div>
    </section>
  );
};

export default Card;
