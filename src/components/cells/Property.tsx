import { FC } from "react";
import RenderHouses from "../RenderHouses";
import RenderPlayers from "../RenderPlayers";
import Cell from "./Cell";

const Property: FC<PropertyProps> = (props) => {
  return (
    <div className={`space property cell_${props.cell}`}>
      <div className="container">
        <div className={`color-bar ${props.color}`}></div>
        <div className={`name${props.three ? ' three-line-name' : ''}`}>{props.name}</div>
        <RenderPlayers cell={props.cell} />
        <RenderHouses cell={props.cell} />
        <div className="price">${props.price}</div>
      </div>
    </div>
  );
}

interface PropertyProps extends Cell {
  name: string;
  color: string;
  three?: boolean;
  price?: number;
}

export default Property;
