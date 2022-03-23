import { FC } from "react";
import RenderPlayers from "../RenderPlayers";
import Cell from "./Cell";

const Jail: FC<Cell> = (props) => {
  return (
    <div className={`space corner jail cell_${props.cell}`}>
      <div className="just">Simple</div>
      <RenderPlayers cell={props.cell} />
      <div className="drawing">
        <div className="container">
          <div className="name">En</div>
          <div className="window">
            <div className="bar"/>
            <div className="bar"/>
            <div className="bar"/>
            <i className="person fa fa-frown-o"/>
          </div>
          <div className="name">Prison</div>
        </div>
      </div>
      <div className="visiting">Visite</div>
    </div>
  );
}

export default Jail;
