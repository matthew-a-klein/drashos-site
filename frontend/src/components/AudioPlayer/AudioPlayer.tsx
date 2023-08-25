import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { RefObject, useRef, useState } from "react";
import AudioDownloadButton from "./AudioDownloadButton";

export interface AudioPlayerInterface {
  src: string;
}

const AudioPlayer = ({ src }: AudioPlayerInterface) => {
  const audioRef: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const progressBarRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <div className="border-2 flex flex-col justify-center border-slate-400 h-24 rounded-lg">
      <div>
        <DisplayTrack
          src={src}
          audioRef={audioRef}
          setDuration={setDuration}
          progressBarRef={progressBarRef}
        />
        <div className="flex flex-auto  justify-center items-center">
          <img src="https://www.picsum.photos/80" className="rounded-md" />
          <ProgressBar
            progressBarRef={progressBarRef}
            audioRef={audioRef}
            duration={duration}
            timeProgress={timeProgress}
          />
          <div className="flex flex-col">
            <AudioDownloadButton url={src} />
            <Controls
              audioRef={audioRef}
              duration={duration}
              setTimeProgress={setTimeProgress}
              progressBarRef={progressBarRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
