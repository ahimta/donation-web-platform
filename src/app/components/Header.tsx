/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavItem, NavDropdown} from 'react-bootstrap';

interface IHeaderProps {};

interface IHeaderState {
  user: Object;
};

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: any) {
    super(props);

    this.state = {user: null};
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({user: user});

      if (user) {
        const {displayName, email, photoURL, uid} = user;
        firebase.database().ref('users').child(uid).set({ displayName, email, photoURL, uid });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('logout');
    }, (error) => {
      console.log(error);
    });
  }

  getLoginClass(user: Object) {
    if (user) {
      return 'hidden';
    } else {
      return '';
    }
  }

  getLogoutClass(user: Object) {
    if (user) {
      return '';
    } else {
      return 'hidden';
    }
  }

  render() {
    return (
      <header style={{marginBottom: '5em'}}>
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#/'><Glyphicon glyph='home' /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='text-right'>
              <NavItem eventKey={2} href='#/charities/register' className={this.getLoginClass(this.state.user)} disabled>سجل كجمعية</NavItem>
              <NavDropdown eventKey={1} title='سجل دخول' id='basic-nav-dropdown-login' dir='rtl' className={this.getLoginClass(this.state.user)}>
                <MenuItem eventKey={1.1} className='text-right' href='#/charities/login' disabled>كجمعية</MenuItem>
                <MenuItem eventKey={1.2} className='text-right' onClick={this.login.bind(this)}>كفرد</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} className={this.getLogoutClass(this.state.user)} onClick={this.logout.bind(this)}>سجل خروج</NavItem>
            </Nav>
            <Nav pullRight className='text-right'>
              <NavDropdown eventKey={4} title='تصفح' id='basic-nav-dropdown-browse' dir='rtl'>
                <MenuItem eventKey={4.1} className='text-right' href='#/donations'>التبرعات</MenuItem>
                <MenuItem eventKey={4.2} className='text-right' href='#/profiles'>الحسابات</MenuItem>
                <MenuItem eventKey={4.2} className='text-right' href='#/activity' disabled>النشاطات</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href='#/donations/receive' disabled>استقبل تبرع</NavItem>
              <NavItem eventKey={2} href='#/donations/volunteer' disabled>تطوع</NavItem>
              <NavDropdown eventKey={1} title='تبرع' id='basic-nav-dropdown-donate' dir='rtl'>
                <MenuItem eventKey={1.1} className='text-right' href='#/donations/donate/food'>بطعام</MenuItem>
                <MenuItem eventKey={1.2} className='text-right' href='#/donations/donate/other'>بشيء آخر</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
