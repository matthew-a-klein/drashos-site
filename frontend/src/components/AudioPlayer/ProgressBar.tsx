import { ComponentProps, RefObject } from "react";

export interface ProgressBarInterface extends ComponentProps<"div"> {
  progressBarRef: RefObject<HTMLInputElement>;
  audioRef: RefObject<HTMLAudioElement>;
  timeProgress: number;
  duration: number;
}

const ProgressBar = ({
  duration,
  timeProgress,
  progressBarRef,
  audioRef,
}: ProgressBarInterface) => {
  const handleProgressChange = () => {
    audioRef.current!.currentTime = parseInt(progressBarRef.current!.value);
  };

  const formatTime = (time: any) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  return (
    <div className="flex mx-6">
      <div>{formatTime(timeProgress)}</div>
      <input
        type="range"
        className="w-full h-3 mt-1.5 mx-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <div>{formatTime(duration)}</div>
    </div>
  );
};

export default ProgressBar;
