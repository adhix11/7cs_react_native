import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ListView,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight,
  Alert

} from 'react-native';

import { CheckboxGroup } from 'react-native-material-design';
//import Upload from './Upload';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

export default class UserPreferScreen extends Component {
   
constructor(props)
{
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = 
    {
       refreshing: false,
        uid: "",
      email: "",
      modaluri: "",
      accessToken: "",
        type: "",
        modalVisible: false,
      result: "",
      status: false,
      loading: true,
      checked: [],
      category: [],
      clonelist: ds.cloneWithRows([])
    }
    
    this.precheck();
    
}



async precheck(){
   // console.log("hello");
    
  await this.setSession();
   let user_id = this.state.uid;
   
      let url = 'http://45.76.35.84/api/get_category.php?id=' + user_id;
      
     await fetch(url, {
           method: 'GET'
          
        })
       .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
           this.setState({ checked: responseJson.checked });
           this.setState({ status: true});
        })
        .catch((error) => {
           console.error(error);
        });

    this.setState({ loading: false});
}

async setUserPrefer() 
{
    try 
    {
      
      let uid = await AsyncStorage.getItem(USER_ID);

      
            // this.redireu
        
            
            let response = await fetch('http://45.76.35.84/api/put_category.php',{
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                
                                  id: uid,
                                  category: this.state.category
                               
                              })
                            });
            let res = await response.json();
            if (response.status >= 200 && response.status < 300) 
            {
              if(res.status)
              {
                 // this.getToken();
                  
                 Alert.alert('Thank you','Now you can get updates on selected Preferences');
                  
              }
              else
              {
               
                  Alert.alert('Something went wrong','Try again after sometime');
              }
              
             // this.redirect('root');
            } 
            else
            {
              Alert.alert('Something went wrong','Try again after sometime');
            }
         
         
         
      }
      catch(error)
    {
        
        //this.redirect('login');
        Alert.alert('Something went wrong', 'Try again after sometime');
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



async setCategory(values) {

  await this.setState({category: values});
  console.log(this.state.category);
}


  render() {
     if(this.state.loading)
    {
      return(

        <View style = {styles.activityContainer}>
        <ActivityIndicator
                     animating = {this.state.loading}
                     color = 'rgb(30,75,113)'
                     size = "large"
                     style = {styles.activityIndicator}/>
          </View>       

                     );
    }
    else
    {


        return (
          <View style={{flex: 1, margin: 20}}>
            
             <ScrollView>
             { this.state.status ? ( <CheckboxGroup

                onSelect={(values) => { this.setCategory(values) }}
                checked={this.state.checked}
                items={[{
                    value: 'Dubai', label: 'Dubai'
                }, {
                    value: 'Kolkata', label: 'Kolkata'
                }, {
                    value: 'Finja', label: 'Finja'
                }, {
                    value: 'Turkey', label: 'Turkey'
                }, {
                    value: 'Kuwait', label: 'Kuwait'
                }, {
                    value: 'Singapore', label: 'Singapore'
                }, {
                    value: 'Mumbai', label: 'Mumbai'
                }, {
                    value: 'Rajkot', label: 'Rajkot'
                }, {
                    value: 'Delhi', label: 'Delhi'
                }, {
                    value: 'Coimbatore', label: 'Coimbatore'
                }, {
                    value: 'Hyderabad', label: 'Hyderabad'
                }, {
                    value: 'Ahmedabad', label: 'Ahmedabad'
                }, {
                    value: 'Jaipur', label: 'Jaipur'
                }, {
                    value: 'Nellore', label: 'Nellore'
                }, {
                    value: 'Sri Lanka', label: 'Sri Lanka'
                }]}
            /> ) : ( <Text> Please Wait...</Text> ) }
             

              </ScrollView>
              <TouchableHighlight style={styles.button} onPress={ () => this.setUserPrefer() }>
                  <Text style={styles.buttonText}>
                    Set Preferrences
                    </Text>
                </TouchableHighlight>
          </View>
        );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(248,248,248)',
   
  },
   activityContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
  input: {
    height: 50,
      width: 300,
    marginTop: 10,
    paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#eee',
     borderBottomColor: '#eee',
      borderRadius: 10,
      bottom: 20,
    fontSize: 18,
    
    
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
  }
});


