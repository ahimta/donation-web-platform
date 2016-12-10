export function getDonationRowClass(currentId: string, deliveredOrReceived: boolean, reserverId: string) {
  if (deliveredOrReceived) {
    return 'success';
  } else if (currentId === reserverId) {
    return 'danger';
  }  else if (reserverId) {
    return 'warning';
  } else {
    return '';
  }
}
