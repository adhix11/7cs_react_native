import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import { AppRegistry } from 'react-native';
import VendorScreen from './VendorFeed'
import AddScreen from './Add'
import SettingScreen from './Setting'

const Vendor = TabNavigator({
  Feed: { screen: VendorScreen },
  Add: { screen: AddScreen },
  Setting: { screen: SettingScreen }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
        style: {
            borderWidth: 1,
        borderColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#c0c0c0'},
      labelColor: 'black',
      rippleColor: 'black',
      tabs: {
        Feed: {
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

export default Vendor