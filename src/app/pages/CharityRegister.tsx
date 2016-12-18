/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Button, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';
import ICharity from '../types/ICharity';
import LocationSelectField from '../components/LocationSelectField';

interface ICharityRegisterProps { }

type ICharityRegisterState = ICharity;

export default class CharityRegister extends React.Component<ICharityRegisterProps, ICharityRegisterState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      description: '',
      email: '',
      location: 'riyadh',
      name: '',
      password: '',
      phone: '',
      website: ''
    };
  }

  render() {
    return (<section>
      <PageHeader className='text-center'>تسجيل كجمعية</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item href='#/profiles'>الحسابات</Breadcrumb.Item>
          <Breadcrumb.Item active>تسجيل كجمعية</Breadcrumb.Item>
        </Breadcrumb>

        <Form onSubmit={this.handleSubmit.bind(this)}>

          <FormGroup validationState={this.validateRequired(this.state.name)}>
            <InputGroup>
              <FormControl type='text' dir='rtl' value={this.state.name} onChange={this.handleOnChange('name').bind(this)} required />
              <InputGroup.Addon>الاسم</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup validationState={this.validateRequired(this.state.phone)}>
            <InputGroup>
              <FormControl type='tel' dir='ltr' value={this.state.phone} onChange={this.handleOnChange('phone').bind(this)} required />
              <InputGroup.Addon>الجوال/الواتساب</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup validationState={this.validateRequired(this.state.email)}>
            <InputGroup>
              <FormControl type='email' dir='ltr' value={this.state.email} onChange={this.handleOnChange('email').bind(this)} required />
              <InputGroup.Addon>الإيميل</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup validationState={this.validateRequired(this.state.password)}>
            <InputGroup>
              <FormControl type='password' dir='rtl' value={this.state.password} onChange={this.handleOnChange('password').bind(this)} required />
              <InputGroup.Addon>كلمة المرور</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <FormControl type='url' dir='ltr' value={this.state.website} onChange={this.handleOnChange('website').bind(this)}
                placeholder='https://google.com' />
              <InputGroup.Addon>الموقع الرسمي</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup controlId='foodDonationFoodPhotos' dir='rtl'>
            <ControlLabel>شعار الجمعية</ControlLabel>
            <FormControl type='file' placeholder='شعار الجمعية' />
          </FormGroup>

          <LocationSelectField onChange={this.handleOnChange('location').bind(this)} value={this.state.location} />

          <FormGroup controlId='foodDonationNotes' dir='rtl'>
            <ControlLabel>عن الجمعية</ControlLabel>
            <FormControl componentClass='textarea' placeholder='عن الجمعية' value={this.state.description} onChange={this.handleOnChange('description').bind(this)} />
          </FormGroup>

          <Button type='submit' bsStyle='success' bsSize='lg' block>سجل كجمعية</Button>
        </Form>
      </Grid>
    </section>);
  }

  private handleOnChange(fieldName: string) {
    return (event: any) => {
      this.setState({ [fieldName]: event.target.value } as ICharityRegisterState);
    };
  }

  private handleSubmit(event: any) {
    event.preventDefault();
    auth.registerCharity(this.state).then((_) => {
      hashHistory.push('/donations');
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
