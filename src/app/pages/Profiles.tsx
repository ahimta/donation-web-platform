/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Grid, PageHeader} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import CharitiesProfilesPanel from '../components/CharitiesProfilesPanel';
import MockMap from '../components/MockMap';
import UsersProfilesPanel from '../components/UsersProfilesPanel';

interface IProfilesProps {}

interface IProfilesState {
  charities: any[];
  users: any[];
}

export default class Profiles extends React.Component<IProfilesProps, IProfilesState> {
  private bindAsArray: any;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      charities: [],
      users: []
    };
  }

  componentWillMount() {
    this.bindAsArray(firebase.database().ref('charities'), 'charities');
    this.bindAsArray(firebase.database().ref('users'), 'users');
  }

  render() {
    const {charities, users} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>الحسابات</PageHeader>

        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item active>الحسابات</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <MockMap />
        </Grid>

        <hr />

        <Grid>
          <CharitiesProfilesPanel charities={charities} />
          <UsersProfilesPanel users={users} />
        </Grid>
      </section>
    );
  }
}

reactMixin(Profiles.prototype, ReactFireMixin);
