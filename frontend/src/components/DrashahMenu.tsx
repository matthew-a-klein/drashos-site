import DrashahMenuItem, { DrashahMenuItemInterface } from "./DrashahMenuItem";

export interface DrashahMenuInterface {
  items: DrashahMenuItemInterface[];
}

const DrashahMenu = ({ items }: DrashahMenuInterface) => {
  let list: JSX.Element[] = [];
  items.forEach(function (item) {
    const { title, id } = item;
    list.push(<DrashahMenuItem key={id} title={title} id={id} />);
  });
  return (
    <div className="">
      <div className="">{list}</div>
    </div>
  );
};

export default DrashahMenu;
