/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import { Breadcrumb, Grid, PageHeader, Table } from 'react-bootstrap';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

import ICharity from '../types/ICharity';
import PhoneLink from '../components/PhoneLink';
import t from '../translate';

interface ICharitiesProps { }

interface ICharitiesState {
  readonly charities: ICharity[];
}

export default class Charities extends React.Component<ICharitiesProps, ICharitiesState> {
  private bindAsArray: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { charities: [] };
  }

  componentDidMount() {
    this.bindAsArray(firebase.database().ref('charities'), 'charities');
  }

  render() {
    const {charities} = this.state;
    const Charities = charities.map(this.mapCharity);

    return (<section>
      <PageHeader className='text-center'>الجمعيات</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>الجمعيات</Breadcrumb.Item>
        </Breadcrumb>

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

reactMixin(Charities.prototype, ReactFireMixin);
