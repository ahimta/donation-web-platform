/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

import ICharity from '../types/ICharity';
import t from '../translate';

interface ICharitiesProfilesPanelProps {
  charities: ICharity[];
}

interface ICharitiesProfilesPanelState { }

export default class CharitiesProfilesPanel extends React.Component<ICharitiesProfilesPanelProps, ICharitiesProfilesPanelState> {
  static defaultProps = { charities: [] };
  static propTypes = { charities: React.PropTypes.array.isRequired };

  render() {
    const {charities} = this.props;
    const Charities = charities.map(this.mapCharity);

    return (<Panel header='حسابات الجمعيات' bsStyle='primary' className='text-center' collapsible defaultExpanded>
      <Table dir='rtl' responsive bordered striped condensed fill>
        <thead>
          <tr>
            <th className='text-center'>الاسم</th>
            <th className='text-center'>الموقع</th>
            <th className='text-center'>الجوال/الواتساب</th>
            <th className='text-center'>الإيميل</th>
          </tr>
        </thead>
        <tbody>
          {Charities}
        </tbody>
      </Table>
    </Panel>);
  }

  private mapCharity({email, location, name, phone, ['.key']: uid}: ICharity) {
    return (<tr key={uid}>
      <td className='text-center'><a href={`#/charities/${uid}`}>{name}</a></td>
      <td className='text-center'>{t(location)}</td>
      <td className='text-center'><a href={`tel:${phone}`}>{phone}</a></td>
      <td className='text-center'><a href={`mailto:${email}`} target='_blank'>{email}</a></td>
    </tr>);
  }
}
