/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader, Panel, Table} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import FoodDonationsPanel from '../components/FoodDonationsPanel';
import MockMap from '../components/MockMap';
import NonfoodDonationsPanel from '../components/NonfoodDonationsPanel';
import t from '../translate';

interface IDonationsProps {
};

interface IDonationsState {
  foodDonations: Object[];
  otherDonations: Object[];
};

class Donations extends React.Component<IDonationsProps, IDonationsState> {
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
    const {foodDonations, otherDonations} = this.state;
    const FoodDonations = this.state.foodDonations.map(foodDonation => (
      <tr key={foodDonation['.key']}>
        <td className='text-center'>{t(foodDonation.foodType)}</td>
        <td className='text-center'>{t(foodDonation.occasion)}</td>
        <td className='text-center'>متوفر</td>
        <td className='text-center'>
          <ButtonGroup bsSize='sm'>
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' href={`#/donations/food/${foodDonation['.key']}`}>عرض</Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    const OtherDonations = this.state.otherDonations.map(donation => (
      <tr key={donation['.key']}>
        <td className='text-center'>{t(donation.donationType)}</td>
        <td className='text-center'>{t(donation.donationState)}</td>
        <td className='text-center'>
          <ButtonGroup bsSize='sm'>
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' href={`#/donations/other/${donation['.key']}`}>عرض</Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

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
          <MockMap />
        </Grid>

        <hr />

        <Grid>
          <FoodDonationsPanel donations={foodDonations} />
          <NonfoodDonationsPanel donations={otherDonations} />
        </Grid>

        <Grid className='text-center'>
          <ButtonGroup bsSize='lg'>
            <Button bsStyle='success' href='#/donations/donate/other'>تبرع بشيء آخر</Button>
            <Button bsStyle='success' href='#/donations/donate/food'>تبرع بطعام</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }
}

reactMixin(Donations.prototype, ReactFireMixin);

export default Donations;
