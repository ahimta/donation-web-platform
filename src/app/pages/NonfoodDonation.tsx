/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, DropdownButton, Grid, MenuItem, PageHeader, Panel, Table} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import * as database from '../database';
import t from '../translate';
import MockMap from '../components/MockMap';
import UserInfoPanel from '../components/UserInfoPanel';

interface INonfoodDonationProps {
  params: {id: string};
};

interface INonfoodDonationState {
  donor: any;
  nonfoodDonation: any;
};

export default class NonfoodDonation extends React.Component<INonfoodDonationProps, INonfoodDonationState> {
  static contextTypes = {
    currentUserId: React.PropTypes.string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      nonfoodDonation: {}
    };
  }

  componentDidMount() {
    firebase.database().ref(`otherDonations/${this.props.params.id}`).once('value').then((snapshot) => {
      const nonfoodDonation = snapshot.val();
      this.setState({nonfoodDonation});
      return firebase.database().ref(`users/${nonfoodDonation.donorId}`).once('value');
    }).then((snapshot) => {
      this.setState({donor: snapshot.val()});
    });
  }

  render() {
    const {currentUserId} = this.context;
    const {params} = this.props;
    const {donor, nonfoodDonation} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>تبرع آخر</PageHeader>
        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item href='#/donations'>التبرعات</Breadcrumb.Item>
            <Breadcrumb.Item active>تبرع غير طعام</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <Panel header='بيانات التبرع' footer={nonfoodDonation.notes} bsStyle='primary' className='text-center' collapsible defaultExpanded>
            <Table fill>
              <tbody dir='rtl'>
                <tr>
                  <th className='text-center'>النوع</th>
                  <td className='text-center'>{t(nonfoodDonation.donationType)}</td>
                </tr>
                <tr>
                  <th className='text-center'>حالة التبرع</th>
                  <td className='text-center'>{t(nonfoodDonation.donationState)}</td>
                </tr>
              </tbody>
            </Table>
          </Panel>

          <UserInfoPanel phone={nonfoodDonation.phone} user={donor} />
        </Grid>

        <hr />

        <Grid>
          <MockMap />
        </Grid>

        <hr />

        <Grid className='text-center'>
          <ButtonGroup>
            <Button bsStyle='danger' onClick={this.deleteDonation.bind(null, params.id)} disabled={currentUserId !== nonfoodDonation.donorId}>حذف</Button>
            <DropdownButton bsStyle='success' dir='rtl' id='reserveFoodDonationButton' title='حجز' disabled dropup pullRight>
              <MenuItem className='text-right' eventKey='1'>لاستقبال التبرع</MenuItem>
              <MenuItem className='text-right' eventKey='2'>لتوصيل التبرع</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }

  private deleteDonation(id: string) {
    database.removeNonfoodDonation(id).then(function() {
      hashHistory.push('/donations');
    });
  }
}
