/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import { Breadcrumb, Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import { fetchActivity } from '../actions/index';
import ActivityPanel from '../components/ActivityPanel';
import EmailLink from '../components/EmailLink';
import IActivity from '../types/IActivity';
import IRegularUser from '../types/IRegularUser';
import PhoneLink from '../components/PhoneLink';
import PhotoPanel from '../components/PhotoPanel';
import Progressbar from '../components/Progressbar';

interface IUserProps {
  actions: any;
  activity: IActivity[];
  params: { id: string };
}

interface IUserState {
  user: IRegularUser;
}

class User extends React.Component<IUserProps, IUserState> {
  private bindAsObject: Function;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { user: null as IRegularUser };
  }

  componentDidMount() {
    const {params} = this.props;
    this.bindAsObject(firebase.database().ref(`users/${params.id}`), 'user', (error: Error) => {
      console.log(error);
      hashHistory.push('/404');
    });
  }
  componentWillMount() {
    this.props.actions.fetchActivity();
  }

  render() {
    const {activity} = this.props;
    const {user} = this.state;

    // hack
    if (user && user['.value'] === null) {
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

        <Progressbar data={user}>
          <Panel header='بيانات المستخدم' bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>الاسم</th>
                  <td className='text-center'>{user && user.displayName}</td>
                </tr>
                <tr>
                  <th className='text-center'>الجوال/الواتساب</th>
                  <td className='text-center'><PhoneLink phone={user && user.phone} /></td>
                </tr>
                <tr>
                  <th className='text-center'>الإيميل</th>
                  <td className='text-center'><EmailLink email={user && user.email} /></td>
                </tr>
              </tbody>
            </Table>
          </Panel>

          <PhotoPanel header='صورة المستخدم' photoUrl={user && user.photoURL} />
        </Progressbar>

        <ActivityPanel activity={activity} />
      </Grid>
    </section>);
  }
}

reactMixin(User.prototype, ReactFireMixin);

function mapStateToProps({activity}: any) {
  return activity;
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchActivity }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
