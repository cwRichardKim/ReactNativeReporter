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
    if (incident.severity == '1'){
      var icon = require('./img/Severity1.png');
    }
    else if (incident.severity == '2'){
      var icon = require('./img/Severity2.png');
    }
    else if (incident.severity == '3'){
      var icon = require('./img/Severity3.png');
    }
    else{
      var icon = require('./img/Severity4.png');
    }

    return (
      <View style={styles.incident}>

        <View style={styles.incident_severity}>
          <Image source={icon} />
        </View>

        <View style={styles.incident_body}>
          <View style={styles.title_container}>
            <Text style={styles.title}>{incident.title}</Text>
          </View>
          <View style={styles.incident_filing_info}>
            <Text style={styles.user}>Filed by {incident.user}</Text>
          </View>
        </View>

        <View style={styles.incident_type}>
          <Text style={styles.incident_type_display}> {incident.incident_type} </Text>
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
  incident: {
    flex: 1,
    flexDirection: 'row',
    height:70,
    marginBottom:15,
    marginLeft:5,
    marginRight:5,
    backgroundColor:'#FFFFFF',
  },
  incident_type:{
    height:20,
    backgroundColor:'red',
    marginTop:40,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
  },
  incident_type_display:{
    fontSize:10,
  },
  incident_body:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    height:70,
    marginBottom:15,
    backgroundColor:'#FFFFFF',
  },
  title_container:{
    height:20,
    flexDirection:'row',
    flex:1,
    paddingTop:5,
  },
  incident_filing_info:{
    flex: 1,
    flexDirection: 'row',
    height:20,
  },
  severity_display:{
    fontSize:30,
  },
  incident_severity:{
    paddingTop:13,
    marginLeft:20,
    marginRight:25,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color:'#337ab7',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#e8ecf3',
  },
});

AppRegistry.registerComponent('Reporter', () => Reporter);
