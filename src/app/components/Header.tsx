/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavItem, NavDropdown} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as auth from '../auth';

interface IHeaderProps {}

interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  public static contextTypes = {
    currentRole: React.PropTypes.string
  };

  public context: {
    currentRole: string
  };

  render() {
    const {currentRole} = this.context;

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
              <NavItem className={this.getLoginClass(currentRole)} href='#/charities/register' onClick={this.goto.bind(null, '/charities/register')}>سجل كجمعية</NavItem>
              <NavDropdown title='سجل دخول' id='basic-nav-dropdown-login' dir='rtl' className={this.getLoginClass(currentRole)}>
                <MenuItem className='text-right' href='#/charities/login'>كجمعية</MenuItem>
                <MenuItem className='text-right' onClick={auth.login}>كفرد</MenuItem>
              </NavDropdown>
              <NavItem className={this.getLogoutClass(currentRole)} onClick={auth.logout}>سجل خروج</NavItem>
            </Nav>
            <Nav pullRight className='text-right'>
              <NavDropdown title='تصفح' id='basic-nav-dropdown-browse' dir='rtl'>
                <MenuItem className='text-right' href='#/donations'>التبرعات</MenuItem>
                <MenuItem className='text-right' href='#/profiles'>الحسابات</MenuItem>
                <MenuItem className='text-right' href='#/activity' disabled>النشاطات</MenuItem>
              </NavDropdown>
              <NavItem className={this.getCharityClass(currentRole)} href='#/donations/receive' onClick={this.goto.bind(null, '/donations/receive')}>استقبل تبرع</NavItem>
              <NavItem href='#/donations/deliver' onClick={this.goto.bind(null, '/donations/deliver')}>وصل تبرع</NavItem>
              <NavDropdown className={this.getCharityClass(currentRole)} dir='rtl' id='basic-nav-dropdown-donate' title='تبرع'>
                <MenuItem className='text-right' href='#/donations/donate/food'>بطعام</MenuItem>
                <MenuItem className='text-right' href='#/donations/donate/other'>بشيء آخر</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }

  private getCharityClass(currentRole: string) {
    return (currentRole === 'charity') ? 'hidden' : '';
  }

  private goto(location: string) {
    hashHistory.push(location);
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
}
