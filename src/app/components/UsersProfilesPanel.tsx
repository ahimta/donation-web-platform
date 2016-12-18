/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import IRegularUser from '../types/IRegularUser';

interface IUsersProfilesPanelProps {
  users: IRegularUser[];
}

interface IUsersProfilesPanelState { }

export default class UsersProfilesPanel extends React.Component<IUsersProfilesPanelProps, IUsersProfilesPanelState> {
  static defaultProps = { users: [] };
  static propTypes = { users: React.PropTypes.array.isRequired };

  render() {
    const {users} = this.props;
    const Users = users.map(this.mapUser);

    return (<Panel header='حسابات المستخدمين' bsStyle='primary' className='text-center' collapsible defaultExpanded>
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
    </Panel>);
  }

  private mapUser({displayName, email, phone, uid}: IRegularUser) {
    return (<tr key={uid}>
      <td className='text-center'><a href={`#/users/${uid}`}>{displayName}</a></td>
      <td className='text-center'><a href={`tel:${phone}`}>{phone}</a></td>
      <td className='text-center'><a href={`mailto:${email}`} target='_blank'>{email}</a></td>
    </tr>);
  }
}
