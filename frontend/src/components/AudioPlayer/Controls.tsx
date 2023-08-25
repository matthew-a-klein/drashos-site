import {
  MutableRefObject,
  RefObject,
  useEffect,
  useCallback,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// icons
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

export interface ControlsInterface {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
}

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
}: ControlsInterface) => {
  const playAnimationRef: MutableRefObject<number> = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const repeat = useCallback(() => {
    const currentTime = audioRef.current!.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current!.value = currentTime.toString();

    if (currentTime >= duration) {
      cancelAnimationFrame(playAnimationRef.current);
      return;
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  return (
    <div>
      <div>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <IoPauseSharp className="w-10 h-10 bg-red-300 rounded-full p-1  shadow-lg border-2 border-slate-800  " />
          ) : (
            <IoPlaySharp className="w-10 h-10 bg-green-300 rounded-full pl-1  shadow-lg border-2 border-slate-800 " />
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
