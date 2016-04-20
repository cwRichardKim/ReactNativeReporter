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

import MapView from 'react-native-maps';

class ViewIncident extends Component {

  render() {
    var incident = this.props.incident;
    var icon;
    var incident_type;
    var status;
    var marker = {
        myLatLng: {'latitude': 42.408994, 'longitude': -71.119804},
        title: "Lane Hall",
        description: "Incident Location"
      };
    var regionText = {
      latitude: '0',
      longitude: '0',
      latitudeDelta: '0',
      longitudeDelta: '0',
    };
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
    if (incident.status == ">0") {
      status = "NOT STARTED";
    } else if (incident.status == ">1") {
      status = "IN PROGRESS";
    } else {
      status = "COMPLETED";
    }
    return (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title}>
            {incident.title}
          </Text>
        </View>

        <View style={styles.incident_filing_info}>
          <Text style={styles.user}>Filed by {incident.user}</Text>
        </View>

        <View style={styles.card_main}>

          <View style={styles.body}>
            <Text style={styles.user}>{incident.user} posted</Text>
            <View style={styles.separator} />
            <View style={styles.commnents_container}>
              <Text> {incident.comments} </Text>
            </View>
          </View>

          <View style={incident_type}>
            <Text style={styles.incident_type_display}> {incident.incident_type} </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.status}> STATUS: {status}</Text>
        </View>

        <Text style={styles.sub_title}> Urgency </Text>
        <View style={styles.card}>
          <View style={styles.incident_severity}>
            <Image source={icon} />
          </View>
        </View>
        <Text style={styles.sub_title}> Location </Text>
        <View style={styles.card}>
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude: 42.408994,
              longitude: -71.119804,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
              }}
          >
              <MapView.Marker 
                  coordinate={marker.myLatLng}
                  title={marker.title}
                  description={marker.description}
              />
          </MapView>
        </View>

        <Text style={styles.sub_title}> Departments </Text>
        <View style={styles.card}>
          <Text style={styles.sub_text}>{incident.groups} </Text>
        </View>

        <Text style={styles.sub_title}> Assigned To </Text>
        <View style={styles.card}>
          <Text style={styles.sub_text}>{incident.assigned_to} </Text>
        </View>

      </View>
    );
  }

}

var styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'left',
    color:'#3D5A6A',
  },
  sub_title: {
    fontSize: 20,
    textAlign: 'left',
    color:'#3D5A6A',
    marginBottom: 5,
  },
   container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#eceff3'
  },
  maps: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sub_text: {
    fontSize:16,
    textAlign: 'center',
  },
  separator: {
    marginTop: 5,
    marginBottom: 15,
    height: 1,
    backgroundColor: '#dddddd',
  },
  status: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title_container: {
    marginBottom: 10,
  },
  incident_severity:{
    marginLeft: 155,
  },
  incident_filing_info:{
    height:20,
    marginBottom: 15,
  },
  commnents_container: {
    flex: 1,
    flexDirection: 'column',
  },
  user: {
    fontSize: 17,
  },
  card: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 15,
    marginBottom: 15,
  },
    card_main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 10,
    marginBottom: 15,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  incident_type_housing:{
    height:20,
    marginTop:0,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#40a3e4',
  },
  incident_type_dining:{
    height:20,
    marginTop:0,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#f88148',
  },
  incident_type_environment:{
    height:20,
    marginTop:0,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#2eb37c',
  },
  incident_type_health:{
    height:20,
    marginTop:0,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#af8cd1',
  },
  incident_type_display:{
    fontSize:10,
    color:'white',
  },
});
module.exports = ViewIncident;