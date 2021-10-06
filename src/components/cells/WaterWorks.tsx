import { FC } from "react";
import RenderPlayers from "../RenderPlayers";
import Cell from "./Cell";

const Waterworks: FC<Cell> = (props) => {
  return (
    <div className={`space utility waterworks cell_${props.cell}`}>
      <div className="container">
        <div className="name">Compagnie de distribution des eaux</div>
        <RenderPlayers cell={props.cell} />
        <i className="drawing fa fa-tint"></i>
        <div className="price">150€</div>
      </div>
    </div>
  );
}

export default Waterworks;
