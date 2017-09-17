
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
  TouchableHighlight,
  RefreshControl
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
// import Image from 'react-native-image-progress';
// import ProgressCircle from 'react-native-progress/Circle';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';
export default class Order extends Component {
  static navigationOptions = {
    tabBarLabel: 'Order',
      tabBarIcon: () => ( <Ionicons style={{alignSelf: 'center'}} name="shopping-bag" size={24} color="rgb(30,75,113)" />)
  }

constructor(props)
{
  console.log("called");
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = 
    {
         refreshing: false,
      email: "",
      accessToken: "",
        type: "",
      result: "",
      clonelist: ds.cloneWithRows([])
    }
    
   
}
_onRefresh() {
    this.setState({refreshing: true});
    let user_id = this.state.uid;
 console.log("USer id " + user_id);
    let url = 'http://45.76.35.84/api/customer_order_history.php?id=' + user_id;
    fetch(url, {
         method: 'GET'
      })
    
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
            clonelist: ds.cloneWithRows(responseJson.product)
         })
      })
    
      .catch((error) => {
         console.error(error);
      });
      this.setState({refreshing: false});
   
  }

async setSession(){
     try {
      const value = await AsyncStorage.getItem(ACCESS_TOKEN);
      const user_id = await AsyncStorage.getItem(USER_ID);
      if (value !== null){
            // We have data!!
          console.log("Set Session");
            console.log(user_id);
           this.setState({accessToken: value});
           this.setState({uid: user_id});
          }
        } catch (error) {
            console.log(error);
          // Error retrieving data
        }
}
async storeToken(responseData)
{
   console.log(responseData);
   try {
        await AsyncStorage.setItem(ACCESS_TOKEN, responseData);
    } catch (error) {
        console.log('storage error');
        // Error saving data
    }
}


async getToken(){
    try {
      const value = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (value !== null){
            // We have data!!
          console.log("has storage");
            console.log(value);
          }
        } catch (error) {
            console.log(error);
          // Error retrieving data
        }

}

async componentDidMount(){
    console.log("hello");
     await this.setSession();
 let user_id = this.state.uid;
 console.log("USer id " + user_id);
    let url = 'http://45.76.35.84/api/customer_order_history.php?id=' + user_id;
    fetch(url, {
         method: 'GET'
      })
		
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
            clonelist: ds.cloneWithRows(responseJson.product)
         })
      })

      .catch((error) => {
         console.error(error);
      });
    
}
  render() {
    
    
    return (
      <View style={{flex: 1, paddingTop:25}}>
          <View style = {{padding: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 30, color: 'rgb(30,75,113)'}}>7cs B2B</Text></View>
          
          <View style={{margin: 10}}>
             <View style = {{padding: 10, backgroundColor: '#fff', marginBottom: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 24, color: 'rgb(30,75,113)'}}>My Orders</Text></View>
              <ListView  
              refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)} />
              }
              style={{marginBottom: 105}}
            dataSource={this.state.clonelist}
            renderRow = {
                    (rowData) => <View style={{ flexDirection: 'row', alignSelf: 'stretch', paddingVertical: 20, paddingHorizontal: 30, marginBottom: 1, backgroundColor: '#fff'}}>
                                  
                                    <Image style={{flex: 1, width: 100, height: 150, alignSelf: 'center'}} source={{uri: rowData.img_url}}/>
                                    <View style={{ flex: 1, width: 100, marginLeft: 20, justifyContent: 'center',}}>
                                        <Text style={{fontSize: 16, marginBottom: 10, color: 'rgb(30,75,113)'}}>{rowData.status}  </Text>
                                        <Text style={{fontSize: 16, marginBottom: 10}}>{rowData.date} </Text>
                                        <Text style={{fontSize: 16, marginBottom: 10}}>QTY: {rowData.qty} </Text>
                                        
                                        
                                    </View>
                                </View>
                                 
            }
            enableEmptySections = {true}
                
            
            ></ListView>
            
          </View>
        
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
      width: 300,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  },
    stretch: {
    width: 150,
    height: 200
  }
});

