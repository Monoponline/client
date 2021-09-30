import { FC } from "react";
import Cell from "./Cell";

const ElectricCompany: FC<Cell> = (props) => {
  return (
    <div className={`space utility electric-company cell_${props.cell}`}>
      <div className="container">
        <div className="name">Compagnie de distribution d'électricité</div>
        <i className="drawing fa fa-lightbulb-o"></i>
        <div className="price">$150</div>
      </div>
    </div>
  );
}

export default ElectricCompany;
