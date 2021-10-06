import { FC } from "react";
import RenderPlayers from "../RenderPlayers";
import Cell from "./Cell";

const LuxuryTax: FC<Cell> = (props) => {
  return (
    <div className={`space fee luxury-tax cell_${props.cell}`}>
      <div className="container">
        <div className="name">Taxe de luxe</div>
        <RenderPlayers cell={props.cell} />
        <div className="drawing fa fa-diamond"></div>
        <div className="instructions">100€</div>
      </div>
    </div>
  );
}

export default LuxuryTax;
