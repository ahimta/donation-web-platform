/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Button, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader } from 'react-bootstrap';

import LocationSelectField from '../components/LocationSelectField';
import NewDonationPage from '../components/NewDonationPage';

import DonationType from '../types/DonationType';
import INewDonationPage from '../types/INewDonationPage';

interface INewNonfoodDonationProps {
  readonly currentUserId: string;
  readonly location: string;
  readonly notes: string;
  readonly phone: string;
  readonly uploading: boolean;

  readonly handleChange: (fieldName: string) => ((event: any) => void);
  readonly handlePhotoChange: (event: any) => void;
  readonly handleSubmit: (event: any) => void;
  readonly validateRequired: (fieldValue: string) => string;
}

interface INewNonfoodDonationState {
  readonly state: string;
  readonly type: string;
}

class NewNonfoodDonation extends React.Component<INewNonfoodDonationProps, INewNonfoodDonationState> implements INewDonationPage {
  public static propTypes = {
    currentUserId: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    notes: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    uploading: React.PropTypes.bool.isRequired,

    handleChange: React.PropTypes.func.isRequired,
    handlePhotoChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    validateRequired: React.PropTypes.func.isRequired,
  };

  public donationType: DonationType = 'nonfood';

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      state: 'good',
      type: 'appliances'
    };
  }

  getDonation() {
    const {location, notes, phone} = this.props;
    const {state, type} = this.state;
    const donation = {location, notes, phone, state, type};

    return donation;
  }

  render() {
    const {currentUserId, location, notes, phone, uploading} = this.props;
    const {handleChange, handlePhotoChange, handleSubmit, validateRequired} = this.props;
    const {state, type} = this.state;
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
          <Form onSubmit={handleSubmit}>
            <FormGroup controlId='type' dir='rtl'>
              <ControlLabel>نوع التبرع</ControlLabel>
              <FormControl componentClass='select' value={type} onChange={this.handleOnChange('type').bind(this)}>
                <option value='appliances'>أجهزة كهربائية</option>
                <option value='clothes'>ملابس</option>
                <option value='toys'>ألعاب</option>
                <option value='other'>آخر</option>
              </FormControl>
            </FormGroup>

            <LocationSelectField onChange={handleChange('location')} value={location} />

            <FormGroup controlId='state' dir='rtl'>
              <ControlLabel>حالة التبرع</ControlLabel>
              <FormControl componentClass='select' value={state} onChange={this.handleOnChange('state').bind(this)}>
                <option value='excellent'>ممتازة</option>
                <option value='good'>جيدة</option>
                <option value='fair'>لا بأس بها</option>
                <option value='bad'>سيئة</option>
              </FormControl>
            </FormGroup>

            <FormGroup validationState={validateRequired(phone)}>
              <InputGroup>
                <FormControl type='tel' dir='ltr' value={phone} onChange={handleChange('phone')} required />
                <InputGroup.Addon>الجوال/الواتساب</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='foodDonationFoodPhotos' dir='rtl'>
              <ControlLabel>صورة للتبرع</ControlLabel>
              <FormControl onChange={handlePhotoChange} placeholder='صورة للتبرع' type='file' />
            </FormGroup>

            <FormGroup controlId='foodDonationNotes' dir='rtl'>
              <ControlLabel>ملاحظات</ControlLabel>
              <FormControl componentClass='textarea' placeholder='ملاحظات' value={notes} onChange={handleChange('notes')} />
            </FormGroup>

            <Button bsSize='lg' bsStyle='success' disabled={uploading} type='submit' block>{donatePhrase}</Button>
          </Form>
        </Grid>
      </section>
    );
  }

  private handleOnChange(fieldName: string) {
    return (event: any) => {
      this.setState({ [fieldName]: event.target.value } as INewNonfoodDonationState);
    };
  }
}

export default NewDonationPage(NewNonfoodDonation);
