/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import { fetchDonation, removeDonation } from '../actions/index';
import * as auth from '../auth';
import * as database from '../database';
import DonationManagementToolbar from './DonationManagementToolbar';
import PhotoPanel from './PhotoPanel';
import Progressbar from './Progressbar';

import DonationType from '../types/DonationType';
import IDonation from '../types/IDonation';
import IReservation from '../types/IReservation';
import ReservationType from '../types/ReservationType';
import UserRole from '../types/UserRole';

function mapStateToProps(state: any) {
  const {donation: donationStore} = state;
  const {donation, errorCode, reservation} = donationStore;
  return { donation, errorCode, reservation };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchDonation, removeDonation }, dispatch) };
}

interface IDonationPageProps {
  readonly actions: any;
  readonly donation: IDonation;
  readonly errorCode?: number;
  readonly params: { id: string };
  readonly reservation: IReservation;
}

interface IDonationPageState { }

export default function donationPage(donationType: DonationType, title: string, DonationInfoPanel: any) {
  @connect(mapStateToProps, mapDispatchToProps)
  class DonationPage extends React.Component<IDonationPageProps, IDonationPageState> {
    static contextTypes = {
      currentId: React.PropTypes.string,
      currentRole: React.PropTypes.string,
      currentUserId: React.PropTypes.string
    };

    context: { currentId: string, currentRole: UserRole, currentUserId: string };

    componentWillMount() {
      const {actions, params} = this.props;
      actions.fetchDonation(donationType, params.id);
    }

    render() {
      const {currentId, currentRole, currentUserId} = this.context;
      const {donation, errorCode, params, reservation} = this.props;

      const donorId = donation && donation.donorId;
      const photoUrl = donation && donation.photoUrl;

      // hack
      if (errorCode === 404) {
        hashHistory.push('/404');
      }

      const ManagementToolbar = <DonationManagementToolbar currentId={currentId} currentRole={currentRole}
        currentUserId={currentUserId} deleteDonation={this.deleteDonation.bind(this)} donationId={params.id}
        donorId={donorId} reservation={reservation} cancelReservation={this.cancelReservation.bind(this)}
        reportDonation={this.reportDonation.bind(this)} reserveDonation={this.reserveDonation.bind(this)} />;

      return (<section>
        <PageHeader className='text-center'>{title}</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <Progressbar data={donation}>
            <DonationInfoPanel donation={donation} footer={ManagementToolbar} />
            <PhotoPanel header='صورة للتبرع' photoUrl={photoUrl} />
          </Progressbar>
        </Grid>
      </section>);
    }

    private deleteDonation(id: string) {
      if (confirm('حذف التبرع؟')) {
        const {actions, params} = this.props;

        actions.removeDonation(donationType, params.id);
        hashHistory.push('/donations');
      }
    }

    private cancelReservation() {
      const {currentId, currentRole} = this.context;
      const {params} = this.props;

      database.cancelReservation(donationType, params.id, currentRole, currentId).then(this.onUpdate.bind(this));
    }

    private onUpdate() {
      const {currentId, currentRole} = this.context;
      const {actions, params} = this.props;

      actions.fetchDonation(donationType, params.id);
    }

    private reportDonation(reservationType: ReservationType) {
      const {currentId, currentRole} = this.context;
      const {params} = this.props;

      database.reportDonation(donationType, params.id, reservationType, currentRole, currentId).then(this.onUpdate.bind(this));
    }

    private reserveDonation(reservationType: ReservationType) {
      const {currentId, currentRole} = this.context;
      const {params} = this.props;

      auth.ensureLoggedIn(currentId).then((userId) => {
        database.reserveDonation(donationType, params.id, reservationType, currentRole, userId).then(this.onUpdate.bind(this));
      });
    }
  }

  return DonationPage;
}
