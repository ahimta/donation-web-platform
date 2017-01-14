/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Breadcrumb, Button, ButtonGroup, Grid, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { bindActionCreators } from 'redux';

import { fetchAllDonations, removeDonation } from '../actions/index';
import FoodDonationsPanel from '../components/FoodDonationsPanel';
import Progressbar from '../components/Progressbar';
import NonfoodDonationsPanel from '../components/NonfoodDonationsPanel';
import ShareButtons from '../components/ShareButtons';

import IFoodDonation from '../types/IFoodDonation';
import INonfoodDonation from '../types/INonfoodDonation';
import UserRole from '../types/UserRole';

function mapStateToProps({currentUser, donations}: any) {
  return {
    currentId: currentUser.id, currentRole: currentUser.role,
    foodDonations: donations.foodDonations, nonfoodDonations: donations.nonfoodDonations
  };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({ fetchAllDonations, removeDonation }, dispatch) };
}

interface IDonationsProps {
  readonly actions: any;
  readonly currentId: string;
  readonly currentRole: UserRole;
  readonly foodDonations: IFoodDonation[];
  readonly nonfoodDonations: INonfoodDonation[];
}

interface IDonationsState { }

@connect(mapStateToProps, mapDispatchToProps)
export default class Donations extends React.Component<IDonationsProps, IDonationsState> {
  componentWillMount() {
    this.props.actions.fetchAllDonations();
  }

  render() {
    const {currentId, currentRole, foodDonations, nonfoodDonations} = this.props;

    return (<section>
      <PageHeader className='text-center'>التبرعات</PageHeader>

      <Grid>
        <Breadcrumb dir='rtl'>
          <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
          <Breadcrumb.Item active>التبرعات</Breadcrumb.Item>
        </Breadcrumb>

        <Progressbar data={foodDonations} emptyPhrase='لا يوجد تبرعات طعام حاليا'>
          <FoodDonationsPanel currentId={currentId} donations={foodDonations} removeDonation={this.handleRemove.bind(this)} />
        </Progressbar>

        <Progressbar data={nonfoodDonations} emptyPhrase='لا يوجد تبرعات غير طعام حاليا'>
          <NonfoodDonationsPanel currentId={currentId} donations={nonfoodDonations} removeDonation={this.handleRemove.bind(this)} />
        </Progressbar>
      </Grid>

      <Grid className={currentRole === 'charity' ? 'hidden' : 'text-center'}>
        <ButtonGroup justified>
          <Button bsStyle='success' href='#/donate/nonfood'>تبرع بشيء آخر</Button>
          <Button bsStyle='success' href='#/donate/food'>تبرع بطعام</Button>
        </ButtonGroup>
      </Grid>

      <hr />

      <Grid className='text-center'><ShareButtons text='تبرعات' /></Grid>
    </section>);
  }

  private handleRemove(...args: any[]) {
    if (confirm('حذف التبرع؟')) {
      this.props.actions.removeDonation.apply(null, args);
    }
  }
}
