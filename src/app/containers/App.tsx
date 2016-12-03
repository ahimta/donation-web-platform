/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

interface IAppProps {
  children: Object;
}

interface IAppState {
  currentUser: any;
  currentUserId: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    currentUser: React.PropTypes.object,
    currentUserId: React.PropTypes.string
  };

  private unsubscribe: () => void;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      currentUser: null,
      currentUserId: null
    };
  }

  getChildContext() {
    return {currentUser: this.state.currentUser, currentUserId: this.state.currentUserId};
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({currentUser: user});

      if (user) {
        const {displayName, email, photoURL, uid} = user;
        this.setState({currentUserId: user.uid});
        firebase.database().ref('users').child(uid).set({displayName, email, photoURL, uid});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
