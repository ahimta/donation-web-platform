/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader, Row} from 'react-bootstrap';
import reactMixin from 'react-mixin';
import {hashHistory} from 'react-router';
import ReactFireMixin from 'reactfire';

interface INewFoodDonationProps {
};

interface INewFoodDonationState {
  dishes: string;
  foodDonations: Object[];
  foodType: string;
  notes: string;
  occasion: string;
  phone: string;
  user: Object;
};

class NewFoodDonation extends React.Component<INewFoodDonationProps, INewFoodDonationState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      dishes: '',
      foodDonations: [],
      foodType: 'fruits',
      notes: '',
      occasion: 'party',
      phone: '',
      user: null
    };
  }

  componentWillMount() {
    this.bindAsArray(firebase.database().ref('foodDonations'), 'foodDonations');

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({user});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(event: any) {
    const {dishes, foodType, notes, occasion, phone, user} = this.state;
    const donorId = user ? user.uid : null;
    const foodDonation = {dishes, foodType, notes, occasion, phone, donorId};

    event.preventDefault();
    this.firebaseRefs.foodDonations.push(foodDonation);
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
        <PageHeader className='text-center'>تبرع بطعام</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>تبرع بطعام</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>
        <Grid>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId='foodDonationFoodType' dir='rtl'>
              <ControlLabel>نوع الطعام</ControlLabel>
              <FormControl componentClass='select' value={this.state.foodType} onChange={this.handleOnChange('foodType').bind(this)}>
                <option value='fruits'>فواكه</option>
                <option value='vegetables'>خضار</option>
                <option value='misc'>منوع</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='foodDonationOccasion' dir='rtl'>
              <ControlLabel>المناسبة</ControlLabel>
              <FormControl componentClass='select' value={this.state.occasion} onChange={this.handleOnChange('occasion').bind(this)}>
                <option value='party'>حفلة</option>
                <option value='wedding'>زواج</option>
                <option value='buffet'>بوفيه مفتوح</option>
                <option value='other'>آخر</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='pickupTime' dir='rtl'>
              <ControlLabel>وقت الاستلام</ControlLabel>
              <Row>
                <Col xs={3}><FormControl type='number' placeholder='الساعة' /></Col>
                <Col xs={3}><FormControl type='number' placeholder='اليوم' /></Col>
                <Col xs={3}><FormControl type='number' placeholder='الشهر' /></Col>
                <Col xs={3}><FormControl type='number' placeholder='السنة' /></Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <FormControl type='text' dir='rtl' value={this.state.dishes} onChange={this.handleOnChange('dishes').bind(this)} />
                <InputGroup.Addon>الأطباق</InputGroup.Addon>
              </InputGroup>
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

reactMixin(NewFoodDonation.prototype, ReactFireMixin);

export default NewFoodDonation;
