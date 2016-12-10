/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

import t from '../translate';

interface INonfoodDonationInfoPanelProps {
  nonfoodDonation: any;
}

interface INonfoodDonationInfoPanelState {}

export default class NonfoodDonationInfoPanel extends React.Component<INonfoodDonationInfoPanelProps, INonfoodDonationInfoPanelState> {
  static propTypes = {
    nonfoodDonation: React.PropTypes.object
  };

  render() {
    const {nonfoodDonation} = this.props;

    return (
      <Panel header='بيانات التبرع' footer={nonfoodDonation.notes} bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table fill>
          <tbody dir='rtl'>
            <tr>
              <th className='text-center'>النوع</th>
              <td className='text-center'>{t(nonfoodDonation.donationType)}</td>
            </tr>
            <tr>
              <th className='text-center'>حالة التبرع</th>
              <td className='text-center'>{t(nonfoodDonation.donationState)}</td>
            </tr>
            <tr>
              <th className='text-center'>الموقع</th>
              <td className='text-center'>{t(nonfoodDonation.location)}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}
