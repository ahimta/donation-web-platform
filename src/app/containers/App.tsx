/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

interface IAppProps {
  children: Object;
};

interface IAppState {};

class App extends React.Component<IAppProps, IAppState> {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Header />

        {this.props.children}

        <hr />

        <Footer />
      </div>
    );
  }
}

export default App;
