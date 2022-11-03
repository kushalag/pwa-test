import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { CardImg, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import screen1 from "../images/screen1Icon.png";
import sessionIcon from "../images/sessionIcon.png";
import screen2 from "../images/screen2.png";
import nounplaylist from "../images/noun-playlist-2712041.png";
import frame3 from "../images/frame3.png";
import useSound from "use-sound";
import boopSfx from "../Utils/boop.wav";
import IconWidget from "../UIComponents/IconWidget";

const ExerciseDescription = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);

  const [play] = useSound(boopSfx);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5>General Instructions</h5>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>Find a space with natural light to perform the exercises.</li>
            <li className="my-3">
              Wear comfortable, body fit sports clothing that do not restrict
              your movement.
            </li>
            <li>If you feel an uncomfortable pain please stop exercising.</li>
            <li className="my-3">Do not hold your breath for too long.</li>
            <li>If you experience heavy breathing refrain from exercising.</li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            size="lg"
            className="mt-2 mx-auto w-50"
            onClick={() => {
              props.onHide();
              setModalShow2(true);
            }}
            style={{
              background:
                "linear-gradient(147.86deg, #58BF56 -16.9%, #419445 64.22%)",
              borderRadius: "10px",
            }}
          >
            NEXT
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function MyVerticallyCenteredModal2(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Body className="text-center">
          <h5>Healify gives voice enabled real-time feedback</h5>
          <p>
            Please turn on the sound to follow the voice recommendations.
            <Button
              variant="outline-success"
              className="mt-3 d-block mx-auto"
              onClick={play}
            >
              <i className="bi bi-volume-up "></i> Check Sound!
            </Button>
          </p>
        </Modal.Body>
        <p>If you can hear the sound, click on OK</p>
        <Modal.Footer>
          <Button
            variant="success"
            size="lg"
            className="mt-4 mx-auto w-50"
            onClick={() => {
              props.onHide();
              setModalShow3(true);
            }}
            style={{
              background:
                "linear-gradient(147.86deg, #58BF56 -16.9%, #419445 64.22%)",
              borderRadius: "10px",
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function MyVerticallyCenteredModal3(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5>How to caliberate your phone?</h5>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>Place your device on the floor against the wall. </li>
            <li className="my-3">Tilt it until the silhouette turns green</li>
            <li>
              Move backward, away from the device, to keep your body fully
              visible in the frame.
            </li>
          </ol>
        </Modal.Body>
        <div className="text-center">
          <Link to="/realtime">
            <Button
              variant="success"
              size="lg"
              className="mt-3 mx-auto w-50"
              onClick={() => {
                props.onHide();
                // window.location.href = '/zenia';
              }}
              style={{
                background:
                  "linear-gradient(147.86deg, #58BF56 -16.9%, #419445 64.22%)",
                borderRadius: "10px",
              }}
            >
              PROCEED
            </Button>
          </Link>
        </div>

        <CardImg className="mt-5" src={frame3} />
      </Modal>
    );
  }
  return (
    <div>
      <h5 className="font-weight-bold m-4">
        <i className="bi bi-arrow-left"></i> My Exercise Regime
      </h5>

      <Row>
        <Col md={6}>
          <CardImg src={screen2} className="mt-1" />
          <div className="mt-3 mx-2">
            <div className="d-flex ">
              <div className="p-2">
                <h5 className="mt-2" style={{ color: "#58BF56" }}>
                  Pelvic tilt anterior
                </h5>
                <p
                  className="d-inline "
                  style={{
                    color: "rgba(14, 41, 64, 0.5)",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Exercise 1
                </p>
                <i
                  className="bi bi-dot text-success"
                  style={{ width: "5px", height: "5px" }}
                ></i>
                <p
                  className="d-inline "
                  style={{
                    color: "rgba(14, 41, 64, 0.5)",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Day 3
                </p>
              </div>
              <div className="ml-auto p-2 mt-2">
                <img
                  src={nounplaylist}
                  className="d-inline "
                  stye={{ width: "58px", height: "58px" }}
                  alt=""
                />
                <p className="d-inline " style={{ color: "#E56649" }}>
                  View exercises
                </p>
              </div>
            </div>
          </div>

          <div>
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
              onClick={() => {
                setModalShow(true);
              }}
            >
              DONE
            </Button>
          </div>
          <div className="d-flex bd-highlight mx-4 mt-2">
            <IconWidget img={screen1} number={"03"} title={"Repetitions"} />
            <IconWidget img={sessionIcon} number={"02"} title={"Sets"} />
          </div>

          <Alert
            className="mx-3 mt-4"
            variant="info"
            style={{
              backgroundColor: "rgb(236 246 255)",
              color: "#0E2940",
            }}
          >
            <p
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                color: "rgba(14, 41, 64, 0.75)",
                fontSize: "14px",
              }}
            >
              <i
                className="bi bi-info-circle mr-2"
                style={{ color: "#006FCB" }}
              ></i>{" "}
              Please remember to take rest for at least 10 seconds in between
              sets.
            </p>
          </Alert>
          <div className="container mt-2">
            <h5> Instructions</h5>
            <p
              className="mt-1"
              style={{
                color: "rgba(14, 41, 64, 0.8)",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              {" "}
              Begin by lying on your back with your knees bent, feet resting on
              the floor, and hands on your hips
              <br />
              <br />
              Slowly tilt your pelvis forward, then tilt it back to the starting
              position and repeat. Begin by lying on your back with your knees
              bent, feet resting on the floor, and hands on your hips
              <br />
              <br />
              Slowly tilt your pelvis forward, then tilt it back to the starting
              position and repeat. Begin by lying on your back with your knees
              bent, feet resting on the floor, and hands on your hips
            </p>
          </div>
        </Col>
      </Row>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
      <MyVerticallyCenteredModal3
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      />
    </div>
  );
};

export default ExerciseDescription;
