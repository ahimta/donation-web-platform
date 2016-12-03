/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader, Panel, Table} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';
import t from '../translate';
import MockMap from '../components/MockMap';
import UserInfoPanel from '../components/UserInfoPanel';

interface IFoodDonationProps {
  params: {id: string};
}

interface IFoodDonationState {
  donor: Object;
  foodDonation: Object;
}

export default class FoodDonation extends React.Component<IFoodDonationProps, IFoodDonationState> {
  static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      foodDonation: {}
    };
  }

  componentDidMount() {
    firebase.database().ref(`foodDonations/${this.props.params.id}`).once('value').then((snapshot) => {
      const foodDonation = snapshot.val();
      this.setState({foodDonation});
      return firebase.database().ref(`users/${foodDonation.donorId}`).once('value');
    }).then((snapshot) => {
      this.setState({donor: snapshot.val()});
    });
  }

  private deleteDonation(id: string) {
    database.removeFoodDonation(id).then(function() {
      hashHistory.push('/donations');
    });
  }

  render() {
    const {currentUserId} = this.context;
    const {params} = this.props;
    const {donor, foodDonation} = this.state;

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
          <ButtonGroup>
            <Button bsStyle='danger' onClick={this.deleteDonation.bind(null, params.id)} disabled={currentUserId !== foodDonation.donorId}>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' disabled>حجز</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }
}
