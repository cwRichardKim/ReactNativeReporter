'use strict';


import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class ViewIncident extends Component {

  render() {
    var incident = this.props.incident;
    return (
      <View>
        <Text>
          {incident.title}
        </Text>
      </View>
    );
  }

}

module.exports = ViewIncident;