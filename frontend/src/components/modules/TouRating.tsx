import type { FC } from "react";
import Tou from "./Tou";

export const TouRating: FC<{
  selectedTou: number;
  setSelectedTou: (i: number) => void;
}> = ({ selectedTou, setSelectedTou }) => {
  const onSelect = (i: number) => {
    setSelectedTou(i + 1);
  };

  return (
    <>
      {[...Array(5)].map((n, i) => (
        <Tou key={i} selected={selectedTou > i} onSelect={() => onSelect(i)} />
      ))}
    </>
  );
};
