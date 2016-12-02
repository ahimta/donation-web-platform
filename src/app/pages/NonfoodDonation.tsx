/// <reference path="../../../typings/index.d.ts" />

import firebase from 'firebase';
import * as React from 'react';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader, Panel, Table} from 'react-bootstrap';

import t from '../translate';
import MockMap from '../components/MockMap';
import UserInfoPanel from '../components/UserInfoPanel';

interface INonfoodDonationProps {
  params: {id: string};
};

interface INonfoodDonationState {
  donor: Object;
  nonfoodDonation: Object;
};

class NonfoodDonation extends React.Component<INonfoodDonationProps, INonfoodDonationState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      donor: {},
      nonfoodDonation: {}
    };
  }

  componentWillMount() {
    firebase.database().ref(`otherDonations/${this.props.params.id}`).once('value').then((snapshot) => {
      const nonfoodDonation = snapshot.val();
      this.setState({nonfoodDonation});
      return firebase.database().ref(`users/${nonfoodDonation.donorId}`).once('value');
    }).then((snapshot) => {
      this.setState({donor: snapshot.val()});
    });
  }

  render() {
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
            <Button bsStyle='danger' disabled>حذف</Button>
            <Button bsStyle='primary' disabled>تعديل</Button>
            <Button bsStyle='success' disabled>حجز</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }
}

reactMixin(NonfoodDonation.prototype, ReactFireMixin);

export default NonfoodDonation;
