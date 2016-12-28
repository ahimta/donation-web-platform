/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import IReservation from '../types/IReservation';
import ReservationType from '../types/ReservationType';
import UserRole from '../types/UserRole';

interface IDonationManagementToolbarProps {
  readonly currentId: string;
  readonly currentRole: UserRole;
  readonly currentUserId: string;
  readonly deleteDonation: Function;
  readonly donationId: string;
  readonly donorId: string;
  readonly reservation: IReservation;

  readonly cancelReservation: () => void;
  readonly reportDonation: (reservationType: ReservationType) => void;
  readonly reserveDonation: (reservationType: ReservationType) => void;
}

interface IDonationManagementToolbarState { }

export default class DonationManagementToolbar extends React.Component<IDonationManagementToolbarProps, IDonationManagementToolbarState> {
  static propTypes = {
    currentId: React.PropTypes.string.isRequired,
    currentRole: React.PropTypes.string.isRequired,
    currentUserId: React.PropTypes.string.isRequired,
    deleteDonation: React.PropTypes.func.isRequired,
    donationId: React.PropTypes.string.isRequired,
    donorId: React.PropTypes.string.isRequired,
    reservation: React.PropTypes.object.isRequired,

    cancelReservation: React.PropTypes.func.isRequired,
    reportDonation: React.PropTypes.func.isRequired,
    reserveDonation: React.PropTypes.func.isRequired,
  };

  render() {
    const {currentId, currentRole, currentUserId, deleteDonation, donationId, donorId, reservation} = this.props;
    const {cancelReservation, reportDonation, reserveDonation} = this.props;

    return (<section>
      <ButtonGroup className={this.getReserveClass(currentId, reservation.reserverId, reservation.deliveredOrReceived)}>
        <Button bsStyle='danger' onClick={deleteDonation.bind(null, donationId)} disabled={currentUserId !== donorId || !donationId}>حذف</Button>
        <DropdownButton bsStyle='success' dir='rtl' id='reserveDonationButton' title={this.getReserveTitle(currentRole, reservation.reserverId)} disabled={!!reservation.reserverId || !donationId} dropup pullRight>
          <MenuItem className={currentRole === 'charity' ? 'hidden text-right' : 'text-right'}
            onClick={() => reserveDonation('receiving')}>
            لاستقبال التبرع
            </MenuItem>
          <MenuItem className='text-right'
            onClick={() => reserveDonation('delivery')}>
            لتوصيل التبرع
            </MenuItem>
        </DropdownButton>
      </ButtonGroup>
      <ButtonGroup className={this.getCancelClass(currentId, reservation.reserverId, reservation.deliveredOrReceived)}>
        <Button bsStyle='danger' disabled={!donationId} onClick={cancelReservation}>إلغاء الحجز</Button>
        <Button bsStyle='success' disabled={!donationId} onClick={() => reportDonation(reservation.type)}>{this.getCancelTitle(reservation.type)}</Button>
      </ButtonGroup>
      <Button bsStyle='success' className={reservation.deliveredOrReceived ? '' : 'hidden'} block disabled>{this.getCancelTitle(reservation.type)}</Button>
    </section>);
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
}
