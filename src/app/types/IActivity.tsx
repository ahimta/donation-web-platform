interface IActivity {
  actionName: ('cancel-reservation' | 'delivery' | 'donation' | 'reservation');
  datetime: {
    years: number;
    months: number;
    date: number; // zero-indexed day of month
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  donationId: string;
  donationType: ('food' | 'nonfood');
  userId: string;
  userRole: ('charity' | 'user');
}

export default IActivity;
