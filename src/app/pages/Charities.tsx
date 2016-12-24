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
import t from '../translate';

interface ICharitiesProps {
  readonly actions: any;
  readonly charities?: ReadonlyArray<ICharity>;
}

interface ICharitiesState { }

class Charities extends React.Component<ICharitiesProps, ICharitiesState> {
  componentWillMount() {
    this.props.actions.fetchCharities();
  }

  render() {
    const {charities} = this.props;
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
      </Grid>
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

function mapStateToProps({charities}: any) {
  return charities;
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchCharities }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Charities);
