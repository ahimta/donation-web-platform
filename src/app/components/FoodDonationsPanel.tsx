/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Panel, Table} from 'react-bootstrap';

import * as database from '../database';
import * as helpers from '../helpers';
import t from '../translate';

interface IFoodDonationsPanelProps {
  donations: any[];
}

interface IFoodDonationsPanelState {}

export default class FoodDonationsPanel extends React.Component<IFoodDonationsPanelProps, IFoodDonationsPanelState> {
  static contextTypes = {
    currentId: React.PropTypes.string
  };

  static propTypes = {
    donations: React.PropTypes.array
  };

  render() {
    const {currentId} = this.context;
    const donations = this.props.donations || [];
    const FoodDonations = this.mapDonations(donations, this.deleteDonationFactory, currentId);

    return (
      <Panel header='تبرعات طعام' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table dir='rtl' bordered condensed fill hover responsive>
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

  private mapDonations(donations: any, deleteDonationFactory: Function, currentId?: string): any[] {
    return donations.map((donation) => {
      return (
        <tr className={helpers.getDonationRowClass(currentId, donation.deliveredOrReceived, donation.reserverId)}
          key={donation['.key']}>
          <td className='text-center'>{t(donation.foodType)}</td>
          <td className='text-center'>{t(donation.occasion)}</td>
          <td className='text-center'>{t(donation.location)}</td>
          <td className='text-center'>
            <ButtonGroup bsSize='xs'>
              <Button bsStyle='danger' onClick={deleteDonationFactory(donation['.key'])} disabled={currentId !== donation.donorId}>حذف</Button>
              <Button bsStyle='success' href={`#/donations/food/${donation['.key']}`}>تفاصيل أكثر</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  }
}
