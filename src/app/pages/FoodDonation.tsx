/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Grid, PageHeader, Panel, Table} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';
import DonationManagementToolbar from '../components/DonationManagementToolbar';
import t from '../translate';
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
    currentId: React.PropTypes.string,
    currentRole: React.PropTypes.string,
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
    this.getDonation();
  }

  render() {
    const {currentId, currentRole, currentUserId} = this.context;
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
                  <th className='text-center'>الموقع</th>
                  <td className='text-center'>{t(foodDonation.location)}</td>
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

        <Grid className='text-center'>
          <DonationManagementToolbar currentId={currentId} currentRole={currentRole} currentUserId={currentUserId}
            deleteDonation={this.deleteDonation} donationId={params.id} donorId={foodDonation.donorId}
            onUpdate={this.getDonation.bind(this)} reservation={reservation} />
        </Grid>
      </section>
    );
  }

  private getDonation() {
    const {params} = this.props;

    database.getDonation('food', params.id).then(({donation, donor, reservation}) => {
      this.setState({foodDonation: donation, donor, reservation});
    });
  }

  private deleteDonation(id: string) {
    database.removeDonation('food', id).then(function() {
      hashHistory.push('/donations');
    });
  }
}
