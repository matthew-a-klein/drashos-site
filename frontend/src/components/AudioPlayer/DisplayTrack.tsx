import { Dispatch, RefObject, SetStateAction } from "react";

export interface DisplayTrackInterface {
  src: string;
  audioRef: RefObject<HTMLAudioElement>;
  setDuration: Dispatch<SetStateAction<number>>;
  progressBarRef: RefObject<HTMLInputElement>;
}

const DisplayTrack = ({
  src,
  audioRef,
  setDuration,
  progressBarRef,
}: DisplayTrackInterface) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current!.duration;
    setDuration(seconds);
    progressBarRef.current!.max = seconds.toString();
  };
  return (
    <div>
      <audio src={src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} />
    </div>
  );
};
export default DisplayTrack;
