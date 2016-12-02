/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Panel, Table} from 'react-bootstrap';

import t from '../translate';

interface IFoodDonationsPanelProps {
  donations: any[];
};

interface IFoodDonationsPanelState {
};

class FoodDonationsPanel extends React.Component<IFoodDonationsPanelProps, IFoodDonationsPanelState> {
  static propTypes = {
    donations: React.PropTypes.array
  };

  mapDonation(donation: any) {
    return (
      <tr key={donation['.key']}>
        <td className='text-center'>{t(donation.foodType)}</td>
        <td className='text-center'>{t(donation.occasion)}</td>
        <td className='text-center'>متوفر</td>
        <td className='text-center'>
          <ButtonGroup bsSize='sm'>
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' href={`#/donations/food/${donation['.key']}`}>عرض</Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }

  render() {
    const donations = this.props.donations || [];
    const FoodDonations = donations.map(this.mapDonation);

    return (
      <Panel header='تبرعات الطعام' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table dir='rtl' responsive bordered striped condensed fill>
          <thead>
            <tr>
              <th className='text-center'>النوع</th>
              <th className='text-center'>المناسبة</th>
              <th className='text-center'>الحالة</th>
              <th className='text-center'>إدارة</th>
            </tr>
          </thead>
          <tbody>
            {FoodDonations}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default FoodDonationsPanel;
