/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

import t from '../translate';

type Charity = {
  ['.key']: string;
  description?: string;
  email: string;
  location: string;
  name: string;
  phone?: string;
  website?: string;
};

interface ICharityInfoPanelProps {
  charity: Charity;
}

interface ICharityInfoPanelState {}

export default class CharityInfoPanel extends React.Component<ICharityInfoPanelProps, ICharityInfoPanelState> {
  static propTypes = {
    charity: React.PropTypes.object
  };

  render() {
    const {charity: charityProp} = this.props;
    const charity = charityProp || {};

    return (
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
              <td className='text-center'><a href={`tel:${charity.phone}`}>{charity.phone}</a></td>
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
    );
  }
}
