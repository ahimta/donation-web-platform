/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import { Breadcrumb, Grid, PageHeader } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import ActivityPanel from '../components/ActivityPanel';
import CharityInfoPanel from '../components/CharityInfoPanel';
import * as database from '../database';
import IActivity from '../types/IActivity';

interface ICharityProps {
  readonly params: { id: string };
}

interface ICharityState {
  readonly activity: IActivity[];
  readonly charity: any;
}

export default class Charity extends React.Component<ICharityProps, ICharityState> {
  private bindAsObject: Function;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { activity: [], charity: {} };
  }

  componentDidMount() {
    const {id} = this.props.params;

    this.bindAsObject(firebase.database().ref(`charities/${id}`), 'charity');
    database.getActivity().then((activity) => {
      const filteredActivity = activity.filter((a) => (a.userId === id));
      this.setState({ activity: filteredActivity, charity: this.state.charity } as ICharityState);
    });
  }

  render() {
    const {activity, charity} = this.state;

    if (charity['.value'] === null) {
      hashHistory.push('/404');
      return null;
    }

    return (
      <section>
        <PageHeader className='text-center'>صفحة جمعية</PageHeader>

        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/profiles'>الحسابات</Breadcrumb.Item>
            <Breadcrumb.Item active>صفحة جمعية</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <CharityInfoPanel charity={charity} />
          <ActivityPanel activity={activity} />
        </Grid>
      </section>
    );
  }
}

reactMixin(Charity.prototype, ReactFireMixin);
