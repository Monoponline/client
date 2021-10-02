import { FC, useEffect, useState } from 'react';
import chance from './../images/chance.png';
import communitychest from './../images/communitychest.png';

const Center: FC = (props) => {
  const [view, setView] = useState(0);
  
  useEffect(() => {
    switch (view) {
      case 1:
        document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(0deg)';
        break;
      case 2:
        document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(90deg)';
        break;
      case 3:
        document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(180deg)';
        break;
      case 4:
        document.querySelector<HTMLDivElement>('.board')!.style.transform = 'rotate(270deg)';
        break;
    }
  }, [view]);

  const handleSwitchView = () => {
    let views = [1, 2, 3, 4];
    setView(views[views.indexOf(view) + 1] ?? views[0]);
  };

  return (
    <div className="center">
      <div style={{ display: 'flex', justifyContent: 'flex-end', justifyItems: 'flex-end' }}>
        <button style={{ fontSize: '1rem' }} onClick={handleSwitchView}>Switch View</button>
      </div>
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
