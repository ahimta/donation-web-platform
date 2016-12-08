/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

const NULL_USER = {
  displayName: '',
  email: '',
  isNull: true,
  phone: '',
  uid: 'not-found',
};

interface IUserInfoPanelProps {
  header?: string;
  hideLink?: boolean;
  phone?: string;
  user: {
    displayName: string,
    email: string,
    isNull?: boolean,
    phone?: string,
    uid: string
  };
}

interface IUserInfoPanelState {}

export default class UserInfoPanel extends React.Component<IUserInfoPanelProps, IUserInfoPanelState> {
  static propTypes = {
    header: React.PropTypes.string,
    hideLink: React.PropTypes.bool,
    phone: React.PropTypes.string,
    user: React.PropTypes.object
  };

  render() {
    const header = this.props.header || 'بيانات المتبرع';
    const user = this.props.user || NULL_USER;

    const footer = this.props.hideLink ? '' : (<Button bsStyle='success' href={`#/users/${user.uid}`} disabled={user.isNull} block>صفحة المستخدم</Button>);
    const phone = this.props.phone || user.phone;

    return (
      <Panel header={header} footer={footer}
        bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table fill>
          <tbody dir='rtl'>
            <tr>
              <th className='text-center'>الاسم</th>
              <td className='text-center'>{user.displayName}</td>
            </tr>
            <tr>
              <th className='text-center'>الجوال/الواتساب</th>
              <td className='text-center'><a href={`tel:${phone}`}>{phone}</a></td>
            </tr>
            <tr>
              <th className='text-center'>الإيميل</th>
              <td className='text-center'><a href={`mailto:${user.email}`} target='_blank'>{user.email}</a></td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}
