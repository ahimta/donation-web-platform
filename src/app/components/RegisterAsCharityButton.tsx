import classNames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';

import UserRole from '../types/UserRole';

export default function RegisterAsCharityButton({margin = false, userRole}: { margin?: boolean, userRole: UserRole }) {
  const style = margin ? { marginBottom: '1em' } : {};
  return (<Button bsStyle='success' className={classNames({ hidden: userRole === 'charity' })} href='#/register/charity'
    style={style} block>
    سجل كجمعية
  </Button>);
}
