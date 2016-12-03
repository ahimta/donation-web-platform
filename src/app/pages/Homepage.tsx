/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Col, Glyphicon, Grid, ListGroup, ListGroupItem, Panel, Row} from 'react-bootstrap';

import MockMap from '../components/MockMap';

interface IHomepageProps {
};

interface IHomepageState {
};

export default class Homepage extends React.Component<IHomepageProps, IHomepageState> {
  render() {
    return (
      <section>
        <Grid>
          <Row>
            <Col md={4}>
              <Panel header={<span><Glyphicon glyph='road' />&nbsp;<span>وصل تبرع</span></span>} className='text-center' bsStyle='primary'>
                <Button block bsStyle='success' href='#/donations/deliver'><Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span></Button>
              </Panel>
            </Col>
            <Col md={4}>
              <Panel header={<span><Glyphicon glyph='gift' />&nbsp;<span>تبرع</span></span>} className='text-center' bsStyle='primary'>
                <ButtonGroup justified>
                  <Button bsStyle='success' href='#/donations/donate/other'>بشيء آخر</Button>
                  <Button bsStyle='success' href='#/donations/donate/food'>بطعام</Button>
                </ButtonGroup>
              </Panel>
            </Col>
            <Col md={4}>
              <Panel header={<span><Glyphicon glyph='shopping-cart' />&nbsp;<span>استقبل تبرع</span></span>} className='text-center' bsStyle='primary'>
                <Button block bsStyle='success' href='#/donations/receive'><Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span></Button>
              </Panel>
            </Col>
          </Row>
        </Grid>

        <hr />

        <Grid>
          <MockMap />
        </Grid>

        <hr />

        <Grid>
          <Panel collapsible defaultExpanded header='النشاطات' className='text-center'>
            <ListGroup fill>
              <ListGroupItem className='text-right'>
                <span>وصلت</span>&nbsp;
                <a href='#/charities/charity1' disabled>جمعية1</a>&nbsp;
                <a href='#/donations/donation1'>تبرع</a>&nbsp;
                <span>منذ</span>&nbsp;
                <span>40 دقيقة</span>&nbsp;
              </ListGroupItem>
              <ListGroupItem className='text-right'>
                <span>استلمت</span>&nbsp;
                <a href='#/charities/charity1'>جمعية1</a>&nbsp;
                <a href='#/donations/donation1'>تبرع</a>&nbsp;
                <span>منذ</span>&nbsp;
                <span>50 دقيقة</span>&nbsp;
              </ListGroupItem>
              <ListGroupItem className='text-right'>
                <span>تبرع</span>&nbsp;
                <a href='#/users/user1'>مستخدم1</a>&nbsp;
                <a href='#/donations/donation1'>بطعام</a>&nbsp;
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
