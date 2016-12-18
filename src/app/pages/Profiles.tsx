/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import { Breadcrumb, Grid, PageHeader } from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import CharitiesProfilesPanel from '../components/CharitiesProfilesPanel';
import UsersProfilesPanel from '../components/UsersProfilesPanel';

import ICharity from '../types/ICharity';
import IRegularUser from '../types/IRegularUser';

interface IProfilesProps { }

interface IProfilesState {
  readonly charities: ICharity[];
  readonly users: IRegularUser[];
}

export default class Profiles extends React.Component<IProfilesProps, IProfilesState> {
  private bindAsArray: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { charities: [], users: [] };
  }

  componentDidMount() {
    this.bindAsArray(firebase.database().ref('charities'), 'charities');
    this.bindAsArray(firebase.database().ref('users'), 'users');
  }

  render() {
    const {charities, users} = this.state;

    return (<section>
      <PageHeader className='text-center'>الحسابات</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>الحسابات</Breadcrumb.Item>
        </Breadcrumb>

        <CharitiesProfilesPanel charities={charities} />
        <UsersProfilesPanel users={users} />
      </Grid>
    </section>);
  }
}

reactMixin(Profiles.prototype, ReactFireMixin);
