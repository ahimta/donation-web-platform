/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavItem, NavDropdown} from 'react-bootstrap';

interface IHeaderProps {
  addTodo: (text: string) => void;
};

interface IHeaderState {};

class Header extends React.Component<IHeaderProps, IHeaderState> {
  static propTypes = {
    addTodo: React.PropTypes.func.isRequired
  };
  constructor(props: any) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header style={{marginBottom: '5em'}}>
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='/'><Glyphicon glyph='home' /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='text-right'>
              <NavItem eventKey={2} href='/charities/register'>سجل كجمعية</NavItem>
              <NavDropdown eventKey={1} title='سجل دخول' id='basic-nav-dropdown-login' dir='rtl'>
                <MenuItem eventKey={1.1} className='text-right' href='/charities/login'>كجمعية</MenuItem>
                <MenuItem eventKey={1.2} className='text-right' href='/users/login'>كفرد</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight className='text-right'>
              <NavDropdown eventKey={4} title='تصفح' id='basic-nav-dropdown-browse' dir='rtl'>
                <MenuItem eventKey={4.1} className='text-right' href='/donations'>التبرعات</MenuItem>
                <MenuItem eventKey={4.2} className='text-right' href='/profiles'>الحسابات</MenuItem>
                <MenuItem eventKey={4.2} className='text-right' href='/activity'>النشاطات</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href='/donations/receive'>استقبل تبرع</NavItem>
              <NavItem eventKey={2} href='/donations/volunteer'>تطوع</NavItem>
              <NavDropdown eventKey={1} title='تبرع' id='basic-nav-dropdown-donate' dir='rtl'>
                <MenuItem eventKey={1.1} className='text-right' href='/donations/donate/food'>بطعام</MenuItem>
                <MenuItem eventKey={1.2} className='text-right' href='/donations/donate/other'>بشيء آخر</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
