/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import ActivityPanel from '../components/ActivityPanel';
import { fetchActivity } from '../actions/index';

import IActivity from '../types/IActivity';

function mapStateToProps({activity}: any) {
  return activity;
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchActivity }, dispatch) };
}

interface IActivityProps {
  readonly actions: any;
  readonly activity: IActivity[];
}

interface IActivityState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class Activity extends React.Component<IActivityProps, IActivityState> {
  componentWillMount() {
    this.props.actions.fetchActivity();
  }

  render() {
    const {activity} = this.props;

    return (<section>
      <PageHeader className='text-center'>النشاطات</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>النشاطات</Breadcrumb.Item>
        </Breadcrumb>

        <ActivityPanel activity={activity} />
      </Grid>
    </section>);
  }
}
