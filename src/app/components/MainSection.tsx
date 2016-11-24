/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Col, Glyphicon, Grid, ListGroup, ListGroupItem, Panel, Row} from 'react-bootstrap';
import Footer from './Footer.tsx';
import {SHOW_ALL} from '../constants/TodoFilters.tsx';

interface IMainProps {
  todos: any[];
  actions: any;
};

interface IMainState {
  filter: string;
};

class MainSection extends React.Component<IMainProps, IMainState> {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {filter: SHOW_ALL};
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleCompleteAll = this.handleCompleteAll.bind(this);
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted();
  }

  handleCompleteAll() {
    this.props.actions.completeAll();
  }

  handleShow(filter: string) {
    this.setState({filter});
  }

  renderToggleAll(completedCount: number) {
    const {todos} = this.props;
    if (todos.length > 0) {
      return (
        <input
          className='toggle-all'
          type='checkbox'
          checked={completedCount === todos.length}
          onChange={this.handleCompleteAll}
          />
      );
    }
  }

  renderFooter(completedCount: number) {
    const {todos} = this.props;
    const {filter} = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
          />
      );
    }
  }

  render() {
    return (
      <section>
        <Grid>
          <Row>
            <Col md={4}>
              <Panel header={<span><Glyphicon glyph='road' />&nbsp;<span>وصل تبرع</span></span>} className='text-center' bsStyle='primary'>
                <Button block bsStyle='success' href='/donations/volunteer'><Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span></Button>
              </Panel>
            </Col>
            <Col md={4}>
              <Panel header={<span><Glyphicon glyph='gift' />&nbsp;<span>تبرع</span></span>} className='text-center' bsStyle='primary'>
                <ButtonGroup justified>
                  <Button bsStyle='success' href='/donations/donate/other'>بشيء آخر</Button>
                  <Button bsStyle='success' href='/donations/donate/food'>بطعام</Button>
                </ButtonGroup>
              </Panel>
            </Col>
            <Col md={4}>
              <Panel header={<span><Glyphicon glyph='shopping-cart' />&nbsp;<span>استقبل تبرع</span></span>} className='text-center' bsStyle='primary'>
                <Button block bsStyle='success' href='/donations/receive'><Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span></Button>
              </Panel>
            </Col>
          </Row>
        </Grid>

        <hr />

        <Grid>
          <iframe
            width='100%'
            height='500em'
            frameBorder='0' style={{border: 0}}
            src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDzwYGquiVtVevyr4YS9hYc5F_IeI9Qhbc&q=Huraymila'
            allowFullScreen>
          </iframe>
        </Grid>

        <hr />

        <Grid>
          <Panel collapsible defaultExpanded header='النشاطات' className='text-center'>
            <ListGroup fill>
              <ListGroupItem className='text-right'>
                <span>وصلت</span>&nbsp;
                <a href='/charities/charity1'>جمعية1</a>&nbsp;
                <a href='/donations/donation1'>تبرع</a>&nbsp;
                <span>منذ</span>&nbsp;
                <span>40 دقيقة</span>&nbsp;
              </ListGroupItem>
              <ListGroupItem className='text-right'>
                <span>استلمت</span>&nbsp;
                <a href='/charities/charity1'>جمعية1</a>&nbsp;
                <a href='/donations/donation1'>تبرع</a>&nbsp;
                <span>منذ</span>&nbsp;
                <span>50 دقيقة</span>&nbsp;
              </ListGroupItem>
              <ListGroupItem className='text-right'>
                <span>تبرع</span>&nbsp;
                <a href='/users/user1'>مستخدم1</a>&nbsp;
                <a href='/donations/donation1'>بطعام</a>&nbsp;
                <span>منذ</span>&nbsp;
                <span>ساعة</span>&nbsp;
              </ListGroupItem>
              <ListGroupItem>&hellip;</ListGroupItem>
            </ListGroup>
          </Panel>
        </Grid>
      </section>
    );
  }
}

export default MainSection;
