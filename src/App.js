import React, { Component } from "react";
import Main from "./components/Main";
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';

class App extends Component {
          state = {
           sideDrawerOpen: false
         };
          drawerToggleClickHandler = () => {
          this.setState((prevState) => {
          return {sideDrawerOpen: !prevState.sideDrawerOpen};
          });
        };

        backdropClickHandler = () => {
          this.setState({sideDrawerOpen: false});
        };

    render() {
      let backdrop;

      if (this.state.sideDrawerOpen) {
        backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
            {backdrop}
            <Main/>
      </div>
    );
  }
}

export default App;
