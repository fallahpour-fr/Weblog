import React, { Fragment } from "react";
import classes from "./ErrorModal..module.css";

const ErrorModal = (props) => {
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <button onClick={props.onConfirm} >Okey</button>
        </footer>
      </div>
    </Fragment>
  );
};

export default ErrorModal;
