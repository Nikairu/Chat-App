import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      colorChoice: '',
      colors: ['#090C08', '#474056', '#8A95A5', '#B9C6AE'],
    };
  }

  render() {
    const { navigation } = this.props;
    const { name, colors, colorChoice } = this.state;
    return (
      // Set background of app to image
      <ImageBackground
        source={require('../assets/BackgroundImage.png')}
        style={styles.background}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <Text style={styles.title}>Chat App</Text>
        {/* Container for input components */}
        <View style={styles.startContainer}>
          <View>
            <TextInput
              style={styles.textInput}
              // When name is changed, store as state to pass to Chat screen
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />
          </View>
          <View style={styles.colorTextContainer}>
            <Text style={styles.colorText}>Choose Background Color:</Text>
            {/* Buttons to select Bg*/}
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <View
                  style={[
                    styles.colorBorder,
                    colorChoice === color ? { borderColor: color } : null,
                  ]}
                  key={color}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ colorChoice: color })}
                    style={[styles.colorButton, { backgroundColor: color }]}
                  />
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Chat', { name: name, color: colorChoice })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {/*Move input container when keyboard is showing*/}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    /* justifyContent: 'center', */
    alignItems: 'center',
    padding: '6%',
  },
  keyboardContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 45,
    fontWeight: '900',
    color: '#ffffff',
    top: '15%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffd700',
    textAlign: 'center',
  },
  startContainer: {
    marginTop: 'auto',
    minWidth: '100%',
    minHeight: 300,
    height: '44%',
    padding: '6%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
    height: 50,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    borderColor: '#757083',
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: '12%',
  },
  colorTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    paddingBottom: 4,
  },
  colorContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  colorButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  colorBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 100,
    padding: 3,
    marginRight: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#757083',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    padding: 20,
    textAlign: 'center',
  },
});
