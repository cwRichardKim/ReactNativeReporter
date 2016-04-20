'use strict';


import React, {
  AppRegistry,
  AlertIOS,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  NavigatorIOS,
} from 'react-native';

var MapView = React.createClass({

    componentDidMount: function() {

      var sitepoint = new google.maps.LatLng(-37.805723, 144.985360);

      var mapOptions = {
              zoom: 3,
              center: sitepoint
          },
          map = new google.maps.Map(React.findDOMNode(this), mapOptions),
          marker = new google.maps.Marker({
           map:map,
           draggable:true,
           animation: google.maps.Animation.DROP,
           position: sitepoint
      });

      this.setState({
        map: map
      });
    },

    render: function() {
        return (
            <div id="map"><span>Map Would be Here !!</span></div>
        );
    }
});