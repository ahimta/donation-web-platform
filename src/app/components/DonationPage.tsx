/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Grid, Image, PageHeader} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';
import DonationManagementToolbar from '../components/DonationManagementToolbar';
import UserInfoPanel from '../components/UserInfoPanel';

interface IDonationPageProps {
  params: {id: string};
}

interface IDonationPageState {
  donor: any;
  donation: any;
  reservation: any;
}

export default (donationType: ('food' | 'nonfood'), title: string, DonationInfoPanel: any) =>
class DonationPage extends React.Component<IDonationPageProps, IDonationPageState> {
  public static contextTypes = {
    currentId: React.PropTypes.string,
    currentRole: React.PropTypes.string,
    currentUserId: React.PropTypes.string
  };

  public context: {
    currentId: string,
    currentRole: string,
    currentUserId: string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      donation: {
        donorId: ''
      },
      reservation: {}
    };
  }

  componentDidMount() {
    this.getDonation();
  }

  render() {
    const {currentId, currentRole, currentUserId} = this.context;
    const {params} = this.props;
    const {donation, donor, reservation} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>{title}</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <DonationInfoPanel donation={donation} />
          <UserInfoPanel phone={donation.phone} user={donor} />
        </Grid>

        <hr className={donation.photoUrl ? '' : 'hidden'} />

        <Grid>
          <Image className={donation.photoUrl ? '' : 'hidden'} src={donation.photoUrl} responsive thumbnail />
        </Grid>

        <hr />

        <Grid className='text-center'>
          <DonationManagementToolbar currentId={currentId} currentRole={currentRole} currentUserId={currentUserId}
            deleteDonation={this.deleteDonation} donationId={params.id} donationType={donationType} donorId={donation.donorId}
            onUpdate={this.getDonation.bind(this)} reservation={reservation} />
        </Grid>
      </section>
    );
  }

  private getDonation() {
    const {params} = this.props;

    database.getDonation(donationType, params.id).then(({donation, donor, reservation}) => {
      this.setState({donation: donation, donor, reservation});
    }).catch(({code}) => {
      if (code === 404) {
        hashHistory.push('/404');
      }
    });
  }

  private deleteDonation(id: string) {
    database.removeDonation(donationType, id).then(function() {
      hashHistory.push('/donations');
    });
  }
};
