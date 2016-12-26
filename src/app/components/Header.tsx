/// <reference path="../../../typings/index.d.ts" />

import classNames from 'classnames';
import * as React from 'react';
import { Button, Glyphicon, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';
import UserRole from '../types/UserRole';

interface IHeaderProps { }
interface IHeaderState { }

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  static contextTypes = { currentId: React.PropTypes.string, currentRole: React.PropTypes.string, router: React.PropTypes.any };
  context: { currentId: string, currentRole: UserRole, router: any };

  render() {
    const {currentId, currentRole, router} = this.context;

    return (<header style={{ marginBottom: '5em' }}>
      <Navbar collapseOnSelect fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#/'><Glyphicon glyph='home' /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className='text-right' pullLeft>
            <Navbar.Form className={this.getLogoutClass(currentRole)} onClick={auth.logout} pullLeft>
              <Button bsStyle='danger'>سجل خروج</Button>
            </Navbar.Form>
            <NavItem active={router.isActive('/register/charity')} className={classNames({ hidden: currentRole })} href='#/register/charity' onClick={this.goto.bind(null, '/register/charity')}>سجل كجمعية</NavItem>
            <NavItem active={router.isActive(this.getAccountUrl(currentRole, currentId))} className={this.getLogoutClass(currentRole)}
              href={`#${this.getAccountUrl(currentRole, currentId)}`}
              onClick={this.goto.bind(null, this.getAccountUrl(currentRole, currentId))}>
              حسابي
            </NavItem>
            <NavDropdown title='سجل دخول' id='basic-nav-dropdown-login' dir='rtl' className={this.getLoginClass(currentRole)}>
              <MenuItem active={router.isActive('/login/charity')} className='text-right' href='#/login/charity'>كجمعية</MenuItem>
              <MenuItem className='text-right' onClick={auth.login}>كمستخدم</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight className='text-right'>
            <MenuItem className='text-right'
              href='https://twitter.com/intent/tweet?via=ahymta&url=https%3A%2F%2Fdonation-web-pla-1479993243743.firebaseapp.com'
              target='_blank'>
              اتصل بنا
            </MenuItem>
            <NavDropdown title='تصفح' id='basic-nav-dropdown-browse' dir='rtl'>
              <MenuItem active={router.isActive('/donations')} className='text-right' href='#/donations'>التبرعات</MenuItem>
              <MenuItem active={router.isActive('/charities')} className='text-right' href='#/charities'>الجمعيات</MenuItem>
              <MenuItem active={router.isActive('/activity')} className='text-right' href='#/activity'>النشاطات</MenuItem>
            </NavDropdown>
            <NavItem active={router.isActive('/donations')} className={classNames({ hidden: (currentRole === 'charity') })} href='#/donations/receive' onClick={this.goto.bind(null, '/donations/receive')}>استقبل تبرع</NavItem>
            <NavItem active={router.isActive('/donations')} className={classNames({ hidden: (currentRole === 'charity') })} href='#/donations/deliver' onClick={this.goto.bind(null, '/donations/deliver')}>وصل تبرع</NavItem>
            <NavDropdown className={classNames({ hidden: (currentRole === 'charity') })} dir='rtl' id='basic-nav-dropdown-donate' title='تبرع'>
              <MenuItem active={router.isActive('/donate/food')} className='text-right' href='#/donate/food'>بطعام</MenuItem>
              <MenuItem active={router.isActive('/donate/nonfood')} className='text-right' href='#/donate/nonfood'>بشيء آخر</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>);
  }

  private getAccountUrl(role: UserRole, id: string) {
    return (role === 'charity') ? `/charities/${id}` : `/users/${id}`;
  }

  private getLoginClass(userRole: UserRole): string {
    return userRole ? 'hidden' : '';
  }

  private getLogoutClass(userRole: UserRole): string {
    return userRole ? '' : 'hidden';
  }

  private goto(location: string) {
    hashHistory.push(location);
  }
}
