import React from "react";

const IconWidget = (props) => {
  return (
    <div className="mt-3 p-2 flex-fill bd-highlight ">
      <img
        src={props.img}
        className="d-inline "
        style={{ width: "58px", height: "58px" }}
        alt="Widget"
      />{" "}
      <h4 className="d-inline">{props.number} </h4> {props.title}
    </div>
  );
};

export default IconWidget;
