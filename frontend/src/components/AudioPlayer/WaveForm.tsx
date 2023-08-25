import React, { Component, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PlayButton, WaveformContainer, Wave } from "./WaveForm.styled";

export interface WaveFormInterface {
  track: string;
}

class Waveform extends Component<WaveFormInterface> {
  state = {
    playing: false,
  };
  waveform: WaveSurfer | undefined;

  componentDidMount() {
    // this.waveform = WaveSurfer.create({
    //   barWidth: 6,
    //   cursorWidth: 1,
    //   container: "#waveform",
    //   height: 80,
    //   progressColor: "#2D5BFF",
    //   waveColor: "#EFEFEF",
    //   cursorColor: "transparent",
    //   audioRate: 1,
    // });
    // this.waveform.load(this.props.track);
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform!.playPause();
  };

  render() {
    return (
      <WaveformContainer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </PlayButton>

        <Wave id="waveform" />
        <audio id="track" src={this.props.track} />
      </WaveformContainer>
    );
  }
}

export default Waveform;
