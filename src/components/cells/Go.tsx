import { FC } from "react";
import RenderPlayers from "../RenderPlayers";
import Cell from "./Cell";

const Go: FC<Cell> = (props) => {
  return (
    <div className={`space corner go cell_${props.cell}`}>
      <div className="container">
        <div className="instructions">Recevez $200 chaque fois que vous passez ici.</div>
        <div className="go-word">Départ</div>
        <RenderPlayers cell={props.cell} />
      </div>
      <div className="arrow fa fa-long-arrow-left"/>
    </div>
  );
}

export default Go;
