/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Button, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as auth from '../auth';
import * as database from '../database';
import MockMap from '../components/MockMap';

interface INewOtherDonationProps {}

interface INewOtherDonationState {
  donationType: string;
  notes: string;
  donationState: string;
  phone: string;
}

export default class NewOtherDonation extends React.Component<INewOtherDonationProps, INewOtherDonationState> {
  static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donationType: 'appliances',
      notes: '',
      donationState: 'good',
      phone: ''
    };
  }

  render() {
    const {currentUserId} = this.context;
    const donatePhrase = currentUserId ? 'تبرع' : 'سجل دخول و تبرع';

    return (
      <section>
        <PageHeader className='text-center'>تبرع بشيء آخر</PageHeader>

        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>تبرع بشيء آخر</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId='donationType' dir='rtl'>
              <ControlLabel>نوع التبرع</ControlLabel>
              <FormControl componentClass='select' value={this.state.donationType} onChange={this.handleOnChange('donationType').bind(this)}>
                <option value='appliances'>أجهزة كهربائية</option>
                <option value='clothes'>ملابس</option>
                <option value='toys'>ألعاب</option>
                <option value='other'>آخر</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='donationState' dir='rtl'>
              <ControlLabel>حالة التبرع</ControlLabel>
              <FormControl componentClass='select' value={this.state.donationState} onChange={this.handleOnChange('donationState').bind(this)}>
                <option value='excellent'>ممتازة</option>
                <option value='good'>جيدة</option>
                <option value='fair'>لا بأس بها</option>
                <option value='bad'>سيئة</option>
              </FormControl>
            </FormGroup>

            <FormGroup validationState={this.validateRequired(this.state.phone)}>
              <InputGroup>
                <FormControl type='tel' dir='ltr' value={this.state.phone} onChange={this.handleOnChange('phone').bind(this)} required />
                <InputGroup.Addon>الجوال/الواتساب</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='foodDonationFoodPhotos' dir='rtl'>
              <ControlLabel>الصور</ControlLabel>
              <FormControl type='file' placeholder='الصور' />
            </FormGroup>

            <FormGroup controlId='foodDonationNotes' dir='rtl'>
              <ControlLabel>ملاحظات</ControlLabel>
              <FormControl componentClass='textarea' placeholder='ملاحظات' value={this.state.notes} onChange={this.handleOnChange('notes').bind(this)} />
            </FormGroup>

            <FormGroup controlId='foodDonationLocation' dir='rtl'>
              <ControlLabel>الموقع</ControlLabel>
              <MockMap />
            </FormGroup>

            <Button type='submit' bsStyle='success' bsSize='lg' block>{donatePhrase}</Button>
          </Form>
        </Grid>
      </section>
    );
  }

  private handleSubmit(event: any) {
    const {currentUserId} = this.context;

    const helper = (donorId: string) => {
      const {donationType, notes, donationState, phone} = this.state;
      const nonfoodDonation = {donationType, notes, donationState, phone, donorId};

      database.createDonation('nonfood', nonfoodDonation).then((newDonationKey) => {
        hashHistory.push(`/donations/other/${newDonationKey}`);
      });
    };

    event.preventDefault();

    if (currentUserId) {
      helper(currentUserId);
    } else {
      auth.login().then(currentUser => helper(currentUser.uid));
    }
  }

  private handleOnChange(fieldName: string) {
    return ((event: any) => {
      this.setState({[fieldName]: event.target.value});
    });
  }

  private validateRequired(value: string) {
    if (value) {
      return null;
    } else {
      return 'error';
    }
  }
}
