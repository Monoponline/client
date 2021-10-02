import { FC } from "react";
import RenderPlayers from "../RenderPlayers";
import Cell from "./Cell";

const CommunityChest: FC<Cell> = (props) => {
  return (
    <div className={`space community-chest cell_${props.cell}`}>
      <div className="container">
        <div className="name">Caisse de communauté</div>
        <RenderPlayers cell={props.cell} />
        <i className="drawing fa fa-cube"></i>
      </div>
    </div>
  );
}

export default CommunityChest;
