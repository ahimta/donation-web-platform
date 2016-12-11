/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, ButtonGroup, Panel, Table} from 'react-bootstrap';

import * as database from '../database';
import * as helpers from '../helpers';
import t from '../translate';

interface INonfoodDonationsPanelProps {
  donations: any[];
  onUpdate: Function;
}

interface INonfoodDonationsPanelState {}

export default class NonfoodDonationsPanel extends React.Component<INonfoodDonationsPanelProps, INonfoodDonationsPanelState> {
  static defaultProps = {
    donations: []
  };

  static contextTypes = {
    currentId: React.PropTypes.string
  };

  static propTypes = {
    donations: React.PropTypes.array.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  render() {
    const {currentId} = this.context;
    const {donations, onUpdate} = this.props;
    const NonfoodDonations = this.mapDonations(donations, onUpdate, this.deleteDonationFactory, currentId);

    return (
      <Panel header='تبرعات أخرى' bsStyle='primary' className='text-center' collapsible defaultExpanded>
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
      </Panel>
    );
  }

  private deleteDonationFactory(onUpdate: Function, id: string) {
    return () => {
      database.removeNonfoodDonation(id).then(() => {
        onUpdate();
      });
    };
  }

  private mapDonations(donations: any, onUpdate: Function, deleteDonationFactory: Function, currentId?: string): any[] {
    return donations.map((donation) => {
      return (
        <tr className={helpers.getDonationRowClass(currentId, donation.deliveredOrReceived, donation.reserverId)}
          key={donation['.key']}>
          <td className='text-center'>{t(donation.donationType)}</td>
          <td className='text-center'>{t(donation.donationState)}</td>
          <td className='text-center'>{t(donation.location)}</td>
          <td className='text-center'>
            <ButtonGroup bsSize='xs'>
              <Button bsStyle='danger'  onClick={deleteDonationFactory(onUpdate, donation['.key'])} disabled={currentId !== donation.donorId}>حذف</Button>
              <Button bsStyle='success' href={`#/donations/other/${donation['.key']}`}>تفاصيل أكثر</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  }
}
