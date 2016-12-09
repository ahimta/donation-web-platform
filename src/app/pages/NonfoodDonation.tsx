/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Grid, PageHeader} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';
import DonationManagementToolbar from '../components/DonationManagementToolbar';
import NonfoodDonationInfoPanel from '../components/NonfoodDonationInfoPanel';
import UserInfoPanel from '../components/UserInfoPanel';

interface INonfoodDonationProps {
  params: {id: string};
}

interface INonfoodDonationState {
  donor: any;
  nonfoodDonation: any;
  reservation: any;
}

export default class NonfoodDonation extends React.Component<INonfoodDonationProps, INonfoodDonationState> {
  static contextTypes = {
    currentId: React.PropTypes.string,
    currentRole: React.PropTypes.string,
    currentUserId: React.PropTypes.string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      nonfoodDonation: {},
      reservation: {}
    };
  }

  componentDidMount() {
    this.getDonation();
  }

  render() {
    const {currentId, currentRole, currentUserId} = this.context;
    const {params} = this.props;
    const {donor, nonfoodDonation, reservation} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>تبرع آخر</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>تبرع غير طعام</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <NonfoodDonationInfoPanel nonfoodDonation={nonfoodDonation} />
          <UserInfoPanel phone={nonfoodDonation.phone} user={donor} />
        </Grid>

        <hr />

        <Grid className='text-center'>
          <DonationManagementToolbar currentId={currentId} currentRole={currentRole} currentUserId={currentUserId}
            deleteDonation={this.deleteDonation} donationId={params.id} donorId={nonfoodDonation.donorId}
            onUpdate={this.getDonation.bind(this)} reservation={reservation} />
        </Grid>
      </section>
    );
  }

  private getDonation() {
    const {params} = this.props;

    database.getDonation('nonfood', params.id).then(({donation, donor, reservation}) => {
      this.setState({nonfoodDonation: donation, donor, reservation});
    });
  }

  private deleteDonation(id: string) {
    database.removeDonation('nonfood', id).then(function() {
      hashHistory.push('/donations');
    });
  }
}
