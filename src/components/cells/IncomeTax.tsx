import { FC } from "react";
import Cell from "./Cell";

const IncomeTax: FC<Cell> = (props) => {
  return (
    <div className={`space fee income-tax cell_${props.cell}`}>
      <div className="container">
        <div className="name">Impôts sur le revenu</div>
        <div className="diamond"></div>
        <div className="instructions">$200</div>
      </div>
    </div>
  );
}

export default IncomeTax;
