import React from 'react';
import { StackNavigator } from 'react-navigation'
import LoginScreen from './Login'
import HomeScreen from './Home'
import MoreScreen from './More'
import RegisterScreen from './Register'
import ThankyouScreen from './Thankyou'
import ListScreen from './List'
import LatestScreen from './Latest'
import TopsellingScreen from './Topselling'
import VendorScreen from './Vendor'
import UserPreferScreen from './UserPrefer'
import EmployeeScreen from './Employee'


const AppNavigation = StackNavigator({

Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login Screen', header: null
    }
  },
  More: {
    screen: MoreScreen,
    navigationOptions: {
      title: 'Show More Screen', header: null
    }
  },
  UserPrefer: {
    screen: UserPreferScreen,
    navigationOptions: {
      title: 'User Preferences', headerStyle: { marginTop: 25 }
    }
  },
  Employee: {
    screen: EmployeeScreen,
    navigationOptions: {
      title: 'Employee Screen', header: null
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home Screen', header: null
    }
  },
    Vendor: {
    screen: VendorScreen,
    navigationOptions: {
      title: 'Vendor Screen', header: null
    }
  },
   Register: {
    screen: RegisterScreen,
    navigationOptions: {
      
        headerStyle: { marginTop: 25 }
       
    
    }
  },
    List: {
    screen: ListScreen,
    navigationOptions: {
      
        headerStyle: { marginTop: 25 },
        
    
    }
  },
  Latest: {
    screen: LatestScreen,
    navigationOptions: {
      
        headerStyle: { marginTop: 25 },
        
    
    }
  },
  Topselling: {
    screen: TopsellingScreen,
    navigationOptions: {
      
        headerStyle: { marginTop: 25 },
        
    
    }
  },
Thankyou: {
    screen: ThankyouScreen,
    navigationOptions: {
      title: 'Thankyou Screen', header: null
    }
  }
})

export default AppNavigation