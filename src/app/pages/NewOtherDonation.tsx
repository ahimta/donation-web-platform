/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader, Row} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import {hashHistory} from 'react-router';
import ReactFireMixin from 'reactfire';

interface INewOtherDonationProps {
};

interface INewOtherDonationState {
  donationType: string;
  notes: string;
  donationState: string;
  phone: string;
  user: Object;
};

class NewOtherDonation extends React.Component<INewOtherDonationProps, INewOtherDonationState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donationType: 'appliances',
      notes: '',
      donationState: 'good',
      phone: '',
      user: null
    };
  }

  componentWillMount() {
    this.bindAsArray(firebase.database().ref('otherDonations'), 'donations');

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({user});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(event: any) {
    const {donationType, notes, donationState, phone, user} = this.state;
    const donorId = user ? user.uid : null;
    const foodDonation = {donationType, notes, donationState, phone, donorId};

    event.preventDefault();
    this.firebaseRefs.donations.push(foodDonation);
    hashHistory.push('/donations');
  }

  handleOnChange(fieldName: string) {
    return (function(event: any) {
      this.setState({[fieldName]: event.target.value});
    });
  }

  validateRequired(value: string) {
    if (value) {
      return null;
    } else {
      return 'error';
    }
  }

  render() {
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
              <iframe
                width='100%'
                height='250em'
                frameBorder='0' style={{ border: 0 }}
                src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDzwYGquiVtVevyr4YS9hYc5F_IeI9Qhbc&q=Huraymila'
                allowFullScreen>
              </iframe>
            </FormGroup>

            <Button type='submit' bsStyle='success' bsSize='lg' block>تبرع</Button>
          </Form>
        </Grid>
      </section>
    );
  }
}

reactMixin(NewOtherDonation.prototype, ReactFireMixin);

export default NewOtherDonation;
