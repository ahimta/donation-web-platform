/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Panel, Table} from 'react-bootstrap';

import t from '../translate';

interface INonfoodDonationsPanelProps {
  donations: any[];
};

interface INonfoodDonationsPanelState {
};

class NonfoodDonationsPanel extends React.Component<INonfoodDonationsPanelProps, INonfoodDonationsPanelState> {
  static propTypes = {
    donations: React.PropTypes.array
  };

  mapDonation(donation: any) {
    return (
      <tr key={donation['.key']}>
        <td className='text-center'>{t(donation.donationType)}</td>
        <td className='text-center'>{t(donation.donationState)}</td>
        <td className='text-center'>
          <ButtonGroup bsSize='sm'>
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' href={`#/donations/other/${donation['.key']}`}>عرض</Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }

  render() {
    const donations = this.props.donations || [];
    const NonfoodDonations = donations.map(this.mapDonation);

    return (
      <Panel header='تبرعات أخرى' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table dir='rtl' responsive bordered striped condensed fill>
          <thead>
            <tr>
              <th className='text-center'>النوع</th>
              <th className='text-center'>حالة التبرع</th>
              <th className='text-center'>إدارة</th>
            </tr>
          </thead>
          <tbody>
            {NonfoodDonations}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default NonfoodDonationsPanel;
