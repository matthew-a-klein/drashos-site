import { getDrashah } from "../api-requests/getDrashah";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { Drashah } from "../types/Drashah";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let data = (await getDrashah(params.id!)) as Drashah;
  if (data) {
    return data;
  }
  return null;
};

const ViewDrashah = () => {
  const data = useLoaderData() as Drashah;
  const { title, description, audio } = data;

  if (data === null) {
    return <>No drashah with that id was found</>;
  }

  return (
    <div className="h-full w-full max-w-lg mx-auto text-center">
      <div>{title}</div>
      <div>{description}</div>

      {<AudioPlayer src={audio} />}
    </div>
  );
};

export default ViewDrashah;
