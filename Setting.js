
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
    Image,
  ListView,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';

const ACCESS_TOKEN = 'access_token';
export default class Setting extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
   tabBarIcon: () => ( <Ionicons style={{alignSelf: 'center'}} name="gear" size={24} color="rgb(30,75,113)" />)
  }
async logout()
{
   
   try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        const { navigate } = this.props.navigation;
        navigate('Login');
    } catch (error) {
        console.log('storage error');
        // Error saving data
    }
}
  render() {

const { navigate } = this.props.navigation;
   return(
    
        
      <View style={{flex: 1, paddingTop:25}}>
          <View style = {{padding: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 30, color: 'rgb(30,75,113)'}}>7cs B2B</Text></View>
          
            <View style={{margin: 10}}>
                 <View style = {{padding: 5, backgroundColor: '#fff', marginBottom: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, color: 'rgb(30,75,113)'}}>Account</Text>

                 </View>
                 
               
                <TouchableHighlight onPress = { () => navigate('UserPrefer') }>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>Preferences</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>Notifications</Text>
                </TouchableHighlight>
                 <TouchableHighlight onPress = {() => {this.logout()}}>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>Logout</Text>
                </TouchableHighlight>
            
            </View>
                
                <View style={{margin: 10}}>
                 <View style = {{padding: 5, backgroundColor: '#fff', marginBottom: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, color: 'rgb(30,75,113)'}}>Support</Text>

                 </View>
                 
                 <TouchableHighlight>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>About</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>Terms of Service</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>Privacy Policy</Text>
                </TouchableHighlight>
                 <TouchableHighlight>
                   <Text style={{padding: 10, textAlign: 'center', marginBottom: 1, backgroundColor: '#fff', color: 'rgb(30,75,113)', fontSize: 18}}>Contact Us</Text>
                </TouchableHighlight>
            
            </View>
                
        
        
       
      </View>
  
  ); }
}
