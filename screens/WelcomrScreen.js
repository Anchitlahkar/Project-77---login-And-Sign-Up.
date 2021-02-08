import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  userLogin = (email, password) => {
    console.log('Login:  ' + email + ' : ' + password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return alert('Login Successfully');
      })
      .catch(function (error) {
        console.log(error);
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  userSignUp = (email, password, confirmPassword) => {
    console.log('SignUp:  ' + email + ' : ' + password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return alert('User Add Successfully');
      })
      .catch(function (error) {
        console.log(error);
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  render() {
    console.log(this.state.isModalVisible);
    return (
      <KeyboardAvoidingView style={styles.mainView}>
      
        <View style={styles.textContainer}>
          <Text style={styles.text}>Barter System App</Text>
        </View>

        <Image style={{width: '80%', marginTop: 10}} source={require('../assets/download.jpg')} />

        <TextInput
          style={[styles.textInputStyle, { marginTop: '10%' }]}
          placeholder="    Email ID"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="    Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />

        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => {
            this.userLogin(this.state.email, this.state.password);
          }}>
          <Text style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ButtonStyle}
          onPress={() => {
            this.userSignUp(this.state.email, this.state.password);
          }}>
          <Text style={styles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  textInputStyle: {
    margin: 10,
    borderRadius: 15,
    height: 35,
    width: '80%',
    borderBottomWidth: 5,
    backgroundColor: 'lightgrey',
  },
  textContainer: {
    borderRadius: 45,
    width: '80%',
    borderBottomWidth: 4,
    borderBottomColor: 'black'
  },
  text: {
    // color: 'white',
    color: 'black',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ButtonStyle: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 100,
    margin: 10,
    width: 100,
    height: 35,
    marginLeft: 10,
    borderBottomWidth: 3
  },
  ButtonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
