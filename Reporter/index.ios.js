/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  View,
} from 'react-native';

var Table = require('./table.ios');

class Reporter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
      style={styles.container}
      translucent={false}
      initialRoute={{
        title: 'Incidents',
        component: Table,
      }}
      >

      </NavigatorIOS>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Reporter', () => Reporter);
