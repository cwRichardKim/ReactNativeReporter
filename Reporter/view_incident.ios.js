'use strict';

import React, {
  AppRegistry,
  MapView,
  Component,
  Image,
  ListView,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  View,
} from 'react-native';

var { PropTypes } = React;

var If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        }
        else {
            return false;
        }
    }
});

var region =  {
        latitude: 42.408994,
        longitude: -71.119804,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }

var AnnotationExample = React.createClass({

  getInitialState() {
    return {
      isFirstLoad: true,
      annotations: [],
      mapRegion: region,
    };
  },

  render() {
    if (this.state.isFirstLoad) {
      var onRegionChangeComplete = (region) => {
        this.setState({
          isFirstLoad: false,
          annotations: [{
            longitude: region.longitude,
            latitude: region.latitude,
            ...this.props.annotation,
          }],
        });
      };
    }

    return (
      <MapView
        style={styles.map}
        onRegionChangeComplete={onRegionChangeComplete}
        region={this.state.mapRegion}
        annotations={this.state.annotations}
      />
    );
  },

});

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
      <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.container}>

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
        <If test={incident.image}>
          <View style={styles.card}>
            <Image source={incident.image} />
          </View>
        </If>
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

          <AnnotationExample style={styles.map}/>

        <Text style={styles.sub_title}> Departments </Text>
        <View style={styles.card}>
          <Text style={styles.sub_text}>{incident.groups} </Text>
        </View>

        <Text style={styles.sub_title}> Assigned To </Text>
        <View style={styles.card}>
          <Text style={styles.sub_text}>{incident.assigned_to} </Text>
        </View>

      </ScrollView>
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
  map: {
    height: 150,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
  sub_text: {
    fontSize:16,
    textAlign: 'center',
    fontWeight: 'bold',
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