import { FC } from "react";
import Cell from "./Cell";

const Go: FC<Cell> = (props) => {
  return (
    <div className={`space corner go cell_${props.cell}`}>
      <div className="container">
        <div className="instructions">Recevez $200 chaque fois que vous passez ici.</div>
        <div className="go-word">Départ</div>
      </div>
      <div className="arrow fa fa-long-arrow-left"></div>
    </div>
  );
}

export default Go;
