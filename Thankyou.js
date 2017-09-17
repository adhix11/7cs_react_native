import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
    TouchableHighlight
} from 'react-native';

class Thankyou extends Component {
  render() {
       const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
       <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
           <View style={{ alignItems: 'center' , borderWidth: 2, borderColor: 'rgb(30,75,113)', height: 350, padding: 30 }}>
                <Text style={{ marginBottom: 20, fontSize: 30, fontWeight: 'bold', color: 'rgb(30,75,113)'}}>7Cs B2B</Text>
                <Text style={{ marginVertical: 20, textAlign: 'center', fontSize: 18,  color: 'rgb(30,75,113)'}}>Thankyou for registering with 7Cs B2B Jewellery Solution</Text>
           </View>
           
            <TouchableHighlight style={styles.button} onPress={ () => navigate('Login') }>
              <Text style={styles.buttonText}>
                Close
                </Text>
            </TouchableHighlight>
           
       </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 25,
      flex: 1,
      padding: 20,
      backgroundColor: '#fff'
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
  }
});

export default Thankyou