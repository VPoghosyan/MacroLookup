import classes from "./Button.module.css";

const Button = ({ bName }) => {
  return <button className={classes.button}>{bName}</button>;
};

export default Button;
