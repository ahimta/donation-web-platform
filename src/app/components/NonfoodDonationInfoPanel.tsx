/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import INonfoodDonation from '../types/INonfoodDonation';
import t from '../translate';

interface INonfoodDonationInfoPanelProps {
  donation: INonfoodDonation;
}

interface INonfoodDonationInfoPanelState { }

export default class NonfoodDonationInfoPanel extends React.Component<INonfoodDonationInfoPanelProps, INonfoodDonationInfoPanelState> {
  static defautProps = { donation: {} };
  static propTypes = { donation: React.PropTypes.object.isRequired };

  render() {
    const {location, notes, phone, state, type} = this.props.donation;

    return (<Panel bsStyle='primary' className='text-center' footer={notes} header='بيانات التبرع'
      collapsible defaultExpanded>
      <Table fill>
        <tbody dir='rtl'>
          <tr>
            <th className='text-center'>النوع</th>
            <td className='text-center'>{t(type)}</td>
          </tr>
          <tr>
            <th className='text-center'>حالة التبرع</th>
            <td className='text-center'>{t(state)}</td>
          </tr>
          <tr>
            <th className='text-center'>الموقع</th>
            <td className='text-center'>{t(location)}</td>
          </tr>
          <tr>
            <th className='text-center'>الجوال/الواتساب</th>
            <td className='text-center'><a href={`tel:${phone}`}>{phone}</a></td>
          </tr>
        </tbody>
      </Table>
    </Panel>);
  }
}
