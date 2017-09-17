
import React, { Component } from 'react';
import {
  View,
  Text,
    TextInput,
  StyleSheet,
  Button,
    Image,
    ActivityIndicator,
  ListView,
  AsyncStorage,
  TouchableHighlight,
    Picker
} from 'react-native';
import { ImagePicker } from 'expo';
import Ionicons from 'react-native-vector-icons/FontAwesome';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';
export default class Add extends Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
      tabBarIcon: () => ( <Ionicons style={{alignSelf: 'center'}} name="plus-circle" size={24} color="rgb(30,75,113)" />)
   
  }
constructor(props)
{
    super(props);
    
    this.state = 
    {
      loading: false,
        uid:"",
      email: "",
      accessToken: "",
        type: "",
      result: "",
        weight: "",
        karatage: "18",
        remarks: "",
        success: "",
        errors: [],
         image: null
     
    }
    
    
    
}

async setSession(){
     try {
      
      const user_id = await AsyncStorage.getItem(USER_ID);
      if (user_id !== null){
            // We have data!!
          console.log("Set Session");
            console.log(user_id);
           
           this.setState({uid: user_id});
          }
        } catch (error) {
            console.log(error);
          // Error retrieving data
        }
}


async componentDidMount(){
     // console.log("hello");
     await this.setSession();
      }

async placeOrder() {
    console.log("licked");
    let img = new Date().toLocaleString() + this.state.uid + ".jpg";

   
    this.setState({loading: true});
     var data = new FormData();
        data.append('image', {uri: this.state.image, name: img, type: 'image/jpg'});
         data.append('weight', this.state.weight);
         data.append('remarks', this.state.remarks);
         data.append('karatage', this.state.karatage);
         data.append('user_id', this.state.uid);

         console.log("order" + this.state.uid);
        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           
         },
         body: data,
        }

    try {
      let response = await fetch('http://45.76.35.84/api/vendor_post_order.php', config);
      let res = await response.json();
        
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          if(res.status)
              {
                  let status = res.status;
                 
                  
                 console.log(status);
                  
                  if(status){
                      this.setState({loading: false});
                      this.setState({image: null});
                      this.setState({weight: ""});
                      this.setState({remarks: ""});

                      
                      
                      this.setState({success: "Product Posted"});
                  }
                  else{
                    this.setState({loading: false});
                      this.setState({errors: this.state.errors.concat("Try Again")});
                  }
                  
              }
            else
                {
                     this.setState({loading: false});
                     this.setState({errors: this.state.errors.concat("Try Again")});
                }
          
          //this.redirect('home');
      } else {
          //Handle error
          this.setState({loading: false});
          let error = res;
          throw error;
           this.setState({errors: this.state.errors.concat("Incorrect Information")});
      }
    } catch(error) {
      this.setState({loading: false});
        this.setState({error: error});
        console.log("error " + error);
         this.setState({errors: this.state.errors.concat("Try Again")});
        this.setState({showProgress: false});
    }
    
}
_takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,4],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() { 
      
        let { image } = this.state;
        const loading = this.state.loading;
      return(
      
    <View style={{flex: 1, paddingTop: 25}}> 
        <View style = {{padding: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 30, color: 'rgb(30,75,113)'}}>7cs B2B</Text></View>
          
         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:1, marginHorizontal: 10, marginTop: 10, backgroundColor: '#fff', padding: 10 }}>
                
                 <TouchableHighlight underlayColor= {'#fff'} onPress={this._pickImage}>
                    
                  <Ionicons style={{alignSelf: 'center', marginRight: 15}} name="image" size={24} color="rgb(30,75,113)" />
                </TouchableHighlight>
                <TouchableHighlight underlayColor= {'#fff'} onPress={this._takePhoto}>
                    
                   <Ionicons style={{alignSelf: 'center', marginLeft: 15}} name="camera" size={24} color="rgb(30,75,113)" />
                </TouchableHighlight>
              </View>
       <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginHorizontal: 10}}>
        {image &&
           
              <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 10 }} />    }
      </View>
         
    
          <View style={{ paddingVertical: 20, marginHorizontal: 10, paddingHorizontal: 20, borderWidth: 1, backgroundColor: '#fff', borderColor: '#fff', borderTopWidth: 1, borderTopColor: '#c0c0c0'}}>
         <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 2}}>Karatage</Text>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}>:</Text>
                     
                       <Picker
                        selectedValue={this.state.karatage}
                        onValueChange={(karatage) => this.setState({karatage: karatage})}
                        mode="dropdown"
                        style={{
                          width: 100,
                          color: 'black',
                              borderWidth: 1,
                                  borderColor: '#fff',
                       borderBottomWidth: 1,
                           borderBottomColor: 'rgb(30,75,113)',
                               bottom: 12
                    
                        }}
                      >
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="24" value="24" />
                        
                        
                      </Picker>
                  <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}>Kts</Text>
                   </View>
                   
                   
                   <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 2}}>Gross Weight</Text>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}>:</Text>
                   
                       <TextInput style = {styles.input}
                       keyboardType={'numeric'}
                      onChangeText={ (text)=> this.setState({weight: text}) }
                      value = {this.state.weight}
                       placeholder="Weight">
                      </TextInput>
                  <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}>Gms</Text>
                   </View>
                   
                    <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 2, fontWeight: 'bold'}}>Remarks</Text>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1, fontWeight: 'bold'}}>:</Text>
                   
                       <TextInput style = {styles.input}
                      onChangeText={ (text)=> this.setState({remarks: text}) }
                       value = {this.state.remarks}
                       placeholder="Remarks">
                      </TextInput>
                  <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}></Text>
                   </View>
                   
                   
              <View style= {{marginTop:10,  flexDirection: 'row', height: 60}}>
                 
              {loading ? (
       
                <ActivityIndicator
                     animating = {loading}
                     color = 'rgb(30,75,113)'
                     size = "large"
                     style = {styles.activityIndicator}/>
                
      ) : (
        

                      <TouchableHighlight underlayColor = {'#fff'} style={{flex: 1, flexDirection: 'row', alignItems:'center', justifyContent: 'center'}} onPress = {() => {
                     this.placeOrder()}}>
                     
                     <Text style = {styles.modalText}>Post </Text>
                  </TouchableHighlight>

      )}

                 
                   </View>
                   <Text style={{textAlign: 'center'}}>{this.state.success}</Text>
                  <Errors errors={this.state.errors}/>
          </View>
     
         
    </View>
  
  ); }
}



const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
}


const styles = StyleSheet.create({
  
  error: {
    color: 'red',
    paddingTop: 10,
    textAlign: 'center'
  },
    input: {
      width: 100 ,
        padding: 10,
        bottom: 12
    

    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     
   },
    modalText: {
        color: '#fff',
       borderRadius: 40,
      width: 150,
       paddingVertical: 10,
       fontSize: 22,
       textAlign: 'center',
       borderWidth: 1,
       borderColor: 'rgb(30,75,113)',
       backgroundColor: 'rgb(30,75,113)'
    },
   text: {
      color: '#fff',
       borderRadius: 40,
      width: 150,
       padding: 5,
       fontSize: 18,
       textAlign: 'center',
       borderWidth: 1,
       borderColor: 'rgb(30,75,113)',
       backgroundColor: 'rgb(30,75,113)'
   }
 
});