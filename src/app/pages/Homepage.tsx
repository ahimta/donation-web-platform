/// <reference path="../../../typings/index.d.ts" />

import classNames from 'classnames';
import * as React from 'react';
import { Button, ButtonGroup, Col, Glyphicon, Grid, Panel, Row } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import { fetchActivity } from '../actions/index';
import ActivityPanel from '../components/ActivityPanel';
import PhotoPanel from '../components/PhotoPanel';
import RegisterAsCharityButton from '../components/RegisterAsCharityButton';
import ShareButtons from '../components/ShareButtons';

import IActivity from '../types/IActivity';
import UserRole from '../types/UserRole';

const CAMPAIGN_URL = ('https://www.almowaten.net/2015/01/%D8%A7%D9%84%D8%AD%D9%85%D9%84%D8%A9-%D8%A7%D9%84%D8%B3%D8%B' +
  '9%D9%88%D8%AF%D9%8A%D8%A9-%D9%84%D9%86%D8%B5%D8%B1%D8%A9-%D8%A7%D9%84%D8%A3%D8%B4%D9%82%D8%A7%D8%A1-%D9%81%D9%8A-%' +
  'D8%B3%D9%88%D8%B1%D9%8A/');
const PhotoHeader = (<span>
  المصدر: <a href={CAMPAIGN_URL} target='_blank' rel='noopener'>صحيفة المواطن الإلكترونية</a>
</span>);

function mapStateToProps({activity, currentUser}: any) {
  return { activity: activity.activity, currentRole: currentUser.role };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchActivity }, dispatch) };
}

interface IHomepageProps {
  readonly actions: any;
  readonly activity: IActivity[];
  readonly currentRole: UserRole;
}

interface IHomepageState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class Homepage extends React.Component<IHomepageProps, IHomepageState> {
  componentWillMount() {
    this.props.actions.fetchActivity();
  }

  render() {
    const {activity, currentRole} = this.props;

    return (<section>
      <Grid>
        <PhotoPanel footer={PhotoHeader}
          header='الحملة السورية' photoUrl='https://i.imgur.com/19K85t0.png' />

        <Panel bsStyle='primary' className={classNames('text-center', { hidden: (currentRole !== 'charity') })}
          header={<span><Glyphicon glyph='road' />&nbsp;<span>وصل تبرع</span></span>}>
          <Button bsStyle='success' href='#/donations/deliver' block
            onClick={this.trackFactory('Homepage', 'Clicking', 'Choose donation-to-deliver button')}>
            <Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span>
          </Button>
        </Panel>

        <Row className={this.getCharityClass(currentRole)}>
          <Col md={4}>
            <Panel bsStyle='primary' className='text-center'
              header={<span><Glyphicon glyph='road' />&nbsp;<span>وصل تبرع</span></span>}>
              <Button bsStyle='success' href='#/donations/deliver' block
                onClick={this.trackFactory('Homepage', 'Clicking', 'Choose donation-to-deliver button')}>
                <Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span>
              </Button>
            </Panel>
          </Col>
          <Col md={4}>
            <Panel bsStyle='primary' className='text-center'
              header={<span><Glyphicon glyph='gift' />&nbsp;<span>تبرع</span></span>}>
              <ButtonGroup justified>
                <Button bsStyle='success' href='#/donate/nonfood'
                  onClick={this.trackFactory('Homepage', 'Clicking', 'Donate nonfood button')}>
                  بشيء آخر
                </Button>
                <Button bsStyle='success' href='#/donate/food'
                  onClick={this.trackFactory('Homepage', 'Clicking', 'Donate food button')}>
                  بطعام
                </Button>
              </ButtonGroup>
            </Panel>
          </Col>
          <Col md={4}>
            <Panel bsStyle='primary' className='text-center'
              header={<span><Glyphicon glyph='shopping-cart' />&nbsp;<span>استقبل تبرع</span></span>}>
              <Button bsStyle='success' href='#/donations/receive' block
                onClick={this.trackFactory('Homepage', 'Clicking', 'Choose donation-to-receive button')}>
                <Glyphicon glyph='search' />&nbsp;<span>اختر تبرع</span>
              </Button>
            </Panel>
          </Col>
        </Row>
      </Grid>

      <Grid><RegisterAsCharityButton userRole={currentRole} /></Grid>

      <hr />

      <Grid className='text-center'>
        <ShareButtons text='.منصة التبرعات للأفراد و المتطوعين و الجمعيات و المستفيدين' url='/' />
      </Grid>

      <hr />

      <Grid><ActivityPanel activity={activity} /></Grid>
    </section>);
  }

  private getCharityClass(currentRole: string) {
    return (currentRole === 'charity') ? 'hidden' : '';
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
