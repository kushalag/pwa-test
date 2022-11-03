import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import screen1 from "../images/screen1Icon.png";
import sessionIcon from "../images/sessionIcon.png";
import s1start from "../images/s1start.png";
import s1 from "../images/young-woman-ustrasana-pose-grey-studio-background-1.png";
import s2 from "../images/young-woman-ustrasana-pose-grey-studio-background-4.png";
import s3 from "../images/young-woman-ustrasana-pose-grey-studio-background.png";
import CardWidget from "../UIComponents/CardWidget";
import IconWidget from "../UIComponents/IconWidget";

const ExerciseRegime = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h5 className="font-weight-bold m-4">
        <i className="bi bi-arrow-left"></i> My Exercise Regime
      </h5>
      {show && (
        <Alert
          onClose={() => setShow(false)}
          dismissible
          variant="danger"
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            backgroundColor: "#E56649",
          }}
        >
          <p>
            Please avoid performing activities if your pain scale lies between 7
            and 10
          </p>
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <CardImg src={s1start} className="mt-1" />

          <div className=" mt-3">
            <div className="d-flex ">
              <div className="p-2">
                <h5 className="mt-2 ml-3" style={{ color: "#58BF56" }}>
                  Exercise Regime <br /> Plan 1
                </h5>
              </div>
              <div className="ml-auto p-2">
                <button
                  type="button"
                  className="btn btn-danger btn-sm d-inline"
                  disabled
                  style={{
                    background: "rgba(229, 102, 73, 0.08)",
                    color: "#E56649",
                    border: "none",
                  }}
                >
                  Morning
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm d-inline"
                  style={{ background: "#E56649" }}
                >
                  Evening
                </button>
              </div>
            </div>
          </div>

          <div className=" d-flex">
            <div
              className="ml-auto p-3 mx-5cd "
              style={{ color: "rgba(14, 41, 64, 0.5)" }}
            >
              20% Completed
            </div>
          </div>

          <div className="progress mx-3" style={{ height: "3px" }}>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <div className="d-flex bd-highlight mx-4">
            <IconWidget img={screen1} number={"05"} title={"Exercises"} />
            <IconWidget img={sessionIcon} number={"14"} title={"Sessions"} />
          </div>
          <div>
            <Link
              to="/exercise"
              className="text-white font-weight-bold"
              style={{ textDecoration: "None" }}
            >
              <Button
                variant="success"
                size="lg"
                style={{
                  position: "fixed",
                  bottom: "4px",
                  left: "10px",
                  right: "10px",
                  zIndex: "1",
                  background:
                    "linear-gradient(147.86deg, #58BF56 -16.9%, #419445 64.22%)",
                  borderRadius: "10px",
                }}
              >
                RESUME EXERCISE
              </Button>
            </Link>
          </div>
          <CardWidget
            body={"Pelvic tilt anterior"}
            width={"77px"}
            height={"78px"}
            left={"32px"}
            top={"944px"}
            img={s1}
          />
          <CardWidget
            body={"Diaphragmatic breathing"}
            width={"77px"}
            height={"78px"}
            left={"32px"}
            top={"944px"}
            img={s2}
          />
          <CardWidget
            body={"Supine Bridges with ball squeeze"}
            width={"77px"}
            height={"78px"}
            left={"32px"}
            top={"944px"}
            img={s3}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ExerciseRegime;
