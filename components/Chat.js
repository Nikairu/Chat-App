import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, Button } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Screen1 extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'You have joined the chat!',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  //adds typped message to messages state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  // Change styles for chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
        }}
      />
    );
  }

  render() {
    // Gets name and color from previous screen
    const { name, color } = this.props.route.params;

    // Sets user's name
    this.props.navigation.setOptions({ title: name });

    return (
      // Sets color picked in Start as Chat background color
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
