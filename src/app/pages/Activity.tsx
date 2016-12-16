/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, PageHeader } from 'react-bootstrap';

import ActivityPanel from '../components/ActivityPanel';
import * as database from '../database';

import IActivity from '../types/IActivity';

interface IProfilesProps { }

interface IProfilesState {
  readonly activity: IActivity[];
}

export default class Profiles extends React.Component<IProfilesProps, IProfilesState> {
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
    const {activity} = this.state;

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
