/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import { fetchActivity, fetchCharity } from '../actions/index';
import ActivityPanel from '../components/ActivityPanel';
import EmailLink from '../components/EmailLink';
import IActivity from '../types/IActivity';
import ICharity from '../types/ICharity';
import PhoneLink from '../components/PhoneLink';
import PhotoPanel from '../components/PhotoPanel';
import Progressbar from '../components/Progressbar';
import RegisterAsCharityButton from '../components/RegisterAsCharityButton';
import t from '../translate';
import UserRole from '../types/UserRole';

function mapStateToProps({activity, charity, currentUser}: any) {
  return {
    activity: activity.activity,
    charity: charity.charity,
    currentRole: currentUser.role,
    errorCode: charity.errorCode
  };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchActivity, fetchCharity }, dispatch) };
}

interface ICharityProps {
  readonly actions: any;
  readonly activity: IActivity[];
  readonly charity: ICharity;
  readonly currentRole: UserRole;
  readonly errorCode: number;
  readonly params: { id: string };
}

interface ICharityState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class Charity extends React.Component<ICharityProps, ICharityState> {
  componentWillMount() {
    const {actions, params} = this.props;
    actions.fetchActivity('charity', params.id);
    actions.fetchCharity(params.id);
  }

  render() {
    const {activity, charity, currentRole, errorCode} = this.props;

    // hack
    if (errorCode) {
      hashHistory.push('/404');
      return null;
    }

    return (<section>
      <PageHeader className='text-center'>صفحة جمعية</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item href='#/charities'>الجمعيات</Breadcrumb.Item>
          <Breadcrumb.Item active>صفحة جمعية</Breadcrumb.Item>
        </Breadcrumb>

        <Progressbar data={charity}>
          <Panel header='بيانات الجمعية' footer={charity && charity.description}
            bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>الاسم</th>
                  <td className='text-center'>{charity && charity.name}</td>
                </tr>
                <tr>
                  <th className='text-center'>الموقع</th>
                  <td className='text-center'>{t(charity && charity.location)}</td>
                </tr>
                <tr>
                  <th className='text-center'>الجوال/الواتساب</th>
                  <td className='text-center'><PhoneLink phone={charity && charity.phone} /></td>
                </tr>
                <tr>
                  <th className='text-center'>الإيميل</th>
                  <td className='text-center'><EmailLink email={charity && charity.email} /></td>
                </tr>
                <tr className={charity && charity.website ? '' : 'hidden'}>
                  <th className='text-center'>الموقع الرسمي</th>
                  <td className='text-center'><a dir='ltr' href={charity && charity.website} target='_blank'>{charity && charity.website}</a></td>
                </tr>
              </tbody>
            </Table>
          </Panel>

          <PhotoPanel header='شعار الجمعية' photoUrl={charity && charity.photoUrl} />
        </Progressbar>

        <RegisterAsCharityButton userRole={currentRole} margin />
        <ActivityPanel activity={activity} hideUser />
      </Grid>
    </section>);
  }
}
