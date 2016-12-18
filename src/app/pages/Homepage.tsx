/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonGroup, Col, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';

import ActivityPanel from '../components/ActivityPanel';
import * as database from '../database';

import IActivity from '../types/IActivity';
import UserRole from '../types/UserRole';

interface IHomepageProps { }

interface IHomepageState {
  activity: IActivity[];
}

export default class Homepage extends React.Component<IHomepageProps, IHomepageState> {
  static contextTypes = { currentRole: React.PropTypes.string };

  context: { currentRole: UserRole };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { activity: [] };
  }

  componentDidMount() {
    database.getActivity().then((activity) => {
      this.setState({ activity });
    });
  }

  render() {
    const {currentRole} = this.context;
    const {activity} = this.state;

    return (<section>
      <Grid>
        <Panel bsStyle='primary' className={currentRole === 'charity' ? 'text-center' : 'hidden text-center'} header={<span><Glyphicon glyph='road' />&nbsp;<span>وصل تبرع</span></span>}>
          <Button block bsStyle='success' href='#/donations/deliver'><Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span></Button>
        </Panel>

        <Row className={this.getCharityClass(currentRole)}>
          <Col md={4}>
            <Panel header={<span><Glyphicon glyph='road' />&nbsp;<span>وصل تبرع</span></span>} className='text-center' bsStyle='primary'>
              <Button block bsStyle='success' href='#/donations/deliver'><Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span></Button>
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header={<span><Glyphicon glyph='gift' />&nbsp;<span>تبرع</span></span>} className='text-center' bsStyle='primary'>
              <ButtonGroup justified>
                <Button bsStyle='success' href='#/donations/donate/nonfood'>بشيء آخر</Button>
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

      <Grid>
        <ActivityPanel activity={activity} />
      </Grid>
    </section>);
  }

  private getCharityClass(currentRole: string) {
    return (currentRole === 'charity') ? 'hidden' : '';
  }
}
