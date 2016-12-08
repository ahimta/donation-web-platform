/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Panel, Table} from 'react-bootstrap';

type Charity = {
  ['.key']: string;
  description?: string;
  email: string;
  name: string;
  phone?: string;
  website?: string;
};

interface ICharitiesProfilesPanelProps {
  charities: Charity[];
}

interface ICharitiesProfilesPanelState {}

export default class CharitiesProfilesPanel extends React.Component<ICharitiesProfilesPanelProps, ICharitiesProfilesPanelState> {
  static propTypes = {
    charities: React.PropTypes.array
  };

  mapUser({name, email, phone, ['.key']: uid}: Charity) {
    return (
      <tr key={uid}>
        <td className='text-center'><a href={`#/charities/${uid}`}>{name}</a></td>
        <td className='text-center'><a href={`tel:${phone}`}>{phone}</a></td>
        <td className='text-center'><a href={`mailto:${email}`} target='_blank'>{email}</a></td>
      </tr>
    );
  }

  render() {
    const charities = this.props.charities || [];
    const Charities = charities.map(this.mapUser);

    return (
      <Panel header='حسابات الجمعيات' bsStyle='primary' className='text-center' collapsible defaultExpanded>
        <Table dir='rtl' responsive bordered striped condensed fill>
          <thead>
            <tr>
              <th className='text-center'>الاسم</th>
              <th className='text-center'>الجوال/الواتساب</th>
              <th className='text-center'>الإيميل</th>
            </tr>
          </thead>
          <tbody>
            {Charities}
          </tbody>
        </Table>
      </Panel>
    );
  }
}
