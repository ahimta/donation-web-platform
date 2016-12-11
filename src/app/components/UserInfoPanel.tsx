/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

interface IUserInfoPanelProps {
  header?: string;
  hideLink?: boolean;
  phone?: string;
  user: {
    displayName: string,
    email: string,
    phone?: string,
    uid: string
  };
}

interface IUserInfoPanelState {}

export default class UserInfoPanel extends React.Component<IUserInfoPanelProps, IUserInfoPanelState> {
  static defaultProps = {
    header: 'بيانات المتبرع',
    hideLink: false,
    phone: '',
    user: {}
  };

  static propTypes = {
    header: React.PropTypes.string,
    hideLink: React.PropTypes.bool,
    phone: React.PropTypes.string,
    user: React.PropTypes.object.isRequired
  };

  render() {
    const {header, hideLink, phone: givenPhone, user} = this.props;

    const footer = hideLink ? '' : (<Button bsStyle='success' href={`#/users/${user.uid}`} disabled={!user.uid} block>صفحة المستخدم</Button>);
    const phone = givenPhone || user.phone;

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
