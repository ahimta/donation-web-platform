/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as auth from '../auth';
import * as database from '../database';

interface IDonationManagementToolbarProps {
  currentId: string;
  currentRole: string;
  currentUserId: string;
  deleteDonation: Function;
  donationId: string;
  donorId: string;
  onUpdate: Function;
  reservation: any;
}

interface IDonationManagementToolbarState {}

export default class DonationManagementToolbar extends React.Component<IDonationManagementToolbarProps, IDonationManagementToolbarState> {
  static defaultProps = {
    onUpdate: () => hashHistory.push('/donations'),
    reservation: {}
  };

  static propTypes = {
    currentId: React.PropTypes.string.isRequired,
    currentRole: React.PropTypes.string.isRequired,
    currentUserId: React.PropTypes.string.isRequired,
    deleteDonation: React.PropTypes.func.isRequired,
    donationId: React.PropTypes.string.isRequired,
    donorId: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func,
    reservation: React.PropTypes.object.isRequired
  };

  render() {
    const {currentId, currentRole, currentUserId, deleteDonation, donationId, donorId, onUpdate, reservation} = this.props;

    return (
      <section>
        <ButtonGroup className={this.getReserveClass(currentId, reservation.reserverId, reservation.deliveredOrReceived)}>
          <Button bsStyle='danger' onClick={deleteDonation.bind(null, donationId)} disabled={currentUserId !== donorId}>حذف</Button>
          <DropdownButton bsStyle='success' dir='rtl' id='reserveDonationButton' title={this.getReserveTitle(currentRole, reservation.reserverId)} disabled={!!reservation.reserverId} dropup pullRight>
            <MenuItem className={currentRole === 'charity' ? 'hidden text-right' : 'text-right'}
              onClick={this.reserveDonation.bind(this, donationId, 'receiving', currentId, onUpdate)}>
              لاستقبال التبرع
            </MenuItem>
            <MenuItem className='text-right'
              onClick={this.reserveDonation.bind(this, donationId, 'delivery', currentId, onUpdate)}>
              لتوصيل التبرع
            </MenuItem>
          </DropdownButton>
        </ButtonGroup>
        <ButtonGroup className={this.getCancelClass(currentId, reservation.reserverId, reservation.deliveredOrReceived)}>
          <Button bsStyle='danger' onClick={this.cancelReservation.bind(null, donationId, onUpdate)}>إلغاء الحجز</Button>
          <Button bsStyle='success' onClick={this.reportDonation.bind(null, donationId, onUpdate)}>{this.getCancelTitle(reservation.reservationType)}</Button>
        </ButtonGroup>
        <Button bsStyle='success' className={reservation.deliveredOrReceived ? '' : 'hidden'} block disabled>{this.getCancelTitle(reservation.reservationType)}</Button>
      </section>
    );
  }

  private cancelReservation(donationId: string, onUpdate: Function) {
    database.cancelReservation(donationId).then(onUpdate);
  }

  private reportDonation(donationId: string, onUpdate: Function) {
    database.reportDonation(donationId).then(onUpdate);
  }

  private reserveDonation(donationId: string, reservationType: string, currentId: string, onUpdate: Function) {
    const helper = (userOrCharityId) => { database.reserveDonation(donationId, reservationType, userOrCharityId).then(onUpdate); };

    if (currentId) {
      helper(currentId);
    } else {
      auth.login().then((user) => {
        helper(user.uid);
      });
    }
  }

  private getCancelTitle(reservationType: string) {
    if (reservationType === 'delivery') {
      return 'تم التوصيل';
    } else {
      return 'تم الاستلام';
    }
  }

  private getReserveTitle(currentRole: string, reserverId: string) {
    if (reserverId) {
      return 'محجوز';
    } else {
      if (currentRole) {
        return 'حجز';
      } else {
        return 'تسجيل دخول و حجز';
      }
    }
  }

  private getReserveClass(currentId: string, reserverId: string, deliveredOrReceived: boolean) {
    if (deliveredOrReceived) {
      return 'hidden';
    } else {
      return (currentId && currentId === reserverId) ? 'hidden' : '';
    }
  }

  private getCancelClass(currentId: string, reserverId: string, deliveredOrReceived: boolean) {
    if (deliveredOrReceived) {
      return 'hidden';
    } else {
      const reserveClass = this.getReserveClass(currentId, reserverId, deliveredOrReceived);
      return (reserveClass === 'hidden') ? '' : 'hidden';
    }
  }
}
