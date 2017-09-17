import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';


class Register extends Component {
  constructor(){
    super();

    this.state = {
      email: "",
      name: "",
      company: "",
      mobile: "",
        type: "",
        backgroundColor:"#FFFFFF",
      errors: [],
        result: "",
        customerText: "rgb(30,75,113)",
        vendorText: "rgb(30,75,113)"
    }
  }
//  redirect(routeName, accessToken){
//    this.props.navigator.push({
//      name: routeName
//    });
//  }
//
//  async storeToken(accessToken) {
//    try {
//        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
//        console.log("Token was stored successfull ");
//    } catch(error) {
//        console.log("Something went wrong");
//    }
//  }
  async onRegisterPressed() {
      
        try 
         {
            
            let response = await fetch('http://45.76.35.84/api/register.php',{
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  name: this.state.name,
                                  email: this.state.email,
                                  company: this.state.company,
                                  phone: this.state.mobile,
                                  type: this.state.type,
                                }
                              })
                            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) 
            {
              console.log("success sir: " + res);
              const { navigate } = this.props.navigation;
              navigate('Thankyou');
             // this.redirect('root');
            } 
            else
            {
              let error = res;
              throw error;
            }
         } 
         catch(error) 
         {
            console.log("error: " + error)
         }
  }

setCustomer()
{
    this.setState({
        type: "Customer",
      customerBg: "rgb(30,75,113)",
        vendorBg: "#fff",
        customerText: "#fff",
        vendorText: "rgb(30,75,113)"
    })
}
setVendor()
{
    this.setState({
        type: "vendor",
      customerBg: "#fff",
        vendorBg: "rgb(30,75,113)",
        vendorText: "#fff",
        customerText: "rgb(30,75,113)"
    })
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, color: 'rgb(30,75,113)', textAlign: 'left', marginBottom: 20}}>Create New Account</Text>
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
        <TextInput underlineColorAndroid={'#eee'} 
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput underlineColorAndroid={'#eee'}
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name">
        </TextInput>
        <TextInput underlineColorAndroid={'#eee'}
          onChangeText={ (text)=> this.setState({company: text}) }
          style={styles.input}
          placeholder="Company"
         >
        </TextInput>
        <TextInput underlineColorAndroid={'#eee'}
          onChangeText={ (text)=> this.setState({mobile: text}) }
          style={styles.input}
          placeholder="Phone Number"
          >
        </TextInput>
      
            
        <TouchableHighlight style={styles.button} onPress={ () => this.onRegisterPressed() }>
          <Text style={styles.buttonText}>
            Sign Up
            </Text>
        </TouchableHighlight>
 
       <Errors errors={this.state.errors}/>

      </View>

    );
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
   
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
    
    fontSize: 18
  },
  button: {
    height: 50,
    backgroundColor: 'rgb(30,75,113)',
      borderRadius: 50,
      
    alignSelf: 'stretch',
    marginTop: 30,
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

export default Register