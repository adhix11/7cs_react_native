import React, { Component } from 'react';

import {
   
   Text,
   TouchableHighlight,
   View,
    TextInput,
   StyleSheet,
    Picker,
    Alert,
    AsyncStorage
} 
from 'react-native'
import Modal from 'react-native-modal';
const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

class ImageZoom extends Component {
    
constructor(props)
{
    super(props);
    
    this.state = 
    {
        uid: "",
        pid: "",
        qty: "",
        karatage: "18",
        remarks: "",
         modalVisible: false,
        success: "",
        errors: []
     
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


    async placeOrder(){
        try {
          
      let response = await fetch('http://45.76.35.84/api/customer_post_order.php', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                
                                  user_id: this.state.uid,
                                  product_id: this.state.pid,
                                  qty: this.state.qty,
                                  karatage: this.state.karatage,
                                    remarks: this.state.remarks
                               
                              })
                            });
      let res = await response.json();
        
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          if(res.status)
              {
                  let status = res.status;
                 
                  
                 
                  
                  if(status){
                    console.log(status);
                      this.setState({success: "Ordered"});
                      Alert.alert('Order Placed','Thankyou for placing the order.');
                      this.toggleModal(!this.state.modalVisible);
                      
                  }
                  else{
                      this.setState({errors: this.state.errors.concat("Try Again")});
                  }
                  
              }
            else
                {
                     
                     this.setState({errors: this.state.errors.concat("Try Again")});
                }
          
          //this.redirect('home');
      } else {
          //Handle error
          let error = res;
          throw error;
           this.setState({errors: this.state.errors.concat("Invalid ")});
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
         this.setState({errors: this.state.errors.concat("Try Again")});
        this.setState({showProgress: false});
    }
    }
  
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }
    
    
   render() {
      return (
         <View style={{flex: 1}}>
            <Modal animationIn = {"slideInUp"} 
               isVisible = {this.state.modalVisible}
               onBackdropPress = {() => {this.toggleModal(!this.state.modalVisible)}}
              >
               <View style = {styles.modal}>
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
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 2}}>Quantity</Text>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}>:</Text>
                   
                       <TextInput style = {styles.input}
                       keyboardType={'numeric'}
                      onChangeText={ (text)=> this.setState({qty: text}) }
                       placeholder="Quantity">
                      </TextInput>
                  <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}></Text>
                   </View>
                   
                    <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 2}}>Remarks</Text>
                       <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}>:</Text>
                   
                       <TextInput style = {styles.input}
                      onChangeText={ (text)=> this.setState({remarks: text}) }
                       placeholder="Remarks">
                      </TextInput>
                  <Text style={{fontSize: 16, color: 'rgb(30,75,113)', flex: 1}}></Text>
                   </View>
                   
                   
              <View style= {{marginBottom: 10, flexDirection: 'row', height: 60}}>
                 <TouchableHighlight underlayColor = {'#fff'} style={{flex: 1, flexDirection: 'row', alignItems:'center', justifyContent: 'center'}} onPress = {() => {
                     this.placeOrder()}}>
                     
                     <Text style = {styles.modalText}>Order </Text>
                  </TouchableHighlight>
               
                   </View>
               
               </View>
            </Modal>
            
            <TouchableHighlight style = {styles.container} onPress = {() => {this.toggleModal(true)}}>
               <Text style = {styles.text}>Order</Text>
            </TouchableHighlight>
         </View>
      )
   }
}

export default ImageZoom

const styles = StyleSheet.create ({
   container: {
   
      padding: 10
   },
   modal: {
      
      alignItems: 'center',
       justifyContent: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 20,
       paddingVertical: 30,
  
   },
    input: {
      width: 100 ,
        padding: 10,
        bottom: 12
    
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
})