import { FC } from "react";
import Cell from "./Cell";

const Jail: FC<Cell> = (props) => {
  return (
    <div className={`space corner jail cell_${props.cell}`}>
      <div className="just">Simple</div>
      <div className="drawing">
        <div className="container">
          <div className="name">En</div>
          <div className="window">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <i className="person fa fa-frown-o"></i>
          </div>
          <div className="name">Prison</div>
        </div>
      </div>
      <div className="visiting">Visite</div>
    </div>
  );
}

export default Jail;
