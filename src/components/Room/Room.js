import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Room(props) {
  console.log(props.data);
  return (
    <Link className="room-box" key={props.data.id} to={"/chatroom/" + props.data.id}>
          <Button className='room-title' color="secondary">{props.data.name}</Button>
          <p className='room-description'>{props.data.description}</p>
          <span >Come in !</span>
    </Link>
  );
}

export default Room;
