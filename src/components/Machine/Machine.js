import React from "react";
import Paper from "@material-ui/core/Paper";
import "./machine.sass";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import useWindowsWidth from "../customHooks/useWindowsWidth";

import Choices from "./Choices";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    maxWidth: 500,
    width: "100%",
    justifyContent: "center",
  },
  image: {
    position: "relative",
    height: 100,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      height: 60,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: 10,
    minWidth: 80,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const CoffeeButton = ({ coffeeList, handleCoffeeType }) => {
  const classesMachine = useStyles();
  return (
    <div className={classesMachine.root}>
      {coffeeList.map((coffee) => (
        <ButtonBase
          focusRipple
          key={coffee.sku}
          className={classesMachine.image}
          onClick={handleCoffeeType}
          focusVisibleClassName={classesMachine.focusVisible}
          style={{
            width: "8rem",
          }}
        >
          <span
            className={classesMachine.imageSrc}
            style={{
              backgroundImage: `url(${coffee.url})`,
            }}
          />
          <span className={classesMachine.imageBackdrop} />
          <span className={classesMachine.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classesMachine.imageTitle}
            >
              {coffee.type}
              <span className={classesMachine.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
};

function Machine({
  classes,
  coffeeList,
  flavor,
  size,
  handleCoffeeType,
  coffee,
}) {
  const width = useWindowsWidth();
  return (
    <Paper className={classes.paper} elevation={3}>
      <div className={classes.header}>Coffee Machine</div>
      <div>
        <CoffeeButton
          coffeeList={coffeeList}
          classes={classes}
          handleCoffeeType={handleCoffeeType}
        />
      </div>

      {width >= 600 && flavor && <Choices classes={classes} type={flavor} />}
      {width >= 600 && size && <Choices classes={classes} type={size} />}
      {width >= 600 && coffee && <Choices classes={classes} type={coffee} />}
    </Paper>
  );
}

export default Machine;
