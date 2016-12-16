/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import Calendar from 'rc-calendar';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import * as React from 'react';
import {Breadcrumb, Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader, Row} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as auth from '../auth';
import * as database from '../database';
import * as image from '../image';
import LocationSelectField from '../components/LocationSelectField';
import rcCalendarLocale from '../rc-calendar-locale';

interface INewFoodDonationProps {}

interface INewFoodDonationState {
  dishes: string;
  location: string;
  notes?: string;
  occasion: string;
  phone: string;
  photo?: File;
  pickupDatetime: any;
  type: string;
  uploading: boolean;
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
      location: 'riyadh',
      notes: '',
      occasion: 'party',
      phone: '',
      photo: null,
      pickupDatetime: moment(),
      type: 'fruits',
      uploading: false
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
              <FormControl componentClass='select' value={this.state.type} onChange={this.handleOnChange('type').bind(this)}>
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

            <FormGroup validationState={this.validateRequired(this.state.phone)}>
              <InputGroup>
                <FormControl type='tel' dir='ltr' value={this.state.phone} onChange={this.handleOnChange('phone').bind(this)} required />
                <InputGroup.Addon>الجوال/الواتساب</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <FormControl type='text' dir='rtl' value={this.state.dishes} onChange={this.handleOnChange('dishes').bind(this)} />
                <InputGroup.Addon>الأطباق</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='pickupTime' dir='rtl'>
              <ControlLabel>وقت الاستلام</ControlLabel>
              <div dir='ltr'>
                <Calendar locale={rcCalendarLocale} onChange={this.onDatetimeChange.bind(this, 'pickupDatetime')}
                  showDateInput={true} style={{width: '100%'}} value={this.state.pickupDatetime}
                  timePicker={<TimePickerPanel showHour={true} showMinute={true} showSecond={true} />}/>
              </div>
            </FormGroup>

            <FormGroup controlId='foodDonationFoodPhotos' dir='rtl'>
              <ControlLabel>صورة للتبرع</ControlLabel>
              <FormControl accept='image/*' onChange={this.handleOnFileChange.bind(this, 'photo')} type='file' />
            </FormGroup>

            <FormGroup controlId='foodDonationNotes' dir='rtl'>
              <ControlLabel>ملاحظات</ControlLabel>
              <FormControl componentClass='textarea' placeholder='ملاحظات' value={this.state.notes} onChange={this.handleOnChange('notes').bind(this)} />
            </FormGroup>

            <Button bsSize='lg' bsStyle='success' disabled={this.state.uploading} type='submit' block>{donatePhrase}</Button>
          </Form>
        </Grid>
      </section>
    );
  }

  private handleOnFileChange(fieldName: string, event: any) {
    const fileInput: HTMLInputElement = event.target;
    const file: File = fileInput.files[0];
    this.setState({photo: file});
  }

  private onDatetimeChange(fieldName: string, momentValue: any) {
    this.setState({[fieldName]: momentValue});
  }

  private handleSubmit(event: any) {
    const {currentUserId} = this.context;

    const helper = (donorId: string) => {
      const {dishes, location, notes, occasion, phone, photo, pickupDatetime, type} = this.state;

      this.setState({uploading: true});
      image.upload(photo).then(({url}) => {
        const foodDonation = {dishes, donorId, location, notes, occasion, phone, photoUrl: url, pickupDatetime: pickupDatetime.toObject(), type};
        return database.createDonation('food', foodDonation).then((newDonationKey) => {
          hashHistory.push(`/donations/food/${newDonationKey}`);
        });
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
