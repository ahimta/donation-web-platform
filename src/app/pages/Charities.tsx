/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Grid, PageHeader, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import { fetchCharities } from '../actions/index';
import ICharity from '../types/ICharity';
import PhoneLink from '../components/PhoneLink';
import Progressbar from '../components/Progressbar';
import RegisterAsCharityButton from '../components/RegisterAsCharityButton';
import ShareButtons from '../components/ShareButtons';
import t from '../translate';
import UserRole from '../types/UserRole';

function mapStateToProps({charities, currentUser}: any) {
  return {charities: charities.charities, currentRole: currentUser.role, errorCode: charities.errorCode};
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchCharities }, dispatch) };
}

interface ICharitiesProps {
  readonly actions: any;
  readonly charities?: ReadonlyArray<ICharity>;
  readonly currentRole: UserRole;
  readonly errorCode?: number;
}

interface ICharitiesState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class Charities extends React.Component<ICharitiesProps, ICharitiesState> {
  componentWillMount() {
    this.props.actions.fetchCharities();
  }

  render() {
    const {charities, currentRole} = this.props;
    const Charities = charities ? charities.map(this.mapCharity) : [];

    return (<section>
      <PageHeader className='text-center'>الجمعيات</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>الجمعيات</Breadcrumb.Item>
        </Breadcrumb>

        <Progressbar data={charities} emptyPhrase='لا يوجد جمعيات حاليا'>
          <Table dir='rtl' bordered condensed responsive striped>
            <thead>
              <tr>
                <th className='text-center'>الاسم</th>
                <th className='text-center'>الموقع</th>
                <th className='text-center'>الجوال/الواتساب</th>
              </tr>
            </thead>
            <tbody>
              {Charities}
            </tbody>
          </Table>
        </Progressbar>

        <RegisterAsCharityButton userRole={currentRole} />
      </Grid>

      <hr />

      <Grid className='text-center'><ShareButtons text='جمعيات خيرية' /></Grid>
    </section>);
  }

  private mapCharity({location, name, phone, ['.key']: uid}: ICharity) {
    return (<tr key={uid}>
      <td className='text-center'><a href={`#/charities/${uid}`}>{name}</a></td>
      <td className='text-center'>{t(location)}</td>
      <td className='text-center'><PhoneLink phone={phone} /></td>
    </tr>);
  }
}
