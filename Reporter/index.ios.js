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
  View,
} from 'react-native';

var REQUEST_URL = 'http://incidentreport-120.herokuapp.com/incidents.json';

class Reporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderIncident}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderIncident(incident) {
    return (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title}>{incident.title}</Text>
        </View>
        <View style={styles.incident_filing_info}>
          <Text style={styles.user}>Filed by {incident.user}</Text>
        </View>
      </View>
    );
  }
}

var example_json = {
    "id":1,
    "title":"Example",
    "location":"South Hall",
    "severity":1,
    "incident_type":"Housing",
    "comments":"Example comments",
    "user":"Demo User",
    "groups":"Students",
    "status":0,
    "reported_by":null,
    "assigned_to":null,
    "created_at":"2016-03-11T19:52:46.401Z",
    "updated_at":"2016-03-11T19:52:46.401Z"
  };

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    height:70,
    borderWidth:1,
    marginBottom:15,
    backgroundColor:'#FFFFFF',
  },
  title_container:{
    height:20,
    flexDirection:'row',
    flex:1,
    borderWidth:1,
  },
  incident_filing_info:{
    flex: 1,
    flexDirection: 'row',
    borderWidth:1,
    height:20,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color:'blue',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Reporter', () => Reporter);
