import { FC } from "react";
import Cell from "./Cell";

const Chance: FC<ChanceProps> = (props) => {
  return (
    <div className={`space chance cell_${props.cell}`}>
      <div className="container">
        <div className="name">Chance</div>
        <i className={`drawing fa fa-question${props.blue ? ' blue' : ''}`}></i>
      </div>
    </div>
  );
}

interface ChanceProps extends Cell {
  blue?: boolean;
}

export default Chance;
