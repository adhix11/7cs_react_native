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
  RefreshControl,
  Modal
} from 'react-native';

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');


import LikeButton from './LikeButton';
import ModalPanel from './ModalPanel';
import Imagezoom from 'react-native-transformable-image';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Maticons from 'react-native-vector-icons/Entypo';
//import Upload from './Upload';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

export default class LatestScreen extends Component {
   
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
      clonelist: ds.cloneWithRows([])
    }
    
    
    
}

setModalVisible(visible, img) {
  console.log(img);
    this.setState({modalVisible: visible});
    this.setState({modaluri: img});
  }


 _onRefresh() {
    this.setState({refreshing: true});
    let user_id = this.state.uid;
    
    let url = 'http://45.76.35.84/api/latest_product.php';
    console.log(url);
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
   // console.log("hello");
    
await this.setSession();
 let user_id = this.state.uid;
 

    let url = 'http://45.76.35.84/api/latest_product.php';
    console.log(url);
   await fetch(url, {
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
      <View style={{flex: 1}}>
           <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {  this.setModalVisible(!this.state.modalVisible) }}
              >
             <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center'}}>
              <View>
                <Imagezoom style={styles.modalimg} source={{uri: this.state.modaluri}}/>


              </View>
             </View>
            </Modal>

        <ListView
         refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)} />
              }
            dataSource={this.state.clonelist}
            renderRow = {
                    (rowData) => <View style={{marginHorizontal: 10, marginTop:20, padding: 10, paddingTop: 20, backgroundColor: '#fff'}}>
                                    <TouchableHighlight underlayColor={'#fff'}
                                      onPress={ () =>  this.setModalVisible(true, rowData.img_url) }
                                     >
                                              <Image style={styles.stretch} source={{uri: rowData.img_url}}/>
                                      </TouchableHighlight>

                                    
                                   <View style={{flexDirection: 'row', margin: 10}}>
                                     <Text style={{flex: 1, flexDirection: 'row', fontSize: 18, color: 'rgb(30,75,113)', alignSelf: 'center'}}>Karatage: {rowData.karatage} kt </Text>
                                    <Text style={{flex: 1, flexDirection: 'row', fontSize: 18, color: 'rgb(30,75,113)', textAlign: 'right'}}>Gr.Wt:{rowData.weight}grm </Text>
                                    </View><Text style={{alignSelf: 'stretch', marginHorizontal: 20, color: 'rgb(30,75,113)'}}>Remarks: {rowData.remarks} </Text>
                                   <View style={{flexDirection: 'row', alignSelf: 'stretch',justifyContent: 'space-between'}}><ModalPanel pid={rowData.id} style={{flex: 1, flexDirection: 'row'}} />
                                    <LikeButton style={{flex: 1, flexDirection: 'row'}} id={rowData.id} liked={rowData.like} /></View>
                                
                                </View>
                                 
            }
            enableEmptySections = {true}
                
            
            ></ListView>
       
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
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  modalimg : {
    width: width,
    height: height,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});


