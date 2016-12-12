/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Button, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as auth from '../auth';
import * as database from '../database';
import LocationSelectField from '../components/LocationSelectField';

interface INewNonfoodDonationProps {}

interface INewNonfoodDonationState {
  type: string;
  location: string;
  notes: string;
  state: string;
  phone: string;
}

export default class NewNonfoodDonation extends React.Component<INewNonfoodDonationProps, INewNonfoodDonationState> {
  public static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  public context: {
    currentUserId: string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      type: 'appliances',
      location: 'riyadh',
      notes: '',
      state: 'good',
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
            <FormGroup controlId='type' dir='rtl'>
              <ControlLabel>نوع التبرع</ControlLabel>
              <FormControl componentClass='select' value={this.state.type} onChange={this.handleOnChange('type').bind(this)}>
                <option value='appliances'>أجهزة كهربائية</option>
                <option value='clothes'>ملابس</option>
                <option value='toys'>ألعاب</option>
                <option value='other'>آخر</option>
              </FormControl>
            </FormGroup>

            <LocationSelectField onChange={this.handleOnChange('location').bind(this)} value={this.state.location} />

            <FormGroup controlId='state' dir='rtl'>
              <ControlLabel>حالة التبرع</ControlLabel>
              <FormControl componentClass='select' value={this.state.state} onChange={this.handleOnChange('state').bind(this)}>
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

            <Button type='submit' bsStyle='success' bsSize='lg' block>{donatePhrase}</Button>
          </Form>
        </Grid>
      </section>
    );
  }

  private handleSubmit(event: any) {
    const {currentUserId} = this.context;

    const helper = (donorId: string) => {
      const {type, location, notes, state, phone} = this.state;
      const nonfoodDonation = {type, location, notes, state, phone, donorId};

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
