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
  RefreshControl,
} from 'react-native';


var REQUEST_URL = 'http://incidentreport-120.herokuapp.com/incidents.json';
var ViewIncident= require('./view_incident.ios');

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing: false,
    };
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
  }

  selectIncident(incident){
    this.props.navigator.push({
        title: incident.title,
        component: ViewIncident,
        passProps: {incident},
      });
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.reverse()),
          loaded: true,
        });
      })
      .then(() => {
        this.setState({refreshing: false});
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
      }
        dataSource={this.state.dataSource}
        renderRow={this.renderIncident.bind(this)}
        style={styles.listView}
      >
      </ListView>
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
      <TouchableOpacity onPress={() => this.selectIncident(incident)}>
        <View
        style={styles.incident}
        >

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

          <View style={[styles.incident_type, incident_type]}>
            <Text style={styles.incident_type_display}> {incident.incident_type} </Text>
          </View>

        </View>
        </TouchableOpacity>
    );
  }

}

var styles = StyleSheet.create({
  incident: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height:110,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#FFFFFF',
    borderRadius:3,
    shadowColor: '#666666',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
        height:3,
        width:3,
    },
  },
  incident_type:{
    height:22,
    alignSelf: 'flex-end',
    margin: 10,
    padding:5,
    borderRadius:2,
  },
  incident_type_housing:{
    backgroundColor:'#40a3e4',
  },
  incident_type_dining:{
    backgroundColor:'#f88148',
  },
  incident_type_environment:{
    backgroundColor:'#2eb37c',
  },
  incident_type_health:{
    backgroundColor:'#af8cd1',
  },
  incident_type_display:{
    fontSize:10,
    color:'white',
  },
  incident_body:{
    flex: 1,
    flexDirection: 'column',
  },
  title_container:{
    flexDirection:'row',
    flex:1,
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
    marginLeft:20,
    marginRight:25,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color:'#337ab7',
  },
  listView: {
    paddingTop: 10,
    backgroundColor: '#e8ecf3',
  },
});

module.exports = Table;
