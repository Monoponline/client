import { FC } from "react";
import Cell from "./Cell";

const CommunityChest: FC<Cell> = (props) => {
  return (
    <div className={`space community-chest cell_${props.cell}`}>
      <div className="container">
        <div className="name">Caisse de communauté</div>
        <i className="drawing fa fa-cube"></i>
      </div>
    </div>
  );
}

export default CommunityChest;
