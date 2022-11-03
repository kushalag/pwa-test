import React from "react";
import { Card, CardImg } from "react-bootstrap";

const CardWidget = (props) => {
  return (
    <Card className="m-3">
      <div className="card-img-top d-flex align-items-center bg-light">
        <div>
          <CardImg
            className="img-fluid m-3"
            src={props.img}
            style={{
              width: props.width,
              height: props.height,
              left: props.left,
              top: props.top,
            }}
          />
        </div>

        <h6 className="col">{props.body}</h6>
      </div>
    </Card>
  );
};

export default CardWidget;
