/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import ICharity from '../types/ICharity';
import t from '../translate';

interface ICharityInfoPanelProps {
  charity: ICharity;
}

interface ICharityInfoPanelState { }

export default class CharityInfoPanel extends React.Component<ICharityInfoPanelProps, ICharityInfoPanelState> {
  static defaultProps = { charity: {} };
  static propTypes = { charity: React.PropTypes.object.isRequired };

  render() {
    const {charity} = this.props;

    return (<Panel header='بيانات الجمعية' footer={charity.description}
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
    </Panel>);
  }
}
