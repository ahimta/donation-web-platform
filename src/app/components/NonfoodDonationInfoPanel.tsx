/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import INonfoodDonation from '../types/INonfoodDonation';
import t from '../translate';

interface INonfoodDonationInfoPanelProps {
  readonly donation: INonfoodDonation;
  readonly footer: any;
}

interface INonfoodDonationInfoPanelState { }

export default class NonfoodDonationInfoPanel extends React.Component<INonfoodDonationInfoPanelProps, INonfoodDonationInfoPanelState> {
  static defautProps = { donation: {} };
  static propTypes = { donation: React.PropTypes.object.isRequired, footer: React.PropTypes.element.isRequired };

  render() {
    const {donation, footer} = this.props;
    const {location, notes, phone, state, type} = donation;

    return (<Panel bsStyle='primary' className='text-center' footer={footer} header='بيانات التبرع'
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
            <td className='text-center'><a dir='ltr' href={`tel:${phone}`}>{phone}</a></td>
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
