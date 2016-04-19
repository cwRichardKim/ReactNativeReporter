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
          Loading incidents...
        </Text>
      </View>
    );
  }

  renderIncident(incident) {
    var icon;
    var incident_type;
    if (incident.severity == '1'){
      icon = require('./img/Severity1.png');
    }
    else if (incident.severity == '2'){
      icon = require('./img/Severity2.png');
    }
    else if (incident.severity == '3'){
      icon = require('./img/Severity3.png');
    }
    else{
      icon = require('./img/Severity4.png');
    }

    if (incident.incident_type=="Housing"){
      incident_type = styles.incident_type_housing;
    }
    else if(incident.incident_type == "Environmental Safety"){
      incident_type = styles.incident_type_environment;
    }
    else if(incident.incident_type == "Dining"){
      incident_type = styles.incident_type_dining;
    }
    else{
      incident_type = styles.incident_type_health;
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

        <View style={incident_type}>
          <Text style={styles.incident_type_display}> {incident.incident_type} </Text>
        </View>

      </View>
    );
  }
}

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
  incident_type_housing:{
    height:20,
    marginTop:40,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#40a3e4',
  },
  incident_type_dining:{
    height:20,
    marginTop:40,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#f88148',
  },
  incident_type_environment:{
    height:20,
    marginTop:40,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#2eb37c',
  },
  incident_type_health:{
    height:20,
    marginTop:40,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#af8cd1',
  },
  incident_type_display:{
    fontSize:10,
    color:'white',
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
