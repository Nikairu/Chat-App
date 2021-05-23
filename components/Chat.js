import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');

export default class Screen1 extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      messages: [],
    };
    const firebaseConfig = {
      apiKey: 'AIzaSyCZPd9Swco5ZaKTA6TYhqHV_a95SCfsxyA',
      authDomain: 'chat-c5f4b.firebaseapp.com',
      projectId: 'chat-c5f4b',
      storageBucket: 'chat-c5f4b.appspot.com',
      messagingSenderId: '584116536663',
      //appId: '1:584116536663:web:30c5b327003de5b5f8aa12',
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {
    const { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });

    this.getMessages();

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });

        // Connect to Firestore to store messages in the database
        this.referenceChatMessages = firebase
          .firestore()
          .collection('messages');

        // Authenticate user with Firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
              createdAt: new Date().getTime(),
            },
            messages: [],
          });
          this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
        window.alert(
          'You are currently offline and will not be able to send messages.'
        );
      }
    });
  }

  componentWillUnmount() {
    // Stop listening for authentication
    this.unsubscribe();

    // Stop listening for collection changes
    this.authUnsubscribe();
  }

  //adds typped message to messages state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: new Date(data.createdAt),
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  async getMessages() {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt.toString(),
      text: message.text || '',
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  // Import CustomActions to display ActionSheet
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // Render view of map if location is included in message
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    // Gets name and color from previous screen
    const { color } = this.props.route.params;

    return (
      // Sets color picked in Start as Chat background color
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderCustomView={this.renderCustomView}
          renderActions={this.renderCustomActions}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
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
