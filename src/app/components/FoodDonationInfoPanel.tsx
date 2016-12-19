/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import IFoodDonation from '../types/IFoodDonation';
import PhoneLink from '../components/PhoneLink';
import t from '../translate';

interface IFoodDonationInfoPanelProps {
  readonly donation: IFoodDonation;
  readonly footer: any;
}

interface IFoodDonationInfoPanelState { }

export default class FoodDonationInfoPanel extends React.Component<IFoodDonationInfoPanelProps, IFoodDonationInfoPanelState> {
  static defautProps = { donation: {} };
  static propTypes = { donation: React.PropTypes.object.isRequired, footer: React.PropTypes.element.isRequired };

  render() {
    const {donation, footer} = this.props;
    const {dishes, location, notes, occasion, phone, pickupDatetime, type} = donation;

    return (<Panel header='بيانات التبرع' footer={footer} bsStyle='primary' className='text-center' collapsible defaultExpanded>
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
            <td className='text-center'><PhoneLink phone={phone} /></td>
          </tr>
          <tr className={dishes ? '' : 'hidden'}>
            <th className='text-center'>الأطباق</th>
            <td className='text-center'>{dishes}</td>
          </tr>
          <tr className={notes ? '' : 'hidden'}>
            <th className='text-center'>ملاحظات</th>
            <td className='text-center'>{notes}</td>
          </tr>
        </tbody>
      </Table>
    </Panel>);
  }
}
