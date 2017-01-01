import * as React from 'react';
import { Image, Panel } from 'react-bootstrap';

export default function PhotoPanel({footer = '', header, photoUrl = ''}: { footer?: any, header: string, photoUrl: string }) {
  if (photoUrl.match(/^https:\/\/i.imgur.com\/|^https:\/\/lh3.googleusercontent.com\//)) {
    return (<Panel bsStyle='primary' className={photoUrl ? 'text-center' : 'hidden'} footer={footer} header={header}
      collapsible defaultExpanded>
      <Image alt={header} src={photoUrl} responsive thumbnail />
    </Panel>);
  } else {
    return null;
  }
}
