import * as React from 'react';

export default function HttpLink({url = ''}: {url: string}) {
  const sanitizedUrl = url.replace(/javascript:|mailto:|tel:/, '');
  return <a dir='ltr' href={sanitizedUrl} target='_blank'>{sanitizedUrl}</a>;
}
