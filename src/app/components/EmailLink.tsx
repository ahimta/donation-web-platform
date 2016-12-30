import * as React from 'react';

export default function EmailLink({email = ''}: {email: string}) {
  return <a dir='ltr' href={`mailto:${email}`} target='_blank'>{email}</a>;
}
