/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import FoodDonationsPanel from '../components/FoodDonationsPanel';
import MockMap from '../components/MockMap';
import NonfoodDonationsPanel from '../components/NonfoodDonationsPanel';

interface IDonationsProps {}

interface IDonationsState {
  foodDonations: any[];
  otherDonations: any[];
}

export default class Donations extends React.Component<IDonationsProps, IDonationsState> {
  static contextTypes = {
    currentRole: React.PropTypes.string
  };

  private bindAsArray: Function;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      foodDonations: [],
      otherDonations: []
    };
  }

  componentWillMount() {
    this.bindAsArray(firebase.database().ref('foodDonations'), 'foodDonations');
    this.bindAsArray(firebase.database().ref('otherDonations'), 'otherDonations');
  }

  render() {
    const {currentRole} = this.context;
    const {foodDonations, otherDonations} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>التبرعات</PageHeader>

        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item active>التبرعات</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <FoodDonationsPanel donations={foodDonations} />
          <NonfoodDonationsPanel donations={otherDonations} />
        </Grid>

        <Grid className={currentRole === 'charity' ? 'hidden' : 'text-center'}>
          <ButtonGroup bsSize='lg' justified>
            <Button bsStyle='success' href='#/donations/donate/other'>تبرع بشيء آخر</Button>
            <Button bsStyle='success' href='#/donations/donate/food'>تبرع بطعام</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }
}

reactMixin(Donations.prototype, ReactFireMixin);
