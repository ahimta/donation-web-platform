/// <reference path="../../../typings/index.d.ts" />

import * as Immutable from 'immutable';
import * as React from 'react';
import { Breadcrumb, Button, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';
import ICharity from '../types/ICharity';
import * as image from '../image';
import LocationSelectField from '../components/LocationSelectField';
import PhotoInputGroup from '../components/PhotoInputGroup';

interface ICharityRegisterProps { }
type ICharityRegisterState = ICharity & {
  readonly photo: File;
  readonly uploading: boolean;
};

export default class CharityRegister extends React.Component<ICharityRegisterProps, ICharityRegisterState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      description: '',
      email: '',
      photo: null,
      location: 'riyadh',
      name: '',
      password: '',
      phone: '',
      uploading: false,
      website: ''
    };
  }

  render() {
    return (<section>
      <PageHeader className='text-center'>تسجيل كجمعية</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item href='#/charities'>الجمعيات</Breadcrumb.Item>
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

          <PhotoInputGroup handlePhotoChange={this.handlePhotoChange.bind(this)} label='شعار الجمعية' />

          <LocationSelectField onChange={this.handleOnChange('location').bind(this)} value={this.state.location} />

          <FormGroup controlId='charityDescription' dir='rtl'>
            <ControlLabel>عن الجمعية</ControlLabel>
            <FormControl componentClass='textarea' placeholder='عن الجمعية' value={this.state.description} onChange={this.handleOnChange('description').bind(this)} />
          </FormGroup>

          <Button bsSize='lg' bsStyle='success' disabled={this.state.uploading} type='submit' block>سجل كجمعية</Button>
        </Form>
      </Grid>
    </section>);
  }

  private handleOnChange(fieldName: string) {
    return (event: any) => {
      this.setState({ [fieldName]: event.target.value } as ICharityRegisterState);
    };
  }

  private handlePhotoChange(event: any) {
    const fileInput: HTMLInputElement = event.target;
    const file: File = fileInput.files[0];
    this.setState({ photo: file } as ICharityRegisterState);
  }

  private handleSubmit(event: any) {
    const {photo} = this.state;

    event.preventDefault();
    this.setState({ uploading: true } as ICharityRegisterState);

    image.upload(photo).then(({url}) => {
      const charity: ICharity = Immutable.Map(this.state).merge({ photoUrl: url } as any).toJS();
      return auth.registerCharity(charity).then((_) => {
        hashHistory.push('/donations');
      });
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
