/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import { Breadcrumb, Grid, PageHeader } from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import CharitiesProfilesPanel from '../components/CharitiesProfilesPanel';
import ICharity from '../types/ICharity';

interface IProfilesProps { }

interface IProfilesState {
  readonly charities: ICharity[];
}

export default class Profiles extends React.Component<IProfilesProps, IProfilesState> {
  private bindAsArray: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { charities: [] };
  }

  componentDidMount() {
    this.bindAsArray(firebase.database().ref('charities'), 'charities');
  }

  render() {
    const {charities} = this.state;

    return (<section>
      <PageHeader className='text-center'>الحسابات</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>الحسابات</Breadcrumb.Item>
        </Breadcrumb>

        <CharitiesProfilesPanel charities={charities} />
      </Grid>
    </section>);
  }
}

reactMixin(Profiles.prototype, ReactFireMixin);
