import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const day = {
  0: "Sunday",
  1: "Monday  ",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thrusday",
  5: "Friday",
  6: "Saturday",
};
function NewTaskForm(props) {
  const { start, end } = props;

  const style = {
    position: "absolute",
    width: "25em",
    padding: "1em",
    borderRadius: "0.4em",
    boxShadow: "-3px 4px 28px rgba(0,0,0,0.5), 10px 4px 10px rgba(0,0,0,0.5)",
    transition: "all 0.2s ease-in-out",
    zIndex: "10",
  };

  if (props.row >= 3) {
    style.left = "-26em";
  } else {
    style.right = "-26em";
  }

  if (props.col >= 20) {
    style.top = "-20em";
  }

  return (
    <Card ref={props.previewRef} style={style}>
      <CardContent>
        <p style={{ fontSize: "1.1rem" }}>Day: {day[props.row]}</p>
        <TextField
          id="heightFeet"
          label="Title"
          defaultValue="Work"
          variant="outlined"
          required={true}
          multiline
          fullWidth
          margin="normal"
        />
        <TextField
          label="From"
          type="time"
          name="start"
          value={start}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          onChange={e => props.handleTimeChange(e)}
        />
        <TextField
          label="To"
          type="time"
          name="end"
          value={end}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          onChange={e => props.handleTimeChange(e)}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={props.onSubmit}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default NewTaskForm;
