import React, { useState, useEffect, useRef } from "react";

import TaskPreview from "./TaskPreview";

import "./TaskBlock.css";

function TaskBlock(props) {
  const [isPreview, setIsPreview] = useState(false);
  const { start, end, type } = props;

  const previewRef = useRef();
  const currRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", e => {
      // Click outside of preview box
      if (previewRef.current && !previewRef.current.contains(e.target)) {
        setIsPreview(false);
      }
    });
  }, []);

  const style = {
    top: start / 15 - 0.1 + "em",
    height: (end - start) / 15 + 0.1 + "em",
  };

  return (
    <div
      className={"calendar__task calendar_task_" + type.toLowerCase()}
      style={style}
      onClick={() => setIsPreview(true)}
      ref={currRef}
    >
      <strong>{type}</strong>
      {isPreview ? (
        <TaskPreview
          time={props.time}
          previewRef={previewRef}
          title={type}
          start={start}
          end={end}
          pos={currRef.current.getBoundingClientRect()}
        />
      ) : null}
    </div>
  );
}

export default TaskBlock;
