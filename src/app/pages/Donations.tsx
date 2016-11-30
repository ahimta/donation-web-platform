/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader, Table} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

interface IDonationsProps {
};

interface IDonationsState {
  foodDonations: Object[];
};

class Donations extends React.Component<IDonationsProps, IDonationsState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      foodDonations: []
    };
  }

  componentWillMount() {
    this.bindAsArray(firebase.database().ref('foodDonations'), 'foodDonations');
  }

  getFoodTypeLabel(foodType: string) {
    const LABELS = {
      fruits: 'فواكه',
      misc: 'منوع',
      vegetables: 'خضار'
    };

    return LABELS[foodType];
  }

  render() {
    const FoodDonations = this.state.foodDonations.map(foodDonation => (
      <tr key={foodDonation['.key']}>
        <td className='text-center'>طعام</td>
        <td className='text-center'>{this.getFoodTypeLabel(foodDonation.foodType)}</td>
        <td className='text-center'>متوفر</td>
        <td className='text-center'>
          <ButtonGroup bsSize='sm'>
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' href={`#/donations/${foodDonation['.key']}`}>عرض</Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <section>
        <PageHeader className='text-center'>التبرعات</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item active>التبرعات</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>
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

        <Grid>
          <Table dir='rtl' responsive bordered striped>
            <thead>
              <tr>
                <th className='text-center'>الفئة</th>
                <th className='text-center'>النوع</th>
                <th className='text-center'>الحالة</th>
                <th className='text-center'>إدارة</th>
              </tr>
            </thead>
            <tbody>
              {FoodDonations}
            </tbody>
          </Table>
        </Grid>

        <Grid className='text-center'>
          <ButtonGroup bsSize='lg'>
            <Button bsStyle='success' href='#/donations/donate/other' disabled>تبرع بشيء آخر</Button>
            <Button bsStyle='success' href='#/donations/donate/food'>تبرع بطعام</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }
}

reactMixin(Donations.prototype, ReactFireMixin);

export default Donations;
