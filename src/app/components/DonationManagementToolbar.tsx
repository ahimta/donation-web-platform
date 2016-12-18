/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';
import * as database from '../database';

import DonationType from '../types/DonationType';
import IReservation from '../types/IReservation';
import ReservationType from '../types/ReservationType';
import UserRole from '../types/UserRole';

interface IDonationManagementToolbarProps {
  currentId: string;
  currentRole: UserRole;
  currentUserId: string;
  deleteDonation: Function;
  donationId: string;
  donationType: string;
  donorId: string;
  onUpdate: (x: any) => any;
  reservation: IReservation;
}

interface IDonationManagementToolbarState { }

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
    donationType: React.PropTypes.string.isRequired,
    donorId: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func,
    reservation: React.PropTypes.object.isRequired
  };

  render() {
    const {currentId, currentRole, currentUserId, deleteDonation, donationId, donationType, donorId, onUpdate, reservation} = this.props;

    return (<section>
      <ButtonGroup className={this.getReserveClass(currentId, reservation.reserverId, reservation.deliveredOrReceived)}>
        <Button bsStyle='danger' onClick={deleteDonation.bind(null, donationId)} disabled={currentUserId !== donorId || !donationId}>حذف</Button>
        <DropdownButton bsStyle='success' dir='rtl' id='reserveDonationButton' title={this.getReserveTitle(currentRole, reservation.reserverId)} disabled={!!reservation.reserverId || !donationId} dropup pullRight>
          <MenuItem className={currentRole === 'charity' ? 'hidden text-right' : 'text-right'}
            onClick={this.reserveDonation.bind(this, donationType, donationId, 'receiving', currentRole, currentId, onUpdate)}>
            لاستقبال التبرع
            </MenuItem>
          <MenuItem className='text-right'
            onClick={this.reserveDonation.bind(this, donationType, donationId, 'delivery', currentRole, currentId, onUpdate)}>
            لتوصيل التبرع
            </MenuItem>
        </DropdownButton>
      </ButtonGroup>
      <ButtonGroup className={this.getCancelClass(currentId, reservation.reserverId, reservation.deliveredOrReceived)}>
        <Button bsStyle='danger' disabled={!donationId} onClick={this.cancelReservation.bind(null, donationType, donationId, currentRole, currentId, onUpdate)}>إلغاء الحجز</Button>
        <Button bsStyle='success' disabled={!donationId} onClick={this.reportDonation.bind(null, donationType, donationId, reservation.type, currentRole, currentId, onUpdate)}>{this.getCancelTitle(reservation.type)}</Button>
      </ButtonGroup>
      <Button bsStyle='success' className={reservation.deliveredOrReceived ? '' : 'hidden'} block disabled>{this.getCancelTitle(reservation.type)}</Button>
    </section>);
  }

  private cancelReservation(donationType: DonationType, donationId: string, userRole: UserRole, userId: string, onUpdate: Function) {
    database.cancelReservation(donationType, donationId, userRole, userId).then(onUpdate);
  }

  private getCancelClass(currentId: string, reserverId: string, deliveredOrReceived: boolean) {
    if (deliveredOrReceived) {
      return 'hidden';
    } else {
      const reserveClass = this.getReserveClass(currentId, reserverId, deliveredOrReceived);
      return (reserveClass === 'hidden') ? '' : 'hidden';
    }
  }

  private getCancelTitle(reservationType: string) {
    if (reservationType === 'delivery') {
      return 'تم التوصيل';
    } else {
      return 'تم الاستلام';
    }
  }

  private getReserveClass(currentId: string, reserverId: string, deliveredOrReceived: boolean) {
    if (deliveredOrReceived) {
      return 'hidden';
    } else {
      return (currentId && currentId === reserverId) ? 'hidden' : '';
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

  private reportDonation(donationType: DonationType, donationId: string, reservationType: ReservationType, userRole: UserRole, userId: string, onUpdate: Function) {
    database.reportDonation(donationType, donationId, reservationType, userRole, userId).then(onUpdate);
  }

  private reserveDonation(donationType: DonationType, donationId: string, reservationType: ReservationType, userRole: UserRole, currentId: string, onUpdate: Function) {
    const helper = (userOrCharityId) => {
      database.reserveDonation(donationType, donationId, reservationType, userRole, userOrCharityId).then(onUpdate);
    };

    if (currentId) {
      helper(currentId);
    } else {
      auth.login().then((user) => {
        helper(user.uid);
      });
    }
  }
}
