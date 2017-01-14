/// <reference path="../../../typings/index.d.ts" />

import moment from 'moment';
import * as React from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import DonationType from '../types/DonationType';
import IActivity from '../types/IActivity';
import ICharity from '../types/ICharity';
import IDonation from '../types/IDonation';
import IUser from '../types/IUser';
import Progressbar from '../components/Progressbar';
import UserRole from '../types/UserRole';

interface IActivityPanelProps {
  readonly activity?: IActivity[];
  readonly hideUser?: boolean;
}

interface IActivityPanelState { }

export default class ActivityPanel extends React.Component<IActivityPanelProps, IActivityPanelState> {
  static defaultProps = { activity: [], hideUser: false };
  static propTypes = { activity: React.PropTypes.array, hideUser: React.PropTypes.bool };

  render() {
    const {activity} = this.props;
    const Activity = activity ? activity.map(this.mapActivity.bind(this)) : [];

    return (<Progressbar data={activity} emptyPhrase='لا يوجد نشاطات حاليا'>
      <Panel bsStyle='primary' className='text-center' header='آخر النشاطات' collapsible defaultExpanded>
        <ListGroup fill>
          {Activity}
        </ListGroup>
      </Panel>
    </Progressbar>);
  }

  private getUrlForDonation(donationType: DonationType, donationId: string, donation: IDonation, text: string) {
    const href = (donationType === 'food') ? `#/donations/food/${donationId}` : `#/donations/nonfood/${donationId}`;
    const style = donation ? {} : { cursor: 'not-allowed', pointerEvents: 'none' };
    return <a href={href} style={style}>{text}</a>;
  }

  private getUrlForUser(userRole: UserRole, userId: string, user: IUser) {
    const {hideUser} = this.props;

    if (hideUser) {
      return null;
    } else if (userRole === 'charity') {
      const charity: ICharity = user as ICharity;
      const style = user ? {} : { cursor: 'not-allowed', pointerEvents: 'none' };
      return <span><a href={`#/charities/${userId}`} style={style}>{charity.name}</a>&nbsp;</span>;
    } else {
      return <span><span>مستخدم</span>&nbsp;</span>;
    }
  }

  private mapActivity({'.key': id, actionName, datetime, donation, donationId, donationType, user, userId, userRole}: IActivity) {
    if (actionName === 'cancel-reservation') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>ألغى/ألغت</span>&nbsp;
        {this.getUrlForUser(userRole, userId, user)}
        <span>حجز</span>&nbsp;
        {this.getUrlForDonation(donationType, donationId, donation, 'تبرع')}&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else if (actionName === 'delivery') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>وصل(ت)</span>&nbsp;
        {this.getUrlForUser(userRole, userId, user)}
        {this.getUrlForDonation(donationType, donationId, donation, 'تبرع')}&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else if (actionName === 'donation') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>تبرع</span>&nbsp;
        {this.getUrlForUser(userRole, userId, user)}
        {this.getUrlForDonation(donationType, donationId, donation, (donationType === 'food' ? 'بطعام' : 'بغير طعام'))}&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else if (actionName === 'reservation') {
      return (<ListGroupItem className='text-right' dir='rtl' key={id}>
        <span>حجز(ت)</span>&nbsp;
        {this.getUrlForUser(userRole, userId, user)}
        {this.getUrlForDonation(donationType, donationId, donation, 'تبرع')}&nbsp;
        <span>{moment(datetime).fromNow()}</span>
      </ListGroupItem>);
    } else {
      return <ListGroupItem className='text-right' key={id}></ListGroupItem>;
    }
  }
}
