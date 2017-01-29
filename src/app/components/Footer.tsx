/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import ReactGA from 'react-ga';

export default function Footer() {
  return (
    <footer>
      <p className='text-center' dir='rtl'>
        بعض الأيقونات المستخدمة من تصميم&nbsp;
          <a href='https://www.flaticon.com/authors/roundicons' target='_blank' rel='noopener'>Roundicons</a>&nbsp;
          تحت رخصة&nbsp;
          <a href='CC 3.0 BY' target='_blank' rel='noopener'>CC 3.0 BY</a>
      </p>
      <p className='text-center' dir='rtl'>
        <a href='https://sa.linkedin.com/in/ahimta' target='_blank'
          onClick={() => ReactGA.event({ category: 'Footer', action: 'Clicking', label: 'LinkedIn URL' })}>
          &copy;
          2017
          عبدالله الأنصاري
        </a>
      </p>
    </footer>
  );
}
