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
      lat: 32.5018844,
      lng: -117.0382396,
    },
    zoom: 15,
  };

  render() {
    return (
      <div style={{ height: '20rem', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={32.5018844} lng={-117.0382396} text="Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
