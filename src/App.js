import React, { useState, useEffect } from "react";
import Machine from "./components/Machine";
import Controls from "./components/Controls";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

function App() {
  const [coffeeList, setCoffeeList] = useState([]);
  const [coffee, setCoffee] = useState("");
  const [flavorList, setflavorList] = useState([]);
  const [flavor, setFlavor] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const useStyles = makeStyles((theme) => ({
    paper: {
      height: "90vh",
      width: "40%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      minWidth: "400px",
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
    header: {
      ...theme.typography.button,
      marginTop: "1rem",
      backgroundColor: theme.palette.background.paper,
    },
    colors: {
      width: "80%",
      marginTop: "3rem",
      height: "3rem",
      fontSize: "xx-large",
      borderRadius: "20%",
      fontWeight: "bolder",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${flavor && flavor.color}`,
    },
    img: {
      width: `${
        size && size.size === "small"
          ? "8rem"
          : size && size.size === "medium"
          ? "11rem"
          : "13rem"
      }`,
      height: `${
        size && size.size === "small"
          ? "12rem"
          : size && size.size === "medium"
          ? "14rem"
          : "18rem"
      }`,
      marginTop: "5rem",
    },
    totalText: {
      width: "20rem",
      display: "flex",
      marginTop: "3rem",
      justifyContent: "center",
      fontSize: "larger",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    getCoffees();
  }, []);

  useEffect(() => {
    if (flavor && size && coffee) {
      let coffeePrice;
      coffeeList.forEach((e) => {
        if (e.type === coffee.flavor) {
          coffeePrice = e.price;
        }
      });
      setTotalPrice(
        parseFloat(flavor.price) +
          parseFloat(size.price) +
          parseFloat(coffeePrice)
      );
    }
  }, [flavor, size, coffee, coffeeList]);

  const getCoffees = () => {
    axios
      .get("https://coffeemachineapinodejs.herokuapp.com/coffees")
      .then((res) => res.data)
      .then((res) => {
        setLoading(false);
        setCoffeeList(res.coffees);
        setflavorList(res.flavors);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleCoffeeType = (e, v) => {
    setCoffee({ flavor: e.target.innerText, color: "#3e2723" });
  };

  const handleFlavorChange = (e, value) => {
    setFlavor(value);
  };

  const handleSizeChange = (e, value) => {
    if (value !== null) {
      setSize({ ...value, flavor: value.size });
    } else setSize("");
  };

  return !isLoading ? (
    <Grid container justify="center" className={classes.root}>
      <Machine
        classes={classes}
        coffeeList={coffeeList}
        flavor={flavor}
        size={size}
        coffee={coffee}
        handleCoffeeType={handleCoffeeType}
      />
      <Controls
        classes={classes}
        flavorList={flavorList}
        handleFlavorChange={handleFlavorChange}
        handleSizeChange={handleSizeChange}
        flavor={flavor}
        size={size}
        coffee={coffee}
        totalPrice={totalPrice}
      />
    </Grid>
  ) : (
    <div>Skeleton Loading...</div>
  );
}

export default App;
