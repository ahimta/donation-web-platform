/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

interface IAppProps {
  children: Object;
}

interface IAppState {
  currentCharityId: string;
  currentId: string;
  currentRole: string;
  currentUserId: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    currentCharityId: React.PropTypes.string,
    currentId: React.PropTypes.string,
    currentRole: React.PropTypes.string,
    currentUserId: React.PropTypes.string
  };

  private unsubscribe: () => void;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      currentCharityId: '',
      currentId: '',
      currentUserId: '',
      currentRole: ''
    };
  }

  getChildContext() {
    return this.state;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const [{providerId}] = user.providerData;

        if (providerId === 'google.com') {
          const {displayName, email, photoURL, uid} = user;

          this.setState({currentCharityId: '', currentId: uid, currentRole: 'user', currentUserId: user.uid});
          firebase.database().ref('users').child(uid).set({displayName, email, photoURL, uid});
        } else if (providerId === 'password') {
          this.setState({currentCharityId: user.uid, currentId: user.uid, currentRole: 'charity', currentUserId: ''});
        }
      } else {
        this.setState({currentCharityId: '', currentId: '', currentRole: '', currentUserId: ''});
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
