import React, { useState, useEffect, useRef } from "react";

import NewTaskForm from "./NewTaskForm";

function minutesToHHMM(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m;
  h = h < 10 ? "0" + h : h;

  return `${h}:${m}`;
}

function CalendarTimeRow(props) {
  const [isPreview, setIsPreview] = useState(false);
  const [time, setTime] = useState({ start: "0", end: "0" });
  const [pos, setPos] = useState(0);

  const previewRef = useRef();
  const currRef = useRef();

  const handleTimeChange = event => {
    const { name, value } = event.target;
    setTime({ ...time, [name]: value });
  };

  const onSubmit = () => {
    props.handleAddingTask(props.index, time);
  };

  useEffect(() => {
    setTime({
      start: minutesToHHMM(props.start * 60),
      end: minutesToHHMM(props.end * 60),
    });
  }, [props.start, props.end]);

  useEffect(() => {
    document.addEventListener("mousedown", e => {
      // Click outside of preview box
      if (previewRef.current && !previewRef.current.contains(e.target)) {
        setIsPreview(false);
      }
    });
  }, []);

  return (
    <div
      className={props.className}
      onClick={e => {
        setPos({
          x: e.pageX,
          y: e.pageY,
        });
        setIsPreview(true);
      }}
      ref={currRef}
    >
      {isPreview ? (
        <NewTaskForm
          previewRef={previewRef}
          start={time.start}
          end={time.end}
          pos={pos}
          handleTimeChange={handleTimeChange}
          onSubmit={onSubmit}
        />
      ) : null}
    </div>
  );
}

export default CalendarTimeRow;
