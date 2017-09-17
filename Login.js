import React, { Component } from 'react';
import { AppRegistry, Image,View, Text, ActivityIndicator, Alert, TextInput, StyleSheet, Button, TouchableHighlight, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const USER_ID = 'user_id';
const ACCESS_TOKEN = 'access_token';
const TYPE = 'type';


export default class Login extends Component {
    
constructor()
{
    super();

    this.state = 
    {
      loading: true,
      email: "",
      password: "",
      type: "",
      backgroundColor:"#FFFFFF",
      errors: [],
      accessToken: "",
      result: "",
      customerText: "rgb(30,75,113)",
      vendorText: "rgb(30,75,113)"
    }
}
 
componentWillMount()
{
    
    this.verifyToken();
    
}

async verifyToken() 
{
    try 
    {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      let uid = await AsyncStorage.getItem(USER_ID);

      
      if(accessToken) 
      {
         // this.redireu
        
            
            let response = await fetch('http://45.76.35.84/api/verify_token.php',{
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                
                                  id: uid,
                                  access_token: accessToken
                               
                              })
                            });
            let res = await response.json();
            if (response.status >= 200 && response.status < 300) 
            {
              if(res.status)
              {
                 // this.getToken();
                  console.log("Verifying Token");
                  const { navigate } = this.props.navigation;
                   try {
                      const value = await AsyncStorage.getItem(TYPE);
                      if (value !== null){
                            if(value == 'vendor')
                                {
                                  console.log("Verifying Vendor");
                                     navigate('Vendor');
                                }
                                else if(value == 'employee')
                                {
                                  navigate('Employee');
                                }
                          else{
                            console.log("Verifying Home");
                              navigate('Home');
                          }
                          }
                        } catch (error) {
                             this.setState({loading: false});
                          // Error retrieving data
                        }

                  
              }
              else
              {
                   this.setState({loading: false});
                 // this.setState({errors: this.state.errors.concat("Invalid Token")});
              }
              
             // this.redirect('root');
            } 
            else
            {
               this.setState({loading: false});
              let error = res;
             // this.setState({errors: this.state.errors.concat("Invalid Token")});
            }
         }
         else
         {
            this.setState({loading: false});
         } 
         
         
      }
      catch(error)
    {
        
        //this.redirect('login');
    }

   
    
} 


async storeToken(responseAccess, responseType, responseId)
{
   
   try {
        await AsyncStorage.multiSet([[ACCESS_TOKEN, responseAccess],[TYPE, responseType], [USER_ID, responseId]]);
    } catch (error) {
        
        // Error saving data
    }
}
async getToken(){
    try {
      const value = await AsyncStorage.getItem(USER_ID);
      if (value !== null){
            // We have data!!
              console.log(value);
            
          }
        } catch (error) {
            
          // Error retrieving data
        }

}
  async onLoginPressed() {
    this.setState({showProgress: true});
    this.setState({loading: true});
    try {
      let response = await fetch('http://45.76.35.84/api/login.php', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                
                                  email: this.state.email,
                                  password: this.state.password,
                                  type: this.state.type
                              
                              })
                            });
      let res = await response.json();
      if (response.status >= 200 && response.status < 300) {
        
          //Handle success
          if(res.status)
              {
                  let accessToken = res.user.access_code;
                  let type = res.user.type;
                  let uid = res.user.id;

                  
                  //On success we will store the access_token in the AsyncStorage
                  this.storeToken(accessToken, type, uid);
                  this.getToken();
                  const { navigate } = this.props.navigation;
                  if(type == 'vendor'){
                      navigate('Vendor');
                  }
                  else if(type == 'employee')
                  {
                    navigate('Employee');
                  }
                  else{
                      navigate('Home');
                  }
                  
              }
            else
                {
                  this.setState({loading: false});
                      Alert.alert('Login Error', res.error);
                     //this.setState({errors: this.state.errors.concat(res.error)});
                }
          
          //this.redirect('home');
      } else {
          //Handle error
          this.setState({loading: false});
          let error = res;
          throw error;
            Alert.alert('Login Error', res.error);
      }
    } catch(error) {
        this.setState({error: error});
        this.setState({loading: false});
          Alert.alert('Login Error', res.error);
        this.setState({showProgress: false});
    }
  }

async setCustomer()
{
   await this.setState({
        type: "customer",
      customerBg: "rgb(30,75,113)",
        vendorBg: "#fff",
        customerText: "#fff",
        vendorText: "rgb(30,75,113)"
    });
    console.log(this.state.type);
}
async setVendor()
{
   await this.setState({
        type: "vendor",
      customerBg: "#fff",
        vendorBg: "rgb(30,75,113)",
        vendorText: "#fff",
        customerText: "rgb(30,75,113)"
    });
    console.log(this.state.type);
}
render() {
    const { navigate } = this.props.navigation;
   
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

            
            <View style={styles.container}>
              <Image style={{flex: 1, alignSelf: 'stretch', width: null,}} source={require('./img/logo.jpg')}/>
              <Text style={styles.heading}>
                {this.state.result.success}
              </Text>
              <View style={{bottom: 20}}>
                  <TextInput

                   underlineColorAndroid={'#eee'}
                    onChangeText={ (text)=> this.setState({email: text}) }
                    style={styles.input} placeholder="Email">
                  </TextInput>
                  <TextInput secureTextEntry={true}
                    underlineColorAndroid={'#eee'}
                    onChangeText={ (text)=> this.setState({password: text}) }
                    style={styles.input} placeholder="Password">
                  </TextInput>

                   <View style= {{ marginBottom: 10, flexDirection: 'row', height: 60}}>
                         <TouchableHighlight 
                      onPress={ () => this.setCustomer() }
                      style={{ backgroundColor: this.state.customerBg, height: 60, borderWidth: 1, borderRadius: 50, borderColor: 'rgb(30,75,113)', marginRight: 5,  flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                              <Text style={{ fontSize: 18, color: this.state.customerText }}>Customer</Text>
                      </TouchableHighlight>

                         <TouchableHighlight 
                      onPress={ () => this.setVendor() }
                      style={{ backgroundColor: this.state.vendorBg, height: 60, flex:1, borderWidth: 1, borderRadius: 50, borderColor: 'rgb(30,75,113)', marginLeft: 5, flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                              <Text style={{ fontSize: 18, color: this.state.vendorText }}>Vendor</Text>
                      </TouchableHighlight>
                  </View>
                  <TouchableHighlight style={styles.button} onPress={ () => this.onLoginPressed() }>
                    <Text style={styles.buttonText}>
                      Sign In
                      </Text>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor={'#fff'}  onPress={ () => navigate('Register') }>
                    <Text style={{fontSize: 16, color: 'rgb(30,75,113)', textAlign: 'center', marginTop: 5}}>
                      Not yet registered? Sign Up
                      </Text>
                  </TouchableHighlight>
                 
              </View>
             <Errors errors={this.state.errors}/>
             <KeyboardSpacer/>
            </View>

          );
    }
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
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

