import React, { Component } from 'react';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import react-native-input-scroll-view
import InputScrollView from 'react-native-input-scroll-view';

import Start from './components/Start';
import Chat from './components/Chat';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Button,
  ScrollView,
} from 'react-native';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={Start} />
          {<Stack.Screen name='Chat' component={Chat} />}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
