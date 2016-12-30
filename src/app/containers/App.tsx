/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import { setCurrentUser } from '../actions/index';
import * as auth from '../auth';
import * as database from '../database';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as storage from '../storage';
import UserRole from '../types/UserRole';

function mapStateToProps({currentUser}: any) {
  return {currentId: currentUser.id, currentRole: currentUser.role};
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ setCurrentUser }, dispatch) };
}

interface IAppProps {
  readonly actions: any;
  readonly children: Object;
  readonly currentId: string;
  readonly currentRole: UserRole;
}

interface IAppState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component<IAppProps, IAppState> {
  static propTypes = { children: React.PropTypes.object.isRequired };

  private unsubscribe: () => void;

  componentDidMount() {
    const {actions} = this.props;

    this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const [{providerId}] = user.providerData;

        if (providerId === 'google.com') {
          const phone = storage.getItem('phone');
          const {displayName, email, photoURL, uid} = user;

          database.setUser({ displayName, email, phone, photoURL, uid });
          actions.setCurrentUser({ charityId: '', id: uid, role: 'user', userId: user.uid });
        } else if (providerId === 'password') {
          actions.setCurrentUser({ charityId: user.uid, id: user.uid, role: 'charity', userId: '' });
        }
      } else {
        actions.setCurrentUser({ charityId: '', id: '', role: '', userId: '' });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {currentId, currentRole} = this.props;

    return (
      <div>
        <Header currentId={currentId} currentRole={currentRole} />

        {this.props.children}

        <hr />

        <Footer />
      </div>
    );
  }
}
