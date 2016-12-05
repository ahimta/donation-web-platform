/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, DropdownButton, Grid, MenuItem, PageHeader, Panel, SplitButton, Table} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';
import t from '../translate';
import MockMap from '../components/MockMap';
import UserInfoPanel from '../components/UserInfoPanel';

interface IFoodDonationProps {
  params: {id: string};
}

interface IFoodDonationState {
  donor: any;
  foodDonation: any;
  reservation: any;
}

export default class FoodDonation extends React.Component<IFoodDonationProps, IFoodDonationState> {
  static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      foodDonation: {},
      reservation: {}
    };
  }

  componentDidMount() {
    const {params} = this.props;
    firebase.database().ref(`foodDonations/${params.id}`).once('value').then((snapshot) => {
      const foodDonation = snapshot.val();
      const reservationPromise = firebase.database().ref(`reservations/${params.id}`).once('value');
      const userPromise = firebase.database().ref(`users/${foodDonation.donorId}`).once('value');

      this.setState({foodDonation});

      return Promise.all([reservationPromise, userPromise]);
    }).then(([reservationSnapshot, userSnapshot]) => {
      this.setState({donor: userSnapshot.val(), reservation: reservationSnapshot.val()});
    });
  }

  render() {
    const {currentUserId} = this.context;
    const {params} = this.props;
    const {donor, foodDonation, reservation} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>تبرع طعام</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>تبرع طعام</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <Panel header='بيانات التبرع' footer={foodDonation.notes} bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>النوع</th>
                  <td className='text-center'>{t(foodDonation.foodType)}</td>
                </tr>
                <tr>
                  <th className='text-center'>المناسبة</th>
                  <td className='text-center'>{t(foodDonation.occasion)}</td>
                </tr>
                <tr>
                  <th className='text-center'>الأطباق</th>
                  <td className='text-center'>{foodDonation.dishes}</td>
                </tr>
                <tr>
                  <th className='text-center'>الحالة</th>
                  <td className='text-center'>متوفر</td>
                </tr>
              </tbody>
            </Table>
          </Panel>

          <UserInfoPanel phone={foodDonation.phone} user={donor} />
        </Grid>

        <hr />

        <Grid>
          <MockMap />
        </Grid>

        <hr />

        <Grid className='text-center'>
          <ButtonGroup className={this.getReserveClass(currentUserId, reservation.reserverId, reservation.deliveredOrReceived)}>
            <Button bsStyle='danger' onClick={this.deleteDonation.bind(null, params.id)} disabled={currentUserId !== foodDonation.donorId}>حذف</Button>
            <DropdownButton bsStyle='success' dir='rtl' id='reserveFoodDonationButton' title={this.getReserveTitle(reservation.reserverId)} disabled={!!reservation.reserverId} dropup pullRight>
              <MenuItem className='text-right' eventKey='1' onClick={this.reserve.bind(this, 'receiving')}>لاستقبال التبرع</MenuItem>
              <MenuItem className='text-right' eventKey='2' onClick={this.reserve.bind(this, 'delivery')}>لتوصيل التبرع</MenuItem>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup className={this.getCancelClass(currentUserId, reservation.reserverId, reservation.deliveredOrReceived)}>
            <Button bsStyle='danger' onClick={this.cancelReservation.bind(null, params.id)}>إلغاء الحجز</Button>
            <Button bsStyle='success' onClick={this.report.bind(null, params.id)}>{this.getCancelTitle(reservation.reservationType)}</Button>
          </ButtonGroup>
          <Button bsStyle='success' className={reservation.deliveredOrReceived ? '' : 'hidden'} block disabled>{this.getCancelTitle(reservation.reservationType)}</Button>
        </Grid>
      </section>
    );
  }

  private cancelReservation(donationId: string) {
    firebase.database().ref('reservations').child(donationId).update({
      reservationType: null,
      reserverId: null
    });
    hashHistory.push('/donations');
  }

  private report(donationId: string) {
    firebase.database().ref('reservations').child(donationId).child('deliveredOrReceived').set(true);
    hashHistory.push('/donations');
  }

  private getCancelTitle(reservationType: string) {
    if (reservationType === 'delivery') {
      return 'تم التوصيل';
    } else {
      return 'تم الاستلام';
    }
  }

  private getReserveTitle(reserverId: string) {
    if (reserverId) {
      return 'محجوز';
    } else {
      return 'حجز';
    }
  }

  private getReserveClass(currentUserId: string, reserverId: string, deliveredOrReceived: boolean) {
    if (deliveredOrReceived) {
      return 'hidden';
    } else {
      return (currentUserId && currentUserId === reserverId) ? 'hidden' : '';
    }
  }

  private getCancelClass(currentUserId: string, reserverId: string, deliveredOrReceived: boolean) {
    if (deliveredOrReceived) {
      return 'hidden';
    } else {
      const reserveClass = this.getReserveClass(currentUserId, reserverId);
      return (reserveClass === 'hidden') ? '' : 'hidden';
    }
  }

  private reserve(reservationType: string) {
    const {currentUserId} = this.context;
    const {params} = this.props;

    firebase.database().ref('reservations').child(params.id).set({
      deliveredOrReceived: false,
      reservationType,
      reserverId: currentUserId
    }).then(() => {
      hashHistory.push('/donations');
    });
  }

  private deleteDonation(id: string) {
    database.removeFoodDonation(id).then(function() {
      hashHistory.push('/donations');
    });
  }
}
