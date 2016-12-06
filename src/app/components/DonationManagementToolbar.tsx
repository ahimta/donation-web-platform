/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';

interface IDonationManagementToolbarProps {
  currentUserId: string;
  deleteDonation: Function;
  donationId: string;
  donorId: string;
  reservation: any;
}

interface IDonationManagementToolbarState {}

export default class DonationManagementToolbar extends React.Component<IDonationManagementToolbarProps, IDonationManagementToolbarState> {
  static propTypes = {
    currentUserId: React.PropTypes.string.isRequired,
    deleteDonation: React.PropTypes.func.isRequired,
    donationId: React.PropTypes.string.isRequired,
    donorId: React.PropTypes.string.isRequired,
    reservation: React.PropTypes.object.isRequired
  };

  render() {
    const {currentUserId, deleteDonation, donationId, donorId, reservation} = this.props;

    return (
      <section>
        <ButtonGroup className={this.getReserveClass(currentUserId, reservation.reserverId, reservation.deliveredOrReceived)}>
          <Button bsStyle='danger' onClick={deleteDonation.bind(null, donationId)} disabled={currentUserId !== donorId}>حذف</Button>
          <DropdownButton bsStyle='success' dir='rtl' id='reserveDonationButton' title={this.getReserveTitle(reservation.reserverId)} disabled={!!reservation.reserverId || !!!currentUserId} dropup pullRight>
            <MenuItem className='text-right' eventKey='1' onClick={this.reserveDonation.bind(this, donationId, 'receiving', currentUserId)}>لاستقبال التبرع</MenuItem>
            <MenuItem className='text-right' eventKey='2' onClick={this.reserveDonation.bind(this, donationId, 'delivery', currentUserId)}>لتوصيل التبرع</MenuItem>
          </DropdownButton>
        </ButtonGroup>
        <ButtonGroup className={this.getCancelClass(currentUserId, reservation.reserverId, reservation.deliveredOrReceived)}>
          <Button bsStyle='danger' onClick={this.cancelReservation.bind(null, donationId)}>إلغاء الحجز</Button>
          <Button bsStyle='success' onClick={this.reportDonation.bind(null, donationId)}>{this.getCancelTitle(reservation.reservationType)}</Button>
        </ButtonGroup>
        <Button bsStyle='success' className={reservation.deliveredOrReceived ? '' : 'hidden'} block disabled>{this.getCancelTitle(reservation.reservationType)}</Button>
      </section>
    );
  }

  private cancelReservation(donationId: string) {
    database.cancelReservation(donationId);
    hashHistory.push('/donations');
  }

  private reportDonation(donationId: string) {
    database.reportDonation(donationId);
    hashHistory.push('/donations');
  }

  private reserveDonation(donationId: string, reservationType: string, currentUserId: string) {
    database.reserveDonation(donationId, reservationType, currentUserId);
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
      const reserveClass = this.getReserveClass(currentUserId, reserverId, deliveredOrReceived);
      return (reserveClass === 'hidden') ? '' : 'hidden';
    }
  }
}
