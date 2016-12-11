/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import {Breadcrumb, Grid, PageHeader} from 'react-bootstrap';

import CharityInfoPanel from '../components/CharityInfoPanel';

interface ICharityProps {
  params: {id: string};
}

interface ICharityState {
  charity: any;
}

export default class Charity extends React.Component<ICharityProps, ICharityState> {
  private bindAsObject: Function;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      charity: {}
    };
  }

  componentDidMount() {
    const {id} = this.props.params;
    this.bindAsObject(firebase.database().ref(`charities/${id}`), 'charity');
  }

  render() {
    const {charity} = this.state;

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
        </Grid>
      </section>
    );
  }
}

reactMixin(Charity.prototype, ReactFireMixin);
