/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader, Panel, Table} from 'react-bootstrap';

import t from '../translate';

interface IFoodDonationProps {
  params: {id: string};
};

interface IFoodDonationState {
  donor: Object;
  foodDonation: Object;
};

class FoodDonation extends React.Component<IFoodDonationProps, IFoodDonationState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      foodDonation: {}
    };
  }

  componentWillMount() {
    firebase.database().ref(`foodDonations/${this.props.params.id}`).once('value').then((snapshot) => {
      const foodDonation = snapshot.val();
      this.setState({foodDonation});
      return firebase.database().ref(`users/${foodDonation.donorId}`).once('value');
    }).then((snapshot) => {
      this.setState({donor: snapshot.val() || {}});
    });
  }

  render() {
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
              </tbody>
            </Table>
          </Panel>

          <Panel header='بيانات المتبرع' bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>الاسم</th>
                  <td className='text-center'>{donor.displayName}</td>
                </tr>
                <tr>
                  <th className='text-center'>الجوال/الواتساب</th>
                  <td className='text-center'>{foodDonation.phone}</td>
                </tr>
                <tr>
                  <th className='text-center'>الإيميل</th>
                  <td className='text-center'>{donor.email}</td>
                </tr>
              </tbody>
            </Table>
          </Panel>
        </Grid>

        <hr />

        <Grid>
          <iframe
            width='100%'
            height='250em'
            frameBorder='0' style={{ border: 0 }}
            src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDzwYGquiVtVevyr4YS9hYc5F_IeI9Qhbc&q=Huraymila'
            allowFullScreen>
          </iframe>
        </Grid>

        <hr />

        <Grid className='text-center'>
          <ButtonGroup>
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' disabled>حجز</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }
}

reactMixin(FoodDonation.prototype, ReactFireMixin);

export default FoodDonation;
