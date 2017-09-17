import React, { Component } from 'react';
import {
  
    Image,
 Text,
  TouchableOpacity
} from 'react-native';

class LikeButton extends Component {

  constructor(props){
     super(props);
    this.state = {
        id: props.id,
      liked: props.liked || false
    };
  }

  render(){
    if ( this.state.liked ) {
      return (
        <TouchableOpacity style={{margin: 10, top: 3}} onPress={this._handlePress.bind(this)}>
          <Image
            source={require('./img/heart1.png')}
            style={{width:30, height:30}}
          />
          
        </TouchableOpacity>
      )

    } else {
      return (
        <TouchableOpacity style={{margin: 10, top: 3}} onPress={this._handlePress.bind(this)}>
          <Image
            source={require('./img/heart2.png')}
            style={{width:30, height:30}}
          />
        </TouchableOpacity>
      );
    }
  }

  _handlePress(){
    this.setState({
      liked: this.state.liked ? false : true
    });
  }

};

module.exports = LikeButton;