import * as React from 'react';

export default function PhoneLink({phone}: {phone: string}) {
  return <a dir='rtl' href={`tel:${phone}`}>{phone}</a>;
}
