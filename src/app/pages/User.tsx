/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import { fetchActivity, fetchUser } from '../actions/index';
import ActivityPanel from '../components/ActivityPanel';
import EmailLink from '../components/EmailLink';
import { redirectToErrorPage } from '../errorHandling';
import IActivity from '../types/IActivity';
import IRegularUser from '../types/IRegularUser';
import PhoneLink from '../components/PhoneLink';
import PhotoPanel from '../components/PhotoPanel';
import Progressbar from '../components/Progressbar';

function mapStateToProps({activity, user}: any) {
  return { activity: activity.activity, errorCode: user.errorCode, user: user.user };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchActivity, fetchUser }, dispatch) };
}

interface IUserProps {
  actions: any;
  activity: IActivity[];
  errorCode?: number;
  params: { id: string };
  user?: IRegularUser;
}

interface IUserState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class User extends React.Component<IUserProps, IUserState> {
  componentWillMount() {
    const {actions, params} = this.props;

    actions.fetchActivity(params.id);
    actions.fetchUser(params.id);
  }

  render() {
    const {activity, errorCode, user} = this.props;

    // hack
    if (errorCode) {
      redirectToErrorPage();
      return null;
    }

    return (<section>
      <PageHeader className='text-center'>صفحة مستخدم</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>صفحة مستخدم</Breadcrumb.Item>
        </Breadcrumb>

        <Progressbar data={user}>
          <Panel header='بيانات المستخدم' bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>الاسم</th>
                  <td className='text-center'>{user && user.displayName}</td>
                </tr>
                <tr>
                  <th className='text-center'>الإيميل</th>
                  <td className='text-center'><EmailLink email={user && user.email} /></td>
                </tr>
                <tr className={(user && user.phone) ? '' : 'hidden'}>
                  <th className='text-center'>الجوال/الواتساب</th>
                  <td className='text-center'><PhoneLink phone={user && user.phone} /></td>
                </tr>
              </tbody>
            </Table>
          </Panel>

          <PhotoPanel header='صورة المستخدم' photoUrl={user && user.photoURL} />
        </Progressbar>

        <ActivityPanel activity={activity} hideUser />
      </Grid>
    </section>);
  }
}
