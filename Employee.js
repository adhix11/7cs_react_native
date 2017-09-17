import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import { AppRegistry } from 'react-native';
import FeedScreen from './Feed';
import AddScreen from './Add';
import OrderScreen from './Order';
import SettingScreen from './Setting';

const Employee = TabNavigator({
  Feed: { screen: FeedScreen },
  Add: { screen: AddScreen },
   Order: { screen: OrderScreen },
  Setting: { screen: SettingScreen }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
    
  tabBarOptions: {
      showLabel: false,
    bottomNavigationOptions: {
        style: {
            borderWidth: 1,
        borderColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#c0c0c0'},
    
      labelColor: '#000',
      rippleColor: '#000',
    
      tabs: {
        Feed: {
          barBackgroundColor: '#FFF'
        },
         Order: {
          barBackgroundColor: '#FFF'
        },
       Add: {
          barBackgroundColor: '#FFF'
        },
        Setting: {
          barBackgroundColor: '#FFF',
          
          
        }
      }
    }
  }
})

export default Employee