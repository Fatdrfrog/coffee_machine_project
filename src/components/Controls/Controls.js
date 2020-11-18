import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import cup from "../../img/cup.png";
import Button from "@material-ui/core/Button";

const sizeList = [
  { size: "small", price: "0", color: "#ff8a65" },
  { size: "medium", price: "50", color: "#ff7043" },
  { size: "large", price: "150", color: "#f4511e" },
];

function Controls({
  classes,
  flavorList,
  handleFlavorChange,
  handleSizeChange,
  flavor,
  size,
  coffee,
  totalPrice,
}) {
  const total = `${flavor.flavor}-${size.flavor}-${coffee.flavor}: ${totalPrice} tg.`;

  return (
    <Paper className={classes.paper} elevation={3}>
      <div className={classes.header}>
        <Autocomplete
          id="combo-box-demo"
          options={flavorList}
          onChange={handleFlavorChange}
          disableClearable
          getOptionLabel={(option) => option.flavor}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="ADD FLAVOR" variant="outlined" />
          )}
        />
      </div>
      <div className={classes.header}>
        <Autocomplete
          id="combo-box-demo"
          options={sizeList}
          disableClearable
          onChange={handleSizeChange}
          getOptionLabel={(option) => option.size}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="PICK SIZE" variant="outlined" />
          )}
        />
      </div>
      {totalPrice > 0 && <label className={classes.totalText}>{total}</label>}
      {flavor && size && coffee && (
        <Fragment>
          <img className={classes.img} src={cup} alt="Coffee Cup" />
          <Button variant="contained" color="secondary">
            Purchase!
          </Button>
        </Fragment>
      )}
    </Paper>
  );
}

export default Controls;
