import { FC } from "react";
import Cell from "./Cell";

const FreeParking: FC<Cell> = (props) => {
  return (
    <div className={`space corner free-parking cell_${props.cell}`}>
      <div className="container">
        <div className="name">Parc</div>
        <i className="drawing fa fa-car"></i>
        <div className="name">Gratuit</div>
      </div>
    </div>
  );
}

export default FreeParking;
