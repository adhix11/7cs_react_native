
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
  RefreshControl,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import LikeButton from './LikeButton';
import ModalPanel from './ModalPanel';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Maticons from 'react-native-vector-icons/Entypo';
//import Upload from './Upload';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

export default class MoreScreen extends Component {
   static navigationOptions = {
       tabBarLabel: 'Shop',
       tabBarIcon: () => ( <Maticons style={{alignSelf: 'center'}} name="shop" size={24} color="rgb(30,75,113)" />)
 
    
}
constructor(props)
{
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = 
    {
        uid: "",
      email: "",
      accessToken: "",

        type: "",
      result: "",
      status: false,
      clonelist: ds.cloneWithRows([])
    }
    
    
    
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
   
   try {
        await AsyncStorage.setItem(ACCESS_TOKEN, responseData);
    } catch (error) {
        
        // Error saving data
    }
}


async getToken(){
    try {
      const value = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (value !== null){
            // We have data!!
          
            
          }
        } catch (error) {
            
          // Error retrieving data
        }

}

_onRefresh() {
    this.setState({refreshing: true});
    let user_id = this.state.uid;
     let url = 'http://45.76.35.84/api/fetch_category.php?id=' + user_id;
    console.log(url);
    fetch(url, {
         method: 'GET'
      })
    
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
            clonelist: ds.cloneWithRows(responseJson.category)
         });
      })
    
      .catch((error) => {
         console.error(error);
      });
      this.setState({refreshing: false});
   
  }

async componentDidMount(){
    await this.setSession();
     let user_id = this.state.uid;
 
   
      let url = 'http://45.76.35.84/api/fetch_category.php?id=' + user_id;
      console.log(url);
     await fetch(url, {
           method: 'GET'
          
        })
       .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);


          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
              clonelist: ds.cloneWithRows(responseJson.category)
           });
        })
        .catch((error) => {
           console.error(error);
        });

    
}
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={{flex: 1, paddingTop:25}}>
            <View style = {{padding: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 30, color: 'rgb(30,75,113)'}}>7cs B2B</Text></View>
           <View>
               
       
           <View style= {{ marginTop: 5, flexDirection: 'row', height: 60, padding: 10}}>
                  <TouchableHighlight 
               onPress={ () => navigate('Latest') }
                style={{ backgroundColor: '#fff', height: 60, borderWidth: 1, borderColor: '#fff',  borderRightWidth: 1, borderRightColor: 'rgb(30,75,113)', flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'rgb(30,75,113)' }}>Latest</Text>
                </TouchableHighlight>

                   <TouchableHighlight 
                onPress={ () => navigate('Topselling') }
                style={{ backgroundColor: '#fff', height: 60, borderWidth: 1, borderColor: '#fff',  borderLeftWidth: 1, borderLeftColor: 'rgb(30,75,113)', flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'rgb(30,75,113)' }}>Top Selling</Text>
                </TouchableHighlight>
               </View>
                <View style={{borderWidth: 2, borderColor: '#fff', borderTopWidth: 2, borderTopColor: 'rgb(30,75,113)', paddingVertical: 25, paddingHorizontal: 10, backgroundColor: '#fff', top: 5, marginHorizontal: 10, height: 400}}>
                    <ScrollView>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Dubai'}) }>
                        <Text style={styles.categories}>
                            Dubai
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Kolkata'}) }>
                        <Text style={styles.categories}>
                            Kolkata
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Finja'}) }>
                        <Text style={styles.categories}>
                            Finja
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Turkey'}) }>
                        <Text style={styles.categories}>
                            Turkey
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Kuwait'}) }>
                        <Text style={styles.categories}>
                            Kuwait
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Singapore'}) }>
                        <Text style={styles.categories}>
                            Singapore
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Mumbai'}) }>
                        <Text style={styles.categories}>
                            Mumbai
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Rajkot'}) }>
                        <Text style={styles.categories}>
                            Rajkot
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Delhi'}) }>
                        <Text style={styles.categories}>
                            Delhi
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Coimbatore'}) }>
                        <Text style={styles.categories}>
                            Coimbatore
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Hyderabad'}) }>
                        <Text style={styles.categories}>
                            Hyderabad
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Ahmedabad'}) }>
                        <Text style={styles.categories}>
                            Ahmedabad
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Jaipur'}) }>
                        <Text style={styles.categories}>
                            Jaipur
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Nellore'}) }>
                        <Text style={styles.categories}>
                           Nellore
                          </Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: 'Sri Lanka'}) }>
                        <Text style={styles.categories}>
                            Sri Lanka
                          </Text>
                      </TouchableHighlight>
                    </ScrollView>
                </View>
         
          
            
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
catBtn: {
    height: 50,
    backgroundColor: 'rgb(30,75,113)',
    alignSelf: 'stretch',
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 50
},
    categories:{
        color: '#fff'
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
    width: 300,
    height: 300,
    alignSelf: 'center'
  }
});


