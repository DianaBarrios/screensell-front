import React, { Component } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import GoogleMapReact from 'google-map-react';

const Marker = () => (
  <div style={{ color: 'red', fontSize: '50px', position: 'absolute' }}>
    {' '}
    <FaMapMarkerAlt />
  </div>
);

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 32.534889,
      lng: -117.040639,
    },
    zoom: 15,
  };

  render() {
    return (
      <div style={{ height: '20rem', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDuWHpQkj9a2HTkaaMXieXGZ2Q2A7KOzgs' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={32.534889} lng={-117.040639} text="Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
