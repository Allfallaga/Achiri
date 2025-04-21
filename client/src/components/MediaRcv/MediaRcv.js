import React, { useEffect, useRef, useState } from "react";
import {
  IoVolumeMuteSharp,
  IoVideocamOffSharp,
  IoVideocam,
  IoBanSharp,
  IoVolumeHighSharp,
} from "react-icons/io5";

function MediaRcv(props) {
  const video = React.useRef();

  let [videoState, setVideoState] = useState(false);
  let [audioState, setAudioState] = useState(false);

  React.useEffect(() => {
    video.current.srcObject = new MediaStream();
    if (props.video) video.current.srcObject.addTrack(props.video.track);
    if (props.audio) video.current.srcObject.addTrack(props.audio.track);
  });

  const toggleVideo = () => {
    video.current.srcObject.getVideoTracks()[0].enabled =
      !video.current.srcObject.getVideoTracks()[0].enabled;
    setVideoState((val) => !val);
  };

  const toggleSound = () => {
    video.current.srcObject.getAudioTracks()[0].enabled =
      !video.current.srcObject.getAudioTracks()[0].enabled;
    setAudioState((val) => !val);
  };

  return (
    <div>
      <div className="moderation-controls-container">
        <div className="moderation-controls">
          <span
            onClick={toggleSound}
            className={
              audioState
                ? "active moderation-icon-control icon-mute"
                : "inactive moderation-icon-control icon-mute"
            }
          >
            {!audioState ? <IoVolumeHighSharp /> : <IoVolumeMuteSharp />}
          </span>
          <span
            onClick={toggleVideo}
            className={
              videoState
                ? "active moderation-icon-control icon-mute"
                : "inactive moderation-icon-control icon-mute"
            }
          >
            {!videoState ? <IoVideocam /> : <IoVideocamOffSharp />}
          </span>
        </div>
      </div>
      <video ref={video} autoPlay={true}></video>
    </div>
  );
}

export default MediaRcv;

// import React from "react";
// import {
//   IoVolumeMuteSharp,
//   IoVideocamOffSharp,
//   IoVideocam,
//   IoBanSharp,
//   IoVolumeHighSharp,
// } from "react-icons/io5";
// class MediaRcv extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       videoState: false,
//       audioState: false,
//       videoTrack: this.props.video,
//       audioTrack: this.props.audio,
//     };
//     this.video = React.createRef();
//     this.toggleVideo = this.toggleVideo.bind(this);
//     this.toggleSound = this.toggleSound.bind(this);
//   }

//   componentDidMount() {
//     console.log(this.state)
//     this.video.current.srcObject = new MediaStream();
//     if (this.state.videoTrack)
//       this.video.current.srcObject.addTrack(this.state.videoTrack.track);
//     if (this.state.audioTrack)
//       this.video.current.srcObject.addTrack(this.state.audioTrack.track);
//   }

//   componentDidUpdate(prevProps) {
//     this.updateTracks(this.props.video, this.props.audio)
//     console.log(prevProps)
//     console.log(this.props)
//   }

//   updateTracks(videoTrack, audioTrack) {
//     this.video.current.srcObject = new MediaStream();
//     if (this.state.videoTrack)
//       this.video.current.srcObject.addTrack(this.state.videoTrack.track);
//     if (this.state.audioTrack)
//       this.video.current.srcObject.addTrack(this.state.audioTrack.track);
//   }

//   toggleVideo() {
//     this.video.current.srcObject.getVideoTracks()[0].enabled =
//       !this.video.current.srcObject.getVideoTracks()[0].enabled;
//     this.setState((state) => ({
//       videoState: !state.videoState,
//       audioState: state.audioState,
//     }));
//     // setVideoState(this.video.current.srcObject.getVideoTracks()[0].enabled);
//   }

//   toggleSound() {
//     console.log(this.video.current.srcObject.getAudioTracks()[0].enabled)
//     this.video.current.srcObject.getAudioTracks()[0].enabled =
//       !this.video.current.srcObject.getAudioTracks()[0].enabled;
//     this.setState((state) => ({
//       videoState: state.videoState,
//       audioState: !state.audioState,
//     }));
//     // setAudioState(this.video.current.srcObject.getAudioTracks()[0].enabled);
//   }

//   render() {
//     return (
//       <div>
//         <div className="moderation-controls-container">
//           <div className="moderation-controls">
//             <span
//               onClick={this.toggleSound}
//               className="moderation-icon-control icon-mute"
//             >
//               {this.state.audioState ? <IoVolumeHighSharp /> :<IoVolumeMuteSharp /> }
//             </span>
//             <span
//               onClick={this.toggleVideo}
//               className="moderation-icon-control icon-video"
//             >
//               {this.state.videoState ? <IoVideocam /> : <IoVideocamOffSharp />}
//             </span>
//           </div>
//         </div>
//         <video ref={this.video} autoPlay={true}></video>
//       </div>
//     );
//   }
// }
// export default MediaRcv;
