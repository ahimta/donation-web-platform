/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

import t from '../translate';

interface IFoodDonationInfoPanelProps {
  donation: any;
}

interface IFoodDonationInfoPanelState {}

export default class FoodDonationInfoPanel extends React.Component<IFoodDonationInfoPanelProps, IFoodDonationInfoPanelState> {
  static defautProps = {
    donation: {}
  };

  static propTypes = {
    donation: React.PropTypes.object.isRequired
  };

  render() {
    const {donation} = this.props;

    return (
      <Panel header='بيانات التبرع' footer={donation.notes} bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table fill>
          <tbody dir='rtl'>
            <tr>
              <th className='text-center'>النوع</th>
              <td className='text-center'>{t(donation.type)}</td>
            </tr>
            <tr>
              <th className='text-center'>المناسبة</th>
              <td className='text-center'>{t(donation.occasion)}</td>
            </tr>
            <tr>
              <th className='text-center'>الموقع</th>
              <td className='text-center'>{t(donation.location)}</td>
            </tr>
            <tr>
              <th className='text-center'>الأطباق</th>
              <td className='text-center'>{donation.dishes}</td>
            </tr>
            <tr>
              <th className='text-center'>الحالة</th>
              <td className='text-center'>
                <span>متوفر</span>
                &nbsp;
                <span>{moment(donation.pickupDatetime).fromNow()}</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}
