/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

import t from '../translate';

interface INonfoodDonationInfoPanelProps {
  donation: any;
}

interface INonfoodDonationInfoPanelState {}

export default class NonfoodDonationInfoPanel extends React.Component<INonfoodDonationInfoPanelProps, INonfoodDonationInfoPanelState> {
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
              <th className='text-center'>حالة التبرع</th>
              <td className='text-center'>{t(donation.state)}</td>
            </tr>
            <tr>
              <th className='text-center'>الموقع</th>
              <td className='text-center'>{t(donation.location)}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}
