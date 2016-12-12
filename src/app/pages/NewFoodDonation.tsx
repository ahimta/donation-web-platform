/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader, Row} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as auth from '../auth';
import * as database from '../database';
import LocationSelectField from '../components/LocationSelectField';

interface INewFoodDonationProps {}

interface INewFoodDonationState {
  dishes: string;
  foodType: string;
  location: string;
  notes: string;
  occasion: string;
  phone: string;
}

export default class NewFoodDonation extends React.Component<INewFoodDonationProps, INewFoodDonationState> {
  public static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  public context: {
    currentUserId: string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      dishes: '',
      foodType: 'fruits',
      location: 'riyadh',
      notes: '',
      occasion: 'party',
      phone: ''
    };
  }

  render() {
    const {currentUserId} = this.context;
    const donatePhrase = currentUserId ? 'تبرع' : 'سجل دخول و تبرع';

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

            <LocationSelectField onChange={this.handleOnChange('location').bind(this)} value={this.state.location} />

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

            <Button type='submit' bsStyle='success' bsSize='lg' block>{donatePhrase}</Button>
          </Form>
        </Grid>
      </section>
    );
  }

  private handleSubmit(event: any) {
    const {currentUserId} = this.context;

    const helper = (donorId: string) => {
      const {dishes, foodType, location, notes, occasion, phone} = this.state;
      const foodDonation = {dishes, foodType, location, notes, occasion, phone, donorId};

      database.createDonation('food', foodDonation).then((newDonationKey) => {
        hashHistory.push(`/donations/food/${newDonationKey}`);
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
    return (function(event: any) {
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
