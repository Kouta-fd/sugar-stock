import touEmpty from "../../assets/images/tou-empty.png";
import touFilled from "../../assets/images/tou-filled.png";

const Tou = ({ selected = false, onSelect = () => {} }) => {
  return (
    <>
      {selected ? (
        <img className="mr-2" src={touFilled} onClick={onSelect} />
      ) : (
        <img className="mr-2" src={touEmpty} onClick={onSelect} />
      )}
    </>
  );
};

export default Tou;
