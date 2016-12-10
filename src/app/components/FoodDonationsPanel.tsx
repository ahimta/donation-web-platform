/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Panel, Table} from 'react-bootstrap';

import * as database from '../database';
import t from '../translate';

interface IFoodDonationsPanelProps {
  donations: any[];
}

interface IFoodDonationsPanelState {}

export default class FoodDonationsPanel extends React.Component<IFoodDonationsPanelProps, IFoodDonationsPanelState> {
  static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  static propTypes = {
    donations: React.PropTypes.array
  };

  render() {
    const {currentUserId} = this.context;
    const donations = this.props.donations || [];
    const FoodDonations = this.mapDonations(donations, this.deleteDonationFactory, currentUserId);

    return (
      <Panel header='تبرعات طعام' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table dir='rtl' responsive bordered striped condensed fill>
          <thead>
            <tr>
              <th className='text-center'>النوع</th>
              <th className='text-center'>المناسبة</th>
              <th className='text-center'>الموقع</th>
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

  private deleteDonationFactory(id: string) {
    return () => { database.removeFoodDonation(id); };
  }

  private mapDonations(donations: any, deleteDonationFactory: Function, currentUserId?: string): any[] {
    return donations.map((donation) => {
      return (<tr key={donation['.key']}>
        <td className='text-center'>{t(donation.foodType)}</td>
        <td className='text-center'>{t(donation.occasion)}</td>
        <td className='text-center'>{t(donation.location)}</td>
        <td className='text-center'>
          <ButtonGroup bsSize='xs'>
            <Button bsStyle='danger' onClick={deleteDonationFactory(donation['.key'])} disabled={currentUserId !== donation.donorId}>حذف</Button>
            <Button bsStyle='success' href={`#/donations/food/${donation['.key']}`}>عرض</Button>
          </ButtonGroup>
        </td>
      </tr>);
    });
  }
}
