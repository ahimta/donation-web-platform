/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Button, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';

interface ICharityLoginProps { }

interface ICharityLoginState {
  readonly email: string;
  readonly password: string;
}

export default class CharityLogin extends React.Component<ICharityLoginProps, ICharityLoginState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = { email: '', password: '' };
  }

  render() {
    return (<section>
      <PageHeader className='text-center'>تسجيل دخول كجمعية</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item href='#/profiles'>الحسابات</Breadcrumb.Item>
          <Breadcrumb.Item active>تسجيل دخول كجمعية</Breadcrumb.Item>
        </Breadcrumb>

        <Form onSubmit={this.handleSubmit.bind(this)}>

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

          <Button type='submit' bsStyle='success' bsSize='lg' block>سجل دخول كجمعية</Button>
        </Form>
      </Grid>
    </section>);
  }

  private handleOnChange(fieldName: string) {
    return (function (event: any) {
      this.setState({ [fieldName]: event.target.value });
    });
  }

  private handleSubmit(event: any) {
    const {email, password} = this.state;

    event.preventDefault();
    auth.loginAsCharity(email, password).then((_) => {
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
