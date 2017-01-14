/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import ReactGA from 'react-ga';

export default function Footer() {
  return (
    <footer>
      <a href='https://sa.linkedin.com/in/ahimta' target='_blank' rel='noopener'
        onClick={() => ReactGA.event({category: 'Footer', action: 'Clicking', label: 'LinkedIn URL'})}>
        <p className='text-center lead' dir='rtl'>
          ©
          2016
          عبدالله الأنصاري
        </p>
      </a>
    </footer>
  );
}
