/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';

interface IFooterProps {};

interface IFooterState {};

class Footer extends React.Component<IFooterProps, IFooterState> {
  render() {
    return (
      <footer>
        <a target='_blank' href='https://sa.linkedin.com/in/ahimta'>
          <p className='text-center lead' dir='rtl'>
            ©
            2016
            عبدالله الأنصاري
          </p>
        </a>
      </footer>
    );
  }
}

export default Footer;
