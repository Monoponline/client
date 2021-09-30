import { FC } from 'react';
import chance from './../images/chance.png';
import communitychest from './../images/communitychest.png';

const Center: FC = (props) => {
  return (
    <div className="center">
      <div className="community-chest-deck">
        <h2 className="label">Caisse de communauté</h2>
        <div className="deck">
          <img src={communitychest} height="77px" width="104px" alt="Caisse de communauté" />
        </div>
      </div>
      <h1 className="title">MONOPOLY</h1>
      <div className="chance-deck">
        <h2 className="label">Chance</h2>
        <div className="deck">
          <img src={chance} height="77px" width="104px" alt="Chance" />
        </div>
      </div>
    </div>
  );
}

export default Center;
