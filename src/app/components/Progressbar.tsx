import * as React from 'react';
import { ProgressBar, Well } from 'react-bootstrap';

interface IProps {
  readonly children?: any;
  readonly data: any;
  readonly emptyPhrase?: string;
}

export default function Progressbar({children, data, emptyPhrase = 'لا يوجد بيانات حاليا'}: IProps) {
  if (data) {
    if (data.length === 0) {
      return <Well className='lead text-center'>{emptyPhrase}</Well>;
    } else {
      return <div>{children}</div>;
    }
  } else {
    return <ProgressBar now={100} striped />;
  }
}
