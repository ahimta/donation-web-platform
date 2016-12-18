/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonGroup, Panel, Table } from 'react-bootstrap';

import * as database from '../database';
import * as helpers from '../helpers';
import IFoodDonation from '../types/IFoodDonation';
import t from '../translate';

interface IFoodDonationsPanelProps {
  currentId: string;
  donations: IFoodDonation[];
  onUpdate: () => any;
}

interface IFoodDonationsPanelState { }

export default class FoodDonationsPanel extends React.Component<IFoodDonationsPanelProps, IFoodDonationsPanelState> {
  static defaultProps = { donations: [] };

  static propTypes = {
    currentId: React.PropTypes.string.isRequired,
    donations: React.PropTypes.array.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  render() {
    const {donations} = this.props;
    const FoodDonations = donations.map(this.mapDonation.bind(this));

    return (<Panel bsStyle='primary' className='text-center' header='تبرعات طعام' collapsible defaultExpanded>
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
    </Panel>);
  }

  private deleteDonation(donationId: string) {
    const {onUpdate} = this.props;
    database.removeDonation('food', donationId).then(onUpdate);
  }

  private mapDonation(donation: IFoodDonation) {
    const {currentId} = this.props;

    return (<tr className={helpers.getDonationRowClass(currentId, donation.deliveredOrReceived, donation.reserverId)}
      key={donation['.key']}>
      <td className='text-center'>{t(donation.type)}</td>
      <td className='text-center'>{t(donation.occasion)}</td>
      <td className='text-center'>{t(donation.location)}</td>
      <td className='text-center'>
        <ButtonGroup bsSize='xs'>
          <Button bsStyle='danger' onClick={this.deleteDonation.bind(this, donation['.key'])} disabled={currentId !== donation.donorId}>حذف</Button>
          <Button bsStyle='success' href={`#/donations/food/${donation['.key']}`}>تفاصيل أكثر</Button>
        </ButtonGroup>
      </td>
    </tr>);
  }
}
