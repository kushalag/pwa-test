import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import {
  SpeechEngine,
  SpeechItem,
  startExercise,
  downloadExercise,
} from "virtualphysio";

export const RealTime = () => {
  const canvasRef = useRef();
  const [stage, setStage] = useState(-1);
  const [stageVideos, setStageVideos] = useState([]);
  const [exercise, setExercise] = useState(null);
  const [camera, setCamera] = useState(null);

  const closeCamera = () => {
    if (camera) {
      camera.stop();
      setCamera(null);
    }
  };

  const startMainActivity = async () => {
    const canvasElement = canvasRef.current;
    // const exercise = Exercise.fromJson(sampleData);
    // console.log(exercise, exercise.uid);
    const exercise = await downloadExercise(null, 1, null, null, null);
    setExercise(exercise);

    const _stageVideos = exercise.stages.map((stage) => stage.stageVideo);
    setStageVideos(_stageVideos);

    const camera = await startExercise(
      exercise,
      canvasElement,
      true,
      (text, priority) =>
        SpeechEngine.addToSpeechQueue(new SpeechItem(text, priority)),
      (stageNumber) => setStage(stageNumber),
      null,
      () => {
        closeCamera();
        // window.location.replace('/completed');
      },
      null
    );

    if (camera instanceof Error) {
      console.error(camera);
    }

    setCamera(camera);
  };

  useEffect(() => {
    startMainActivity();

    // const handleSubmit = async () => {
    // 	const response = await fetch('http://localhost:8000/api/exerciseDetails/1/', {
    // 		method: 'GET',
    // 	});
    // 	const json = await response.json();
    // 	console.log('herrrrrrrrrrrrree');
    // 	console.log(json.stages);
    // 	await json.stages.map((stage) => {
    // 		console.log(stage);
    // 		let dotdotdot = [...stageVideos];
    // 		dotdotdot.push(stage.stageVideo);
    // 		console.log(dotdotdot);
    // 		setStageVideos(() => {
    // 			return dotdotdot;
    // 		});
    // 		console.log(stageVideos);
    // 	});
    // };
    // handleSubmit();
  }, []);

  return (
    <div>
      <div className="row mt-2">
        <div
          className="col-6 "
          style={{ margin: "0px", padding: "0px", height: "100%" }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        {/* {stage >= 0 && ( */}
        <div className="col-6 pl-2" style={{ margin: "0px" }}>
          <ReactPlayer
            loop={true}
            playsinline={true}
            muted={true}
            playing={true}
            url={`https://drl-healify-django.squareboat.info${stageVideos[0]}`}
            height={"100%"}
            width={"100%"}
            playbackRate={0.75}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
