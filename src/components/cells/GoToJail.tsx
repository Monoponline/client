import { FC } from "react";
import Cell from "./Cell";

const GoToJail: FC<Cell> = (props) => {
  return (
    <div className={`space corner go-to-jail cell_${props.cell}`}>
      <div className="container">
        <div className="name">ALLEZ EN</div>
        <i className="drawing fa fa-gavel"></i>
        <div className="name">PRISON</div>
      </div>
    </div>
  );
}

export default GoToJail;
