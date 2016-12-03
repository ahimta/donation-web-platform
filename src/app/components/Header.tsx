/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavItem, NavDropdown} from 'react-bootstrap';

interface IHeaderProps {}

interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  static contextTypes = {
    currentUser: React.PropTypes.object
  };

  private login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  private logout(): void {
    firebase.auth().signOut().then(() => {
      console.log('logout');
    }, (error) => {
      console.log(error);
    });
  }

  private getLoginClass(user: Object): string {
    if (user) {
      return 'hidden';
    } else {
      return '';
    }
  }

  private getLogoutClass(user: Object): string {
    if (user) {
      return '';
    } else {
      return 'hidden';
    }
  }

  render() {
    const {currentUser} = this.context;

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
              <NavItem eventKey={2} href='#/charities/register' className={this.getLoginClass(currentUser)} disabled>سجل كجمعية</NavItem>
              <NavDropdown eventKey={1} title='سجل دخول' id='basic-nav-dropdown-login' dir='rtl' className={this.getLoginClass(currentUser)}>
                <MenuItem eventKey={1.1} className='text-right' href='#/charities/login' disabled>كجمعية</MenuItem>
                <MenuItem eventKey={1.2} className='text-right' onClick={this.login.bind(this)}>كفرد</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} className={this.getLogoutClass(currentUser)} onClick={this.logout.bind(this)}>سجل خروج</NavItem>
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
