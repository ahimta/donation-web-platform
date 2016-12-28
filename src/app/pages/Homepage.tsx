/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonGroup, Col, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import { fetchActivity } from '../actions/index';
import ActivityPanel from '../components/ActivityPanel';

import IActivity from '../types/IActivity';
import UserRole from '../types/UserRole';

function mapStateToProps({activity}: any) {
  return activity;
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchActivity }, dispatch) };
}

interface IHomepageProps {
  actions: any;
  activity: IActivity[];
}

interface IHomepageState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class Homepage extends React.Component<IHomepageProps, IHomepageState> {
  static contextTypes = { currentRole: React.PropTypes.string };

  context: { currentRole: UserRole };

  componentWillMount() {
    this.props.actions.fetchActivity();
  }

  render() {
    const {currentRole} = this.context;
    const {activity} = this.props;

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
                <Button bsStyle='success' href='#/donate/nonfood'>بشيء آخر</Button>
                <Button bsStyle='success' href='#/donate/food'>بطعام</Button>
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
