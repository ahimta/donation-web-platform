/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Glyphicon, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';
import IUser from '../types/IUser';
import UserRole from '../types/UserRole';

interface IHeaderProps { }
interface IHeaderState { }

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  static contextTypes = { currentRole: React.PropTypes.string };

  context: { currentRole: UserRole };

  render() {
    const {currentRole} = this.context;

    return (<header style={{ marginBottom: '5em' }}>
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
              <MenuItem className='text-right' href='#/activity'>النشاطات</MenuItem>
            </NavDropdown>
            <NavItem className={this.getCharityClass(currentRole)} href='#/donations/receive' onClick={this.goto.bind(null, '/donations/receive')}>استقبل تبرع</NavItem>
            <NavItem href='#/donations/deliver' onClick={this.goto.bind(null, '/donations/deliver')}>وصل تبرع</NavItem>
            <NavDropdown className={this.getCharityClass(currentRole)} dir='rtl' id='basic-nav-dropdown-donate' title='تبرع'>
              <MenuItem className='text-right' href='#/donations/donate/food'>بطعام</MenuItem>
              <MenuItem className='text-right' href='#/donations/donate/nonfood'>بشيء آخر</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>);
  }

  private getCharityClass(currentRole: UserRole) {
    return (currentRole === 'charity') ? 'hidden' : '';
  }

  private getLoginClass(user: IUser): string {
    return user ? 'hidden' : '';
  }

  private getLogoutClass(user: IUser): string {
    return user ? '' : 'hidden';
  }

  private goto(location: string) {
    hashHistory.push(location);
  }
}
