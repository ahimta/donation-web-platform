/// <reference path="../../../typings/index.d.ts" />

import classNames from 'classnames';
import * as React from 'react';
import { Alert, Button, Grid, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
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

    return (<header>
      <div style={{ marginBottom: '5em' }}>
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <img onClick={this.trackFactory('Favicon icon')} src='app/images/icon-256x256.png' />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='text-right' pullLeft>
              <Navbar.Form className={this.getLogoutClass(currentRole)} pullLeft>
                <Button bsStyle='danger' onClick={this.trackFactory('Logout button', auth.logout)}>
                  سجل خروج
              </Button>
              </Navbar.Form>
              <Navbar.Form className={this.getLoginClass(currentRole)} pullLeft>
                <Button bsStyle='success' onClick={this.trackFactory('Login button', auth.login)}>
                  سجل دخول
              </Button>
              </Navbar.Form>
              <NavItem active={router.isActive(this.getAccountUrl(currentRole, currentId))}
                className={this.getLogoutClass(currentRole)} href={`#${this.getAccountUrl(currentRole, currentId)}`}
                onClick={this.gotoFactory(this.getAccountUrl(currentRole, currentId), 'My account link')}>
                حسابي
            </NavItem>
            </Nav>
            <Nav pullRight className='text-right'>
              <MenuItem className='text-right' href={CONTACT_US_LINK} target='_blank'
                onClick={this.trackFactory('Contact us link')}>
                راسلنا
            </MenuItem>
              <NavDropdown title='مواقع أخرى' dir='rtl' id='other-websites'>
                <MenuItem className='text-right' href='https://ahimta.github.io/fuel-consumption-calculator/'
                  target='_blank'>
                  أسعار البنزين و المياه و الكهرباء
            </MenuItem>
                <MenuItem className='text-right' href='http://ahimta.github.io/saudi-radios' target='_blank' disabled>
                  الإذاعات السعودية
            </MenuItem>
                <MenuItem className='active text-right' href='https://donation-web-pla-1479993243743.firebaseapp.com/'
                  target='_blank'>
                  منصة التبرعات
            </MenuItem>
                <MenuItem className='text-right' href='https://ahimta.github.io/bagi/' target='_blank'>
                  باقي
            </MenuItem>
                <MenuItem divider />
                <MenuItem className='text-left' href='http://ctw.getforge.io/' target='_blank'>
                  Clinton, Trump, what's up
            </MenuItem>
                <MenuItem className='text-left' href='https://blood-donation-system0.herokuapp.com/' target='_blank'>
                  Blood Donation System
            </MenuItem>
              </NavDropdown>
              <NavItem active={router.isActive('/donations/receive')} href='#/donations/receive'
                onClick={this.gotoFactory('/donations/receive', 'Receive donation link')}>
                استقبل تبرع
            </NavItem>
              <NavItem active={router.isActive('/donations/deliver')} href='#/donations/deliver'
                onClick={this.gotoFactory('/donations/deliver', 'Deliver donation link')}>
                وصل تبرع
            </NavItem>
              <NavDropdown dir='rtl' id='basic-nav-dropdown-donate' title='تبرع'
                onClick={this.trackFactory('Donate dropdown')}>
                <MenuItem active={router.isActive('/donate/food')} className='text-right' href='#/donate/food'
                  onClick={this.trackFactory('Donate food link')}>
                  بطعام
              </MenuItem>
                <MenuItem active={router.isActive('/donate/nonfood')} className='text-right' href='#/donate/nonfood'
                  onClick={this.trackFactory('Donate nonfood link')}>
                  بشيء آخر
              </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Grid className={classNames({ hidden: (networkStatus === 'online') })}>
        <Alert bsStyle='warning' className={classNames('text-right', { hidden: (networkStatus !== 'flaky') })}
          dir='rtl' style={{ marginBottom: '0px' }}>
          <strong>يوجد مشاكل في اتصال الانترنت!</strong>&nbsp;
          بعض الوظائف قد لا تعمل.
        </Alert>
        <Alert bsStyle='warning' className={classNames('text-right', { hidden: (networkStatus !== 'offline') })}
          dir='rtl' style={{ marginBottom: '0px' }}>
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

  private trackFactory(label: string, fn?: Function) {
    return () => {
      ReactGA.event({ category: 'Navigation', action: 'Clicking', label });
      if (fn) {
        fn();
      }
    };
  }
}
