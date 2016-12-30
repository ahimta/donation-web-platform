/// <reference path="../../../typings/index.d.ts" />

import classNames from 'classnames';
import * as React from 'react';
import { Alert, Breadcrumb, Button, ButtonGroup, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import * as auth from '../auth';

interface ICharityLoginProps { }

interface ICharityLoginState {
  readonly authError: string;
  readonly email: string;
  readonly password: string;
}

export default class CharityLogin extends React.Component<ICharityLoginProps, ICharityLoginState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = { authError: '', email: '', password: '' };
  }

  render() {
    const {authError, email, password} = this.state;

    return (<section>
      <PageHeader className='text-center'>تسجيل دخول كجمعية</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item href='#/charities'>الجمعيات</Breadcrumb.Item>
          <Breadcrumb.Item active>تسجيل دخول كجمعية</Breadcrumb.Item>
        </Breadcrumb>

        <Alert bsStyle='danger' className={classNames({ hidden: !authError }, 'text-right')} dir='rtl'>
          الإيميل أو كلمة المرور غير صحيحة.
        </Alert>

        <Form onSubmit={this.handleSubmit.bind(this)}>

          <FormGroup validationState={this.validateRequired(email)}>
            <InputGroup>
              <FormControl type='email' dir='ltr' value={email} onChange={this.handleOnChange('email').bind(this)} required />
              <InputGroup.Addon>الإيميل</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <FormGroup validationState={this.validateRequired(password)}>
            <InputGroup>
              <FormControl type='password' dir='rtl' value={password} onChange={this.handleOnChange('password').bind(this)} required />
              <InputGroup.Addon>كلمة المرور</InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <div className='text-center'>
            <ButtonGroup bsSize='lg'>
              <Button bsStyle='success' href={`#/register/charity?email=${email}`}>سجل كجمعية</Button>
              <Button bsStyle='success' type='submit'>سجل دخول</Button>
            </ButtonGroup>
          </div>
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
    }).catch(({code}) => {
      switch (code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.setState({ authError: code } as ICharityLoginState);
          break;

        default:
          console.log(code);
      }
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
