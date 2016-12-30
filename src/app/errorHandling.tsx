import { hashHistory } from 'react-router';

export function redirectToErrorPage() {
  hashHistory.replace('/404');
}
