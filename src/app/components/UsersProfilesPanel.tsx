/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

interface IUsersProfilesPanelProps {
  users: {
    displayName: string;
    email: string;
    phone?: string;
    uid: string;
  }[];
}

interface IUsersProfilesPanelState {
}

export default class UsersProfilesPanel extends React.Component<IUsersProfilesPanelProps, IUsersProfilesPanelState> {
  static propTypes = {
    users: React.PropTypes.array
  };

  mapUser({displayName, email, phone, uid}) {
    return (
      <tr key={uid}>
        <td className='text-center'><a href={`#/users/${uid}`}>{displayName}</a></td>
        <td className='text-center'><a href={`tel:${phone}`}>{phone}</a></td>
        <td className='text-center'><a href={`mailto:${email}`} target='_blank'>{email}</a></td>
      </tr>
    );
  }

  render() {
    const users = this.props.users || [];
    const Users = users.map(this.mapUser);

    return (
      <Panel header='حسابات المستخدمين' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table dir='rtl' responsive bordered striped condensed fill>
          <thead>
            <tr>
              <th className='text-center'>الاسم</th>
              <th className='text-center'>الجوال/الواتساب</th>
              <th className='text-center'>الإيميل</th>
            </tr>
          </thead>
          <tbody>
            {Users}
          </tbody>
        </Table>
      </Panel>
    );
  }
}
