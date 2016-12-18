/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import Calendar from 'rc-calendar';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import * as React from 'react';
import { Breadcrumb, Button, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader } from 'react-bootstrap';

import LocationSelectField from '../components/LocationSelectField';
import NewDonationPage from '../components/NewDonationPage';
import rcCalendarLocale from '../rc-calendar-locale';

import DonationType from '../types/DonationType';
import IFoodDonation from '../types/IFoodDonation';
import INewDonationPage from '../types/INewDonationPage';

interface INewFoodDonationProps {
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

interface INewFoodDonationState {
  readonly dishes: string;
  readonly occasion: string;
  readonly pickupDatetime: any;
  readonly type: string;
}

class NewFoodDonation extends React.Component<INewFoodDonationProps, INewFoodDonationState> implements INewDonationPage {
  static propTypes = {
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

  donationType: DonationType = 'food';

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { dishes: '', occasion: 'party', pickupDatetime: moment(), type: 'fruits' };
  }

  getDonation(): IFoodDonation {
    const {location, notes, phone} = this.props;
    const {dishes, occasion, pickupDatetime, type} = this.state;
    const donation = { dishes, location, notes, occasion, phone, pickupDatetime: pickupDatetime.toObject(), type };

    return donation;
  }

  render() {
    const {currentUserId, location, notes, phone, uploading} = this.props;
    const {handleChange, handlePhotoChange, handleSubmit, validateRequired} = this.props;
    const {dishes, occasion, pickupDatetime, type} = this.state;
    const donatePhrase = currentUserId ? 'تبرع' : 'سجل دخول و تبرع';

    return (<section>
      <PageHeader className='text-center'>تبرع بطعام</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
          <Breadcrumb.Item active>تبرع بطعام</Breadcrumb.Item>
        </Breadcrumb>

        <Form onSubmit={handleSubmit}>
          <FormGroup controlId='foodDonationFoodType' dir='rtl'>
            <ControlLabel>نوع الطعام</ControlLabel>
            <FormControl componentClass='select' value={type} onChange={this.handleOnChange('type').bind(this)}>
              <option value='fruits'>فواكه</option>
              <option value='vegetables'>خضار</option>
              <option value='misc'>منوع</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId='foodDonationOccasion' dir='rtl'>
            <ControlLabel>المناسبة</ControlLabel>
            <FormControl componentClass='select' value={occasion} onChange={this.handleOnChange('occasion').bind(this)}>
              <option value='party'>حفلة</option>
              <option value='wedding'>زواج</option>
              <option value='buffet'>بوفيه مفتوح</option>
              <option value='other'>آخر</option>
            </FormControl>
          </FormGroup>

          <LocationSelectField onChange={handleChange('location')} value={location} />

          <FormGroup validationState={validateRequired(phone)}>
            <InputGroup>
              <FormControl type='tel' dir='ltr' value={phone} onChange={handleChange('phone')} required />
              <InputGroup.Addon>الجوال/الواتساب</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <FormControl type='text' dir='rtl' value={dishes} onChange={this.handleOnChange('dishes').bind(this)} />
              <InputGroup.Addon>الأطباق</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup controlId='pickupTime' dir='rtl'>
            <ControlLabel>وقت الاستلام</ControlLabel>
            <div dir='ltr'>
              <Calendar locale={rcCalendarLocale} onChange={this.handleDatetimeChange}
                showDateInput={true} style={{ width: '100%' }} value={pickupDatetime}
                timePicker={<TimePickerPanel showHour={true} showMinute={true} showSecond={true} />} />
            </div>
          </FormGroup>

          <FormGroup controlId='foodDonationFoodPhotos' dir='rtl'>
            <ControlLabel>صورة للتبرع</ControlLabel>
            <FormControl accept='image/*' onChange={handlePhotoChange} type='file' />
          </FormGroup>

          <FormGroup controlId='foodDonationNotes' dir='rtl'>
            <ControlLabel>ملاحظات</ControlLabel>
            <FormControl componentClass='textarea' placeholder='ملاحظات' value={notes} onChange={handleChange('notes')} />
          </FormGroup>

          <Button bsSize='lg' bsStyle='success' disabled={uploading} type='submit' block>{donatePhrase}</Button>
        </Form>
      </Grid>
    </section>);
  }

  private handleDatetimeChange(momentValue: any) {
    this.setState({ pickupDatetime: momentValue } as INewFoodDonationState);
  }

  private handleOnChange(fieldName: string) {
    return (event: any) => {
      this.setState({ [fieldName]: event.target.value } as INewFoodDonationState);
    };
  }
}

export default NewDonationPage(NewFoodDonation);
