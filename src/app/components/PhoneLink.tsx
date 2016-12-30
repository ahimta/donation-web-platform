import * as React from 'react';

export default function PhoneLink({phone = ''}: {phone: string}) {
  return <a dir='ltr' href={`tel:${phone}`}>{phone}</a>;
}
