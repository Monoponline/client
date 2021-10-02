import { FC } from "react";
import Center from "./Center";
import Go from "./cells/Go";
import Property from "./cells/Property";
import Chance from "./cells/Chance";
import RailRoad from "./cells/RailRoad";
import CommunityChest from "./cells/CommunityChest";
import Jail from "./cells/Jail";
import IncomeTax from "./cells/IncomeTax";
import ElectricCompany from "./cells/ElectricCompany";
import FreeParking from "./cells/FreeParking";
import Waterworks from "./cells/WaterWorks";
import GoToJail from "./cells/GoToJail";
import LuxuryTax from "./cells/LuxuryTax";

const Board: FC<BoardProps> = (props) => {
  return (
    <div className="table">
      <div className="board">
        <Center username={props.username} />
        <Go cell={0} />

        <div className="row horizontal-row bottom-row">
          <Property color="light-blue" name="Avenue de la république" price={120} cell={9} />
          <Property color="light-blue" name="Rue de courcelles" price={100} cell={8} />
          <Chance cell={7} />
          <Property color="light-blue" name="Rue de vaugirard" price={100} cell={6} />
          <RailRoad name="Gare Montparnasse" cell={5} />
          <IncomeTax cell={4} />
          <Property color="dark-purple" name="Rue lecourbe" price={60} cell={3} />
          <CommunityChest cell={2} />
          <Property color="dark-purple" name="Boulevard de belleville" price={60} cell={1} />
        </div>
    
        <Jail cell={10} />
    
        <div className="row vertical-row left-row">
          <Property color="orange" name="Place pigalle" price={200} cell={19} />
          <Property color="orange" name="Boulevard saint-michel" price={180} cell={18} />
          <CommunityChest cell={17} />
          <Property color="orange" name="Avenue mozart" price={180} cell={16} />
          <RailRoad name="Gare de lyon" cell={15} />
          <Property color="purple" name="Rue de paradis" price={160} cell={14} />
          <Property color="purple" name="Avenue de neuilly" price={140} cell={13} />
          <ElectricCompany cell={12} />
          <Property color="purple" name="Boulevard de la villette" price={140} cell={11} />
        </div>
    
        <FreeParking cell={20} />
    
        <div className="row horizontal-row top-row">
          <Property color="red" name="Avenue Matignon" price={220} cell={21} />
          <Chance blue={true} cell={22} />
          <Property color="red" name="Boulevard Malesherbes" price={220} cell={23} />
          <Property color="red" name="Avenue Henri-martin" price={240} cell={24} />
          <RailRoad name="Gare du nord" cell={25} />
          <Property color="yellow" name="Faubourg Saint-Honoré" price={260} cell={26} />
          <Property color="yellow" name="Place de la bourse" price={260} cell={27} />
          <Waterworks cell={28} />
          <Property color="yellow" name="Rue la fayette" price={280} cell={29} />
        </div>
    
        <GoToJail cell={30} />
    
        <div className="row vertical-row right-row">
          <Property color="green" name="Avenue de breteuil" price={300} cell={31} />
          <Property color="green" name="Avenue foch" price={300} cell={32} />
          <CommunityChest cell={33} />
          <Property color="green" name="Boulevard des capucines" price={320} cell={34} />
          <RailRoad name="Gare saint-lazare" cell={35} />
          <Chance cell={36} />
          <Property color="dark-blue" name="Avenue des champs-élysées" price={350} cell={37} />
          <LuxuryTax cell={38} />
          <Property color="dark-blue" name="Rue de la paix" price={400} cell={39} />
        </div>
      </div>
    </div>
  );
}

interface BoardProps {
  username: string;
}

export default Board;
