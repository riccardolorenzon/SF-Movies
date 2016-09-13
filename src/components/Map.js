import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
  lat: 37.7577627,
  lng: -122.4726194
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.onZoomChanged = this.onZoomChanged.bind(this)
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }
  onZoomChanged() {
    console.log('onZoomChanged');
    console.log('zoom:', this.gmap.getMap().getZoom());
  }
  render() {
    return (
      <Gmaps
        ref={(googleMap) => this.gmap = googleMap}
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyDvLAjTIxnuVk8L3abln7bBmLNdXBZ60v4'}}
        onMapCreated={this.onMapCreated}
        onZoomChanged={this.onZoomChanged.bind(this)}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <Circle
          lat={coords.lat}
          lng={coords.lng}
          radius={500}
          onClick={this.onClick} />
      </Gmaps>
    );
  }

};
