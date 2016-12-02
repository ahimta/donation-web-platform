/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

import t from '../translate';

const NULL_USER = {
  displayName: '',
  email: '',
  phone: ''
};

interface IUserInfoPanelProps {
  user: {
    displayName: string,
    email: string,
    phone: string
  };
};

interface IUserInfoPanelState {
};

class UserInfoPanel extends React.Component<IUserInfoPanelProps, IUserInfoPanelState> {
  static propTypes = {
    user: React.PropTypes.object
  };

  render() {
    const user = this.props.user || NULL_USER;

    return (
      <Panel header='بيانات المتبرع' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table fill>
          <tbody dir='rtl'>
            <tr>
              <th className='text-center'>الاسم</th>
              <td className='text-center'>{user.displayName}</td>
            </tr>
            <tr>
              <th className='text-center'>الجوال/الواتساب</th>
              <td className='text-center'>{user.phone}</td>
            </tr>
            <tr>
              <th className='text-center'>الإيميل</th>
              <td className='text-center'>{user.email}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default UserInfoPanel;
