import React, { Component } from "react";

// import "./assets/styles/base.scss";
// import "../../styles/base.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Launches from "../components/Launches";

/**
 * Base component for the application
 */
class App extends Component {
  componentDidMount() {}
  /**
   * The header component contains a scroll down button that when clicked
   * should scroll the page down to where the main content starts
   */
  handleScrollClick = (scrollHeight) => {
    this.setState({
      scrollHeight,
    });

    window.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  /**
   * The footer contains a back to top button that should scrool
   * the page back up to where the results start
   */
  handleBackToTopClick = () => {
    window.scrollTo({
      top: this.state.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  render() {
    return (
      <div className="App">
        <Header onScrollClick={this.handleScrollClick} />
        <main>
          <Launches />
        </main>
        <Footer onBackToTopClick={this.handleBackToTopClick} />
      </div>
    );
  }
}

export default App;
