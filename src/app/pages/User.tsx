/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import {Breadcrumb, Grid, PageHeader} from 'react-bootstrap';

import UserInfoPanel from '../components/UserInfoPanel';

interface IUserProps {
  params: {id: string};
}

interface IUserState {
  user: any;
}

export default class User extends React.Component<IUserProps, IUserState> {
  private bindAsObject: Function;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const {params} = this.props;
    this.bindAsObject(firebase.database().ref(`users/${params.id}`), 'user');
  }

  render() {
    const {user} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>صفحة مستخدم</PageHeader>

        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/profiles'>الحسابات</Breadcrumb.Item>
            <Breadcrumb.Item active>صفحة مستخدم</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <UserInfoPanel header='بيانات المستخدم' user={user} hideLink />
        </Grid>
      </section>
    );
  }
}

reactMixin(User.prototype, ReactFireMixin);
