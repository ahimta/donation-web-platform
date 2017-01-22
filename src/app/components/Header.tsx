/// <reference path="../../../typings/index.d.ts" />

import classNames from 'classnames';
import * as React from 'react';
import { Alert, Button, Glyphicon, Grid, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { hashHistory } from 'react-router';

import * as auth from '../auth';
import NetworkStatus from '../types/NetworkStatus';
import UserRole from '../types/UserRole';

const CONTACT_US_LINK = ('https://twitter.com/intent/tweet?via=ahymta&url=' +
  'https%3A%2F%2Fdonation-web-pla-1479993243743.firebaseapp.com');

interface IHeaderProps {
  readonly currentId: string;
  readonly currentRole: UserRole;
  readonly networkStatus: NetworkStatus;
}

interface IHeaderState { }

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  static contextTypes = {
    router: React.PropTypes.any
  };

  static propTypes = {
    currentId: React.PropTypes.string.isRequired,
    currentRole: React.PropTypes.string.isRequired
  };

  context: { router: any };

  constructor(props: IHeaderProps, context: any) {
    super(props, context);
    this.state = { isOffline: !navigator.onLine };
  }

  render() {
    const {router} = this.context;
    const {currentId, currentRole, networkStatus} = this.props;
    const isCharity = (currentRole === 'charity');

    return (<header>
      <div style={{ marginBottom: '5em' }}>
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#/' onClick={this.trackFactory('Navigation', 'Clicking', 'Home icon')}>
                <Glyphicon glyph='home' />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='text-right' pullLeft>
              <Navbar.Form className={this.getLogoutClass(currentRole)} onClick={auth.logout} pullLeft>
                <Button bsStyle='danger' onClick={this.trackFactory('Navigation', 'Clicking', 'Logout button')}>
                  سجل خروج
              </Button>
              </Navbar.Form>
              <NavItem active={router.isActive('/register/charity')} className={classNames({ hidden: currentRole })}
                href='#/register/charity' onClick={this.gotoFactory('/register/charity', 'Charity register link')}>
                سجل كجمعية
            </NavItem>
              <NavItem active={router.isActive(this.getAccountUrl(currentRole, currentId))}
                className={this.getLogoutClass(currentRole)} href={`#${this.getAccountUrl(currentRole, currentId)}`}
                onClick={this.gotoFactory(this.getAccountUrl(currentRole, currentId), 'My account link')}>
                حسابي
            </NavItem>
              <NavDropdown className={this.getLoginClass(currentRole)} dir='rtl' id='basic-nav-dropdown-login'
                title='سجل دخول' onClick={this.trackFactory('Navigation', 'Clicking', 'Login dropdown')}>
                <MenuItem active={router.isActive('/login/charity')} className='text-right' href='#/login/charity'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Login as charity link')}>
                  كجمعية
              </MenuItem>
                <MenuItem className='text-right'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Login as user link', auth.login)}>
                  كمستخدم
              </MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight className='text-right'>
              <MenuItem className='text-right' href={CONTACT_US_LINK} target='_blank'
                onClick={this.trackFactory('Navigation', 'Clicking', 'Contact us link')}>
                اتصل بنا
            </MenuItem>
              <NavDropdown title='تصفح' id='basic-nav-dropdown-browse' dir='rtl'
                onClick={this.trackFactory('Navigation', 'Clicking', 'Browse dropdown')}>
                <MenuItem active={router.isActive('/donations')} className='text-right' href='#/donations'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Browse donations link')}>
                  التبرعات
              </MenuItem>
                <MenuItem active={router.isActive('/charities')} className='text-right' href='#/charities'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Browse charities link')}>
                  الجمعيات
              </MenuItem>
                <MenuItem active={router.isActive('/activity')} className='text-right' href='#/activity'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Browse activity link')}>
                  النشاطات
              </MenuItem>
              </NavDropdown>
              <NavItem active={router.isActive('/donations')} className={classNames({ hidden: isCharity })}
                href='#/donations/receive' onClick={this.gotoFactory('/donations/receive', 'Receive donation link')}>
                استقبل تبرع
            </NavItem>
              <NavItem active={router.isActive('/donations')} href='#/donations/deliver'
                onClick={this.gotoFactory('/donations/deliver', 'Deliver donation link')}>
                وصل تبرع
            </NavItem>
              <NavDropdown className={classNames({ hidden: isCharity })} dir='rtl'
                id='basic-nav-dropdown-donate' title='تبرع'
                onClick={this.trackFactory('Navigation', 'Clicking', 'Donate dropdown')}>
                <MenuItem active={router.isActive('/donate/food')} className='text-right' href='#/donate/food'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Donate food link')}>
                  بطعام
              </MenuItem>
                <MenuItem active={router.isActive('/donate/nonfood')} className='text-right' href='#/donate/nonfood'
                  onClick={this.trackFactory('Navigation', 'Clicking', 'Donate nonfood link')}>
                  بشيء آخر
              </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Grid>
        <Alert bsStyle='warning' className={classNames('text-right', { hidden: (networkStatus !== 'flaky') })}
          dir='rtl'>
          <strong>يوجد مشاكل في اتصال الانترنت!</strong>&nbsp;
          بعض الوظائف قد لا تعمل.
        </Alert>
        <Alert bsStyle='warning' className={classNames('text-right', { hidden: (networkStatus !== 'offline') })}
          dir='rtl'>
          <strong>لا يوجد اتصال انترنت!</strong>&nbsp;
          بعض الوظائف قد لا تعمل.
        </Alert>
      </Grid>
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

  private gotoFactory(location: string, trackingLabel: string) {
    return () => {
      ReactGA.event({ category: 'Navigation', action: 'Clicking', label: trackingLabel });
      hashHistory.push(location);
    };
  }

  private trackFactory(category: string, action: string, label: string, fn?: Function) {
    return () => {
      ReactGA.event({ category, action, label });
      if (fn) {
        fn();
      }
    };
  }
}
