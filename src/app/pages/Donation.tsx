/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import {Button, ButtonGroup, Grid, PageHeader, Panel, Table} from 'react-bootstrap';

interface IDonationProps {
  params: Object;
};

interface IDonationState {
  foodDonation: Object;
};

class Donation extends React.Component<IDonationProps, IDonationState> {
  static propTypes = {
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      foodDonation: []
    };
  }

  componentWillMount() {
    this.bindAsObject(firebase.database().ref(`foodDonations/${this.props.params.id}`), 'foodDonation');
  }

  getFoodTypeLabel(foodType: string) {
    const LABELS = {
      fruits: 'فواكه',
      other: 'آخر',
      vegetables: 'خضار'
    };

    return LABELS[foodType];
  }

  getOccasionLabel(occasion: string) {
    const LABELS = {
      buffet: 'بوفيه مفتوح',
      other: 'آخر',
      party: 'حفلة',
      wedding: 'زواج'
    };

    return LABELS[occasion];
  }

  render() {
    const {foodDonation} = this.state;
    console.log(this.state);

    return (
      <section>
        <PageHeader className='text-center'>تبرع طعام</PageHeader>

        <Grid>
          <Panel header='بيانات التبرع' footer={foodDonation.notes} bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>النوع</th>
                  <td className='text-center'>{this.getFoodTypeLabel(foodDonation.foodType)}</td>
                </tr>
                <tr>
                  <th className='text-center'>المناسبة</th>
                  <td className='text-center'>{this.getOccasionLabel(foodDonation.occasion)}</td>
                </tr>
                <tr>
                  <th className='text-center'>الأطباق</th>
                  <td className='text-center'>{foodDonation.dishes}</td>
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

reactMixin(Donation.prototype, ReactFireMixin);

export default Donation;
