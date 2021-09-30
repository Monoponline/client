import { Component } from "react";
import Board from "./components/Board";

class App extends Component {
  state = {
    view: 1
  }

  componentDidUpdate() {
    switch (this.state.view) {
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
  }
  
  handleSwitchView = () => {
    let views = [1, 2, 3, 4];
    this.setState({
      view: views[views.indexOf(this.state.view) + 1] ?? views[0]
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleSwitchView}>Switch View</button>
        <Board />
        <div style={{  }}>
          <h1>test</h1>
        </div>
      </div>
    );
  }
}

export default App;
