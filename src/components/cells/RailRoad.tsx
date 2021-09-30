import { FC } from "react";
import Cell from "./Cell";

const RailRoad: FC<RailRoadProps> = (props) => {
  return (
    <div className={`space railroad cell_${props.cell}`}>
      <div className="container">
        <div className="name">{props.name}</div>
        <i className="drawing fa fa-subway"></i>
        <div className="price">$200</div>
      </div>
    </div>
  );
}

interface RailRoadProps extends Cell {
  name: string;
}

export default RailRoad;
