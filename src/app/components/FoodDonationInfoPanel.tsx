/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import IFoodDonation from '../types/IFoodDonation';
import t from '../translate';

interface IFoodDonationInfoPanelProps {
  donation: IFoodDonation;
}

interface IFoodDonationInfoPanelState { }

export default class FoodDonationInfoPanel extends React.Component<IFoodDonationInfoPanelProps, IFoodDonationInfoPanelState> {
  static defautProps = { donation: {} };
  static propTypes = { donation: React.PropTypes.object.isRequired };

  render() {
    const {dishes, location, notes, occasion, phone, pickupDatetime, type} = this.props.donation;

    return (<Panel header='بيانات التبرع' footer={notes} bsStyle='primary' className='text-center' collapsible defaultExpanded>
      <Table fill>
        <tbody dir='rtl'>
          <tr>
            <th className='text-center'>النوع</th>
            <td className='text-center'>{t(type)}</td>
          </tr>
          <tr>
            <th className='text-center'>المناسبة</th>
            <td className='text-center'>{t(occasion)}</td>
          </tr>
          <tr>
            <th className='text-center'>الموقع</th>
            <td className='text-center'>{t(location)}</td>
          </tr>
          <tr>
            <th className='text-center'>الأطباق</th>
            <td className='text-center'>{dishes}</td>
          </tr>
          <tr>
            <th className='text-center'>وقت الاستلام</th>
            <td className='text-center'>
              <span>{moment(pickupDatetime).format('dddd YYYY/MM/DD - hh A')}</span>&nbsp;
              (<span>متوفر</span>
              &nbsp;
              <span>{moment(pickupDatetime).fromNow()}</span>)
            </td>
          </tr>
          <tr>
            <th className='text-center'>الجوال/الواتساب</th>
            <td className='text-center'><a dir='ltr' href={`tel:${phone}`}>{phone}</a></td>
          </tr>
        </tbody>
      </Table>
    </Panel>);
  }
}
