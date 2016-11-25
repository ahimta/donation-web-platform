/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputGroup, PageHeader, Row} from 'react-bootstrap';

interface INewFoodDonationProps {
};

interface INewFoodDonationState {
};

class NewFoodDonation extends React.Component<INewFoodDonationProps, INewFoodDonationState> {
  static propTypes = {
  };

  render() {
    return (
      <section>
        <PageHeader className='text-center'>تبرع بطعام</PageHeader>
        <Grid>
          <Form>
            <FormGroup controlId='foodDonationFoodType' dir='rtl'>
              <ControlLabel>نوع الطعام</ControlLabel>
              <FormControl componentClass='select' placeholder='vegetables'>
                <option value='fruits'>فواكه</option>
                <option value='vegetables'>خضار</option>
                <option value='misc'>منوع</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='foodDonationOccasion' dir='rtl'>
              <ControlLabel>المناسبة</ControlLabel>
              <FormControl componentClass='select' placeholder='wedding'>
                <option value='party'>حفلة</option>
                <option value='wedding'>زواج</option>
                <option value='buffet'>بوفيه مفتوح</option>
                <option value='other'>آخر</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='pickupTime' dir='rtl'>
              <ControlLabel>وقت الاستلام</ControlLabel>
              <Row>
                <Col xs={3}><FormControl type='number' placeholder='الساعة' /></Col>
                <Col xs={3}><FormControl type='number' placeholder='اليوم' /></Col>
                <Col xs={3}><FormControl type='number' placeholder='الشهر' /></Col>
                <Col xs={3}><FormControl type='number' placeholder='السنة' /></Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <FormControl type='text' dir='rtl'/>
                <InputGroup.Addon>الأطباق</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <FormControl type='tel' dir='rtl'/>
                <InputGroup.Addon>الجوال/الواتساب</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup controlId='foodDonationFoodPhotos' dir='rtl'>
              <ControlLabel>الصور</ControlLabel>
              <FormControl type='file' placeholder='الصور' />
            </FormGroup>

            <FormGroup controlId='foodDonationNotes' dir='rtl'>
              <ControlLabel>ملاحظات</ControlLabel>
              <FormControl componentClass='textarea' placeholder='ملاحظات' />
            </FormGroup>

            <FormGroup controlId='foodDonationLocation' dir='rtl'>
              <ControlLabel>الموقع</ControlLabel>
              <iframe
                width='100%'
                height='500em'
                frameBorder='0' style={{ border: 0 }}
                src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDzwYGquiVtVevyr4YS9hYc5F_IeI9Qhbc&q=Huraymila'
                allowFullScreen>
              </iframe>
            </FormGroup>

            <Button type='submit' bsStyle='success' bsSize='lg' block>تبرع</Button>
          </Form>
        </Grid>
      </section>
    );
  }
}

export default NewFoodDonation;
