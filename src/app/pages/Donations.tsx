/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Breadcrumb, Button, ButtonGroup, Grid, PageHeader} from 'react-bootstrap';

import * as database from '../database';
import FoodDonationsPanel from '../components/FoodDonationsPanel';
import NonfoodDonationsPanel from '../components/NonfoodDonationsPanel';

interface IDonationsProps {}

interface IDonationsState {
  foodDonations: any[];
  nonfoodDonations: any[];
}

export default class Donations extends React.Component<IDonationsProps, IDonationsState> {
  public static contextTypes = {
    currentRole: React.PropTypes.string
  };

  public context: {
    currentRole: string
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      foodDonations: [],
      nonfoodDonations: []
    };
  }

  componentDidMount() {
    this.update();
  }

  render() {
    const {currentRole} = this.context;
    const {foodDonations, nonfoodDonations} = this.state;

    return (
      <section>
        <PageHeader className='text-center'>التبرعات</PageHeader>

        <Grid>
          <Breadcrumb dir='rtl'>
            <Breadcrumb.Item href='#/'>الصفحة الرئيسية</Breadcrumb.Item>
            <Breadcrumb.Item active>التبرعات</Breadcrumb.Item>
          </Breadcrumb>
        </Grid>

        <Grid>
          <FoodDonationsPanel donations={foodDonations} onUpdate={this.update.bind(this)} />
          <NonfoodDonationsPanel donations={nonfoodDonations} onUpdate={this.update.bind(this)} />
        </Grid>

        <Grid className={currentRole === 'charity' ? 'hidden' : 'text-center'}>
          <ButtonGroup bsSize='lg' justified>
            <Button bsStyle='success' href='#/donations/donate/other'>تبرع بشيء آخر</Button>
            <Button bsStyle='success' href='#/donations/donate/food'>تبرع بطعام</Button>
          </ButtonGroup>
        </Grid>
      </section>
    );
  }

  private update() {
    database.getDonations('food').then((donations) => {
      const {nonfoodDonations} = this.state;
      this.setState({foodDonations: donations, nonfoodDonations});
    });

    database.getDonations('nonfood').then((donations) => {
      const {foodDonations} = this.state;
      this.setState({nonfoodDonations: donations, foodDonations});
    });
  }
}
