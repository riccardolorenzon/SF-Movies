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
  onBoundsChanged() {
    console.log('bound change');
  }
  onZoomChanged() {
    var bounds = this.gmap.getMap().getBounds();
    var center = bounds.getCenter();
    var north_east = bounds.getNorthEast();
    var south_west = bounds.getSouthWest();

    var rect = [
      [north_east.lat(), north_east.lng()],
      [south_west.lat(), north_east.lng()],
      [north_east.lat(), south_west.lng()],
      [south_west.lat(), south_west.lng()]
    ];

    // send the request to the Node server
    var request = new Request(
      '/api/movies/' + north_east.lat() + '/' + north_east.lng() + '/' +
            south_west.lat() + '/' + south_west.lng() + '/');
    var _this = this;
    fetch(request)
    .then(function(response) {
      if (response.ok) {
        return response.text();
      }
    })
    .then(function(text) {
      var data = JSON.parse(text);
      data.forEach(function(element) {
        var myLatLng = {lat: element.loc[1], lng: element.loc[0]};
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: _this.gmap.getMap(),
          title: element.title + ' - ' + element.location
        });
      });
    })
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
        loadingMessage={'Movies will show up in a little while :)'}
        params={{v: '3.exp', key: 'AIzaSyCaAXe1p_-gIMrXlKuBDzfkJxJ8187GGD4'}}
        onMapCreated={this.onMapCreated}
        onZoomChanged={this.onZoomChanged.bind(this)}>
        onBoundsChanged={this.onBoundsChanged}
      </Gmaps>
    );
  }

};
