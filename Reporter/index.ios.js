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
  View,
} from 'react-native';

var Table = require('./table.ios');
var NewIncident = require('./new_incident.ios');
var ViewIncident= require('./view_incident.ios');

class Reporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'table'
    };
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'table'}
          systemIcon="featured"
          onPress={() => {
              this.setState({
                  selectedTab: 'table',
              });
          }}>
            <Table/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'new_incident'}
          systemIcon="featured"
          onPress={() => {
                this.setState({
                    selectedTab: 'new_incident',
                });
          }}>
          <NewIncident/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

}

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('Reporter', () => Reporter);
