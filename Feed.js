
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

export default class HomeScreen extends Component {
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
      loading: true,
      accessToken: "",
      refreshing: false,
        type: "",
       filter: "latest",
      latestBg: "rgb(30,75,113)",
        topsellingBg: "#fff",
        latestText: "#fff",
        topsellingText: "rgb(30,75,113)",
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

         if(responseJson.status)
         {
            
           this.setState({ status: true});
         }
         else
         {
          this.setState({ status: false});
         }

        
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

              if(responseJson.status)
           {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
               this.setState({
                  clonelist: ds.cloneWithRows(responseJson.category)
               });
               this.setState({ status: true});
             
            }
            else
            {
              this.setState({ status: false});
            }
         
        })
        .catch((error) => {
           console.error(error);
        });

        this.setState({ loading: false});
    
}

async setLatest()
{
   await this.setState({
        filter: "latest",
      latestBg: "rgb(30,75,113)",
        topsellingBg: "#fff",
        latestText: "#fff",
        topsellingText: "rgb(30,75,113)"
    });
    console.log(this.state.filter);
}
async setTopSelling()
{
   await this.setState({
        filter: "topselling",
      latestBg: "#fff",
        topsellingBg: "rgb(30,75,113)",
        topsellingText: "#fff",
        latestText: "rgb(30,75,113)"
    });
    console.log(this.state.filter);
}

  render() {
    const { navigate } = this.props.navigation;
     if(this.state.loading)
    {
      return(
        <View style={{flex: 1, paddingTop:25}}>
              <View style = {{padding: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 30, color: 'rgb(30,75,113)'}}>7cs B2B</Text></View>
             <View>
                 
         
             <View style= {{ marginTop: 5, flexDirection: 'row', height: 60, padding: 10}}>
                    <TouchableHighlight 
                 onPress={ () => this.setLatest() }
                  style={{ backgroundColor: this.state.latestBg, height: 60, borderWidth: 1, borderColor: '#fff',  borderRightWidth: 1, borderRightColor: 'rgb(30,75,113)', flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: this.state.latestText }}>Latest</Text>
                  </TouchableHighlight>

                     <TouchableHighlight 
                  onPress={ () => this.setTopSelling() }
                  style={{ backgroundColor: this.state.topsellingBg, height: 60, borderWidth: 1, borderColor: '#fff',  borderLeftWidth: 1, borderLeftColor: 'rgb(30,75,113)', flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: this.state.topsellingText }}>Top Selling</Text>
                  </TouchableHighlight>
                 </View>
                  <View style={{borderWidth: 2, borderColor: '#fff', borderTopWidth: 2, borderTopColor: 'rgb(30,75,113)', paddingVertical: 25, paddingHorizontal: 10, backgroundColor: '#fff', top: 5, marginHorizontal: 10, height: 400}}>
                        <ListView
                               refreshControl={
                                        <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefresh.bind(this)} />
                                    }
                                  dataSource={this.state.clonelist}
                                  renderRow = {
                                          (rowData) => 
                                                          <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: rowData, filter: this.state.filter }) }>
                                                              <Text style={styles.categories}>
                                                                  {rowData}
                                                                </Text>
                                                            </TouchableHighlight>
                                                      
                                                       
                                  }
                                  enableEmptySections = {true}
                                      
                                  
                      >

                      </ListView>
                           <View style = {styles.activityContainer}>
        <ActivityIndicator
                     animating = {this.state.loading}
                     color = 'rgb(30,75,113)'
                     size = "large"
                     style = {styles.activityIndicator}/>
          </View>   
                     
                  </View>
           
            
              
          </View>
                 
              
         
         
        </View>
            

                     );
    }
    else
    {
      return (
        <View style={{flex: 1, paddingTop:25}}>
              <View style = {{padding: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 30, color: 'rgb(30,75,113)'}}>7cs B2B</Text></View>
             <View>
                 
         
             <View style= {{ marginTop: 5, flexDirection: 'row', height: 60, padding: 10}}>
                    <TouchableHighlight 
                 onPress={ () => this.setLatest() }
                  style={{ backgroundColor: this.state.latestBg, height: 60, borderWidth: 1, borderColor: '#fff',  borderRightWidth: 1, borderRightColor: 'rgb(30,75,113)', flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: this.state.latestText }}>Latest</Text>
                  </TouchableHighlight>

                     <TouchableHighlight 
                  onPress={ () => this.setTopSelling() }
                  style={{ backgroundColor: this.state.topsellingBg, height: 60, borderWidth: 1, borderColor: '#fff',  borderLeftWidth: 1, borderLeftColor: 'rgb(30,75,113)', flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: this.state.topsellingText }}>Top Selling</Text>
                  </TouchableHighlight>
                 </View>
                  <View style={{borderWidth: 2, borderColor: '#fff', borderTopWidth: 2, borderTopColor: 'rgb(30,75,113)', paddingVertical: 25, paddingHorizontal: 10, backgroundColor: '#fff', top: 5, marginHorizontal: 10, height: 400}}>
                      
                           <ListView
                               refreshControl={
                                        <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefresh.bind(this)} />
                                    }
                                  dataSource={this.state.clonelist}
                                  renderRow = {
                                          (rowData) => 
                                                          <TouchableHighlight style={styles.catBtn} onPress={ () => navigate('List', {cat: rowData, filter: this.state.filter }) }>
                                                              <Text style={styles.categories}>
                                                                  {rowData}
                                                                </Text>
                                                            </TouchableHighlight>
                                                      
                                                       
                                  }
                                  enableEmptySections = {true}
                                      
                                  
                      >

                      </ListView>
                     
                   

                        {this.state.status ? ( <TouchableHighlight style={styles.button} onPress={ () => navigate('More') }>
                          <Text style={styles.buttonText}>
                            Show More
                            </Text>
                        </TouchableHighlight> ) : (<TouchableHighlight style={styles.button} onPress={ () => navigate('UserPrefer') }>
                          <Text style={styles.buttonText}>
                            Click to Select Your Preferrences
                            </Text>
                        </TouchableHighlight>
                        )}
                     
                  </View>
           
            
              
          </View>
                 
              
         
         
        </View>
      );
    }
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
    backgroundColor: 'rgb(30,75,113)',
      borderRadius: 50,
      
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
   
  buttonText: {
    fontSize: 18,
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


