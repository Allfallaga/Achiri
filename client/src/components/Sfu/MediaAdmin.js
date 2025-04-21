import React, { useRef, useState, useEffect } from "react";
import { IoVideocamOutline } from "react-icons/io5";

function MediaAdmin(props) {
  const video = useRef();
  useEffect(() => {
    console.log(props);
    if (props.imAdmin) {
      video.current.srcObject = props.stream;
      if (props.stream) {
        video.current.srcObject = new MediaStream();
        video.current.srcObject.addTrack(props.stream.getVideoTracks()[0]);
      }
    } else {
      if (props.video || props.audio)
        video.current.srcObject = new MediaStream();
      console.log(props.video);
      if (props.video) video.current.srcObject.addTrack(props.video);
      if (props.audio) video.current.srcObject.addTrack(props.audio);
      return;
    }
  });
  console.log(props);
  return <video ref={video} autoPlay></video>;
}

export default MediaAdmin;
