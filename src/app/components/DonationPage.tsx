/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, Image, PageHeader } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as database from '../database';
import DonationManagementToolbar from '../components/DonationManagementToolbar';

import DonationType from '../types/DonationType';
import IDonation from '../types/IDonation';
import IReservation from '../types/IReservation';
import UserRole from '../types/UserRole';

interface IDonationPageProps {
  params: { id: string };
}

interface IDonationPageState {
  donation: IDonation;
  reservation: IReservation;
}

export default (donationType: DonationType, title: string, DonationInfoPanel: any) =>
  class DonationPage extends React.Component<IDonationPageProps, IDonationPageState> {
    static contextTypes = {
      currentId: React.PropTypes.string,
      currentRole: React.PropTypes.string,
      currentUserId: React.PropTypes.string
    };

    context: { currentId: string, currentRole: UserRole, currentUserId: string };

    constructor(props: any, context: any) {
      super(props, context);

      this.state = {
        donation: { donorId: '' } as IDonation,
        reservation: {} as IReservation
      };
    }

    componentDidMount() {
      this.getDonation();
    }

    render() {
      const {currentId, currentRole, currentUserId} = this.context;
      const {params} = this.props;
      const {donation, reservation} = this.state;

      return (<section>
        <PageHeader className='text-center'>{title}</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
          </Breadcrumb>

          <DonationInfoPanel donation={donation} />
        </Grid>

        <hr className={donation.photoUrl ? '' : 'hidden'} />

        <Grid className={donation.photoUrl ? '' : 'hidden'}>
          <Image src={donation.photoUrl} responsive thumbnail />
        </Grid>

        <hr />

        <Grid className='text-center'>
          <DonationManagementToolbar currentId={currentId} currentRole={currentRole} currentUserId={currentUserId}
            deleteDonation={this.deleteDonation} donationId={params.id} donationType={donationType} donorId={donation.donorId}
            onUpdate={this.getDonation.bind(this)} reservation={reservation} />
        </Grid>
      </section>);
    }

    private getDonation() {
      const {params} = this.props;

      database.getDonation(donationType, params.id).then(({donation, reservation}) => {
        this.setState({ donation, reservation });
      }).catch(({code}) => {
        if (code === 404) {
          hashHistory.push('/404');
        }
      });
    }

    private deleteDonation(id: string) {
      database.removeDonation(donationType, id).then(() => {
        hashHistory.push('/donations');
      });
    }
  };
