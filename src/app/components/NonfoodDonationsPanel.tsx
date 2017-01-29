/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Button, ButtonGroup, Panel, Table } from 'react-bootstrap';

import t from '../translate';
import DonationType from '../types/DonationType';
import INonfoodDonation from '../types/INonfoodDonation';

interface IProps {
  readonly currentId: string;
  readonly donations: INonfoodDonation[];

  readonly getDonationRowClass: (currentId: string, deliveredOrReceived: boolean, reserverId: string) => string;
  readonly removeDonation: (donationType: DonationType, donationId: string) => void;
}

interface IState { }

export default class NonfoodDonationsPanel extends React.Component<IProps, IState> {
  static defaultProps = { donations: [] };

  static propTypes = {
    currentId: React.PropTypes.string.isRequired,
    donations: React.PropTypes.array.isRequired,

    getDonationRowClass: React.PropTypes.func.isRequired,
    removeDonation: React.PropTypes.func.isRequired
  };

  render() {
    const {donations} = this.props;
    const NonfoodDonations = donations.map(this.mapDonation.bind(this));

    return (<Panel header='تبرعات أخرى' bsStyle='primary' className='text-center' collapsible defaultExpanded>
      <Table dir='rtl' bordered condensed fill hover responsive>
        <thead>
          <tr>
            <th className='text-center'>النوع</th>
            <th className='text-center'>حالة التبرع</th>
            <th className='text-center'>الموقع</th>
            <th className='text-center'>إدارة</th>
          </tr>
        </thead>
        <tbody>
          {NonfoodDonations}
        </tbody>
      </Table>
    </Panel>);
  }

  private mapDonation(donation: INonfoodDonation) {
    const {currentId, getDonationRowClass, removeDonation} = this.props;

    return (<tr className={getDonationRowClass(currentId, donation.deliveredOrReceived, donation.reserverId)}
      key={donation['.key']}>
      <td className='text-center'>{t(donation.type)}</td>
      <td className='text-center'>{t(donation.state)}</td>
      <td className='text-center'>{t(donation.location)}</td>
      <td className='text-center'>
        <ButtonGroup bsSize='xs'>
          <Button bsStyle='danger' onClick={removeDonation.bind(null, 'nonfood', donation['.key'])} disabled={currentId !== donation.donorId}>حذف</Button>
          <Button bsStyle='success' href={`#/donations/nonfood/${donation['.key']}`}>تفاصيل أكثر</Button>
        </ButtonGroup>
      </td>
    </tr>);
  }
}
