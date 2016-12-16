/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import * as React from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import DonationType from '../types/DonationType';
import IActivity from '../types/IActivity';
import UserRole from '../types/UserRole';

interface IActivityPanelProps {
  activity: any[];
}

interface IActivityPanelState { }

export default class ActivityPanel extends React.Component<IActivityPanelProps, IActivityPanelState> {
  static defaultProps = { activity: [] };

  static propTypes = { activity: React.PropTypes.array.isRequired };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { activity: [] };
  }

  render() {
    const {activity} = this.props;
    const Activity = activity.map(this.mapActivity.bind(this));
    const Header = <span dir='rtl'><span>النشاطات</span><span className='caret'></span></span>;

    return (
      <Panel className='text-center' header={Header} collapsible defaultExpanded>
        <ListGroup fill>
          {Activity}
        </ListGroup>
      </Panel>
    );
  }

  private getUrlForUser(userRole: UserRole, userId: string) {
    if (userRole === 'charity') {
      return `#/charities/${userId}`;
    } else {
      return `#/users/${userId}`;
    }
  }

  private getNameForUser(userRole: UserRole, user: any) {
    return (userRole === 'charity') ? user.name : user.displayName;
  }

  private getUrlForDonation(donationType: DonationType, donationId: string) {
    return (donationType === 'food') ? `#/donations/food/${donationId}` : `#/donations/other/${donationId}`;
  }

  private mapActivity({'.key': id, actionName, datetime, donationId, donationType, user, userId, userRole}: IActivity) {
    if (actionName === 'cancel-reservation') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>ألغى/ألغت</span>&nbsp;
        <a href={this.getUrlForUser(userRole, userId)}>
          {this.getNameForUser(userRole, user)}
        </a>&nbsp;
        <span>حجز</span>&nbsp;
        <a href={this.getUrlForDonation(donationType, donationId)}>تبرع</a>&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else if (actionName === 'delivery') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>وصل(ت)</span>&nbsp;
        <a href={this.getUrlForUser(userRole, userId)}>
          {this.getNameForUser(userRole, user)}
        </a>&nbsp;
        <a href={this.getUrlForDonation(donationType, donationId)}>تبرع</a>&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else if (actionName === 'donation') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <a href={this.getUrlForDonation(donationType, donationId)}>تبرع(ت)</a>&nbsp;
        <a href={this.getUrlForUser(userRole, userId)}>
          {this.getNameForUser(userRole, user)}
        </a>&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else if (actionName === 'reservation') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>حجز(ت)</span>&nbsp;
        <a href={this.getUrlForUser(userRole, userId)}>
          {this.getNameForUser(userRole, user)}
        </a>&nbsp;
        <a href={this.getUrlForDonation(donationType, donationId)}>تبرع</a>&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else {
      return <ListGroupItem className='text-right' key={id}></ListGroupItem>;
    }
  }
}
