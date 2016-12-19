import * as React from 'react';
import { Button, Grid, Jumbotron } from 'react-bootstrap';

export default function NotFound() {
  return (<Grid>
    <Jumbotron className='text-center'>
      <h1>الصفحة غير موجودة</h1>
      <p dir='rtl'>هذا يعني أنك حاولت فتح صفحة محذوفة أو غير موجودة أو ليس لديك صلاحية للاطلاع عليها</p>
      <p><Button bsSize='lg' bsStyle='success' href='#/' block>إذهب إلى الصفحة الرئيسية</Button></p>
    </Jumbotron>
  </Grid>);
}
