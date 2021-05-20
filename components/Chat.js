import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Screen1 extends React.Component {
  render() {
    const { name, color } = this.props.route.params;

    // Populate user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
        }}
      >
        <Text>This is the chat screen</Text>
      </View>
    );
  }
}
