/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import { Breadcrumb, Grid, PageHeader, Panel, Table } from 'react-bootstrap';
import reactMixin from 'react-mixin';
import { hashHistory } from 'react-router';
import ReactFireMixin from 'reactfire';

import ActivityPanel from '../components/ActivityPanel';
import * as database from '../database';
import IActivity from '../types/IActivity';
import t from '../translate';

interface ICharityProps {
  readonly params: { id: string };
}

interface ICharityState {
  readonly activity: IActivity[];
  readonly charity: any;
}

export default class Charity extends React.Component<ICharityProps, ICharityState> {
  private bindAsObject: Function;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { activity: [], charity: {} };
  }

  componentDidMount() {
    const {id} = this.props.params;
    this.bindAsObject(firebase.database().ref(`charities/${id}`), 'charity');

    database.getActivity().then((activity) => {
      const filteredActivity = activity.filter((a) => (a.userRole === 'charity' && a.userId === id));
      this.setState({ activity: filteredActivity, charity: this.state.charity } as ICharityState);
    });
  }

  render() {
    const {activity, charity} = this.state;

    if (charity['.value'] === null) {
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

        <Panel header='بيانات الجمعية' footer={charity.description}
          bsStyle='primary' className='text-center' collapsible defaultExpanded>
          <Table fill>
            <tbody dir='rtl'>
              <tr>
                <th className='text-center'>الاسم</th>
                <td className='text-center'>{charity.name}</td>
              </tr>
              <tr>
                <th className='text-center'>الموقع</th>
                <td className='text-center'>{t(charity.location)}</td>
              </tr>
              <tr>
                <th className='text-center'>الجوال/الواتساب</th>
                <td className='text-center'><a dir='ltr' href={`tel:${charity.phone}`}>{charity.phone}</a></td>
              </tr>
              <tr>
                <th className='text-center'>الإيميل</th>
                <td className='text-center'><a href={`mailto:${charity.email}`} target='_blank'>{charity.email}</a></td>
              </tr>
              <tr>
                <th className='text-center'>الموقع الرسمي</th>
                <td className='text-center'><a href={charity.website} target='_blank'>{charity.website}</a></td>
              </tr>
            </tbody>
          </Table>
        </Panel>

        <ActivityPanel activity={activity} />
      </Grid>
    </section>);
  }
}

reactMixin(Charity.prototype, ReactFireMixin);
