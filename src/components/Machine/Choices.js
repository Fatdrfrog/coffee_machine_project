import React from "react";

export default function Choices({ classes, type }) {
  return (
    <div
      className={classes.colors}
      style={{ backgroundColor: `${type.color}` }}
    >
      {type.flavor}
    </div>
  );
}
