import React, { useState, useEffect } from "react";

import TaskPreview from "./TaskPreview";

import "./TaskBlock.css";

function TaskBlock(props) {
  const [isPreview, setIsPreview] = useState(false);
  const { start, end, type } = props;

  const style = {
    top: start / 15 + "em",
    height: (end - start) / 15 + "em",
  };

  useEffect(() => {
    document.addEventListener("mousedown", () => setIsPreview(false));
    // console.log("click");
  }, []);

  return (
    <div
      className={"calendar__task calendar_task_" + type.toLowerCase()}
      style={style}
      onClick={() => setIsPreview(true)}
    >
      <strong>{type}</strong>
      {isPreview ? <TaskPreview title={type} start={start} end={end} /> : null}
    </div>
  );
}

export default TaskBlock;
