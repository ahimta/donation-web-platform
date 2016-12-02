import * as React from 'react';

export default class MockMap extends React.Component<{}, {}> {
  render() {
    return (
      <iframe
        width='100%'
        height='250em'
        frameBorder='0' style={{ border: 0 }}
        src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDzwYGquiVtVevyr4YS9hYc5F_IeI9Qhbc&q=Huraymila'
        allowFullScreen>
      </iframe>
    );
  }
}