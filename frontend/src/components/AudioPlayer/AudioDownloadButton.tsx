import { AiOutlineDownload as DownloadIcon } from "react-icons/ai";

export interface AudioDownloadButtonInterface {
  url: string;
}

const AudioDownloadButton = ({ url }: AudioDownloadButtonInterface) => {
  const handleClick = () => {
    window.open(url);
  };
  return (
    <button onClick={handleClick}>
      <div>
        <DownloadIcon className=" ml-1 h-8 w-8" />
      </div>
    </button>
  );
};

export default AudioDownloadButton;
