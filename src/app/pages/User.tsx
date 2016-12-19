/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import { Breadcrumb, Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import ActivityPanel from '../components/ActivityPanel';
import * as database from '../database';
import IActivity from '../types/IActivity';
import IRegularUser from '../types/IRegularUser';

interface IUserProps {
  params: { id: string };
}

interface IUserState {
  activity: IActivity[];
  user: IRegularUser;
}

export default class User extends React.Component<IUserProps, IUserState> {
  private bindAsObject: Function;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { activity: [], user: {} as IRegularUser };
  }

  componentDidMount() {
    const {params} = this.props;
    this.bindAsObject(firebase.database().ref(`users/${params.id}`), 'user', (error: Error) => {
      console.log(error);
      hashHistory.push('/404');
    });

    database.getActivity().then((activity) => {
      const filteredActivity = activity.filter((a) => (a.userRole === 'user' && a.userId === params.id));
      this.setState({ activity: filteredActivity, user: this.state.user });
    });
  }

  render() {
    const {activity, user} = this.state;

    // hack
    if (user['.value'] === null) {
      hashHistory.push('/404');
      return null;
    }

    return (<section>
      <PageHeader className='text-center'>صفحة مستخدم</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>صفحة مستخدم</Breadcrumb.Item>
        </Breadcrumb>

        <Panel header='بيانات المستخدم' bsStyle='primary' className='text-center' collapsible defaultExpanded>
          <Table fill>
            <tbody dir='rtl'>
              <tr>
                <th className='text-center'>الاسم</th>
                <td className='text-center'>{user.displayName}</td>
              </tr>
              <tr>
                <th className='text-center'>الجوال/الواتساب</th>
                <td className='text-center'><a dir='ltr' href={`tel:${user.phone}`}>{user.phone}</a></td>
              </tr>
              <tr>
                <th className='text-center'>الإيميل</th>
                <td className='text-center'><a href={`mailto:${user.email}`} target='_blank'>{user.email}</a></td>
              </tr>
            </tbody>
          </Table>
        </Panel>

        <ActivityPanel activity={activity} />
      </Grid>
    </section>);
  }
}

reactMixin(User.prototype, ReactFireMixin);
