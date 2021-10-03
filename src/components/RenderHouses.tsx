import { FC } from 'react';
import Cell from './cells/Cell';
import { connect } from 'react-redux';
import { Houses, State } from '../reducers/rootReducer';
import house from './../images/house.png';
import hotel from './../images/hotel.png';

const RenderHouses: FC<RenderHousesCellProps> = (props) => {
  const h = props.houses.find((house) => house.cell === props.cell);
  if (!h?.houses) return <></>;
  const houses = [];

  for (let index = 0; index < h.houses; index++) {
    houses.push('house');
  }

  return (
    <div className="houses">
      {h.houses === 5 ? (
        <img src={hotel} alt="Hotel" className="hotel" />
      ) : houses.map((ignored, index) => <img key={index} src={house} alt="House" className="house" />)}
    </div>
  );
};

interface RenderHousesCellProps extends Cell {
  houses: Houses[];
}

const mapStateToProps = (state: State) => {
  return {
    houses: state.houses
  }
}

export default connect(mapStateToProps)(RenderHouses);
