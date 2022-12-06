import React, {useState, useEffect} from 'react';
import style from './loginStyle.js';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {login} from '../../action/auth';
import ButtonComponent from '../buttonComponent';
import * as Constant from '../../utils/constant';
import * as ErrorConstants from '../../utils/errorConstant';
import Geolocation from 'react-native-geolocation-service';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginEnable, setLoginEnable] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
      } else {
        try {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  /**
   * To check succesfull response.
   */
  const successCall = () => {
    navigation.navigate(Constant.DASHBOARD_SCREEN);
    setUserName('');
    setPassword('');
    setLoginEnable(false);
  };

  /**
   * onUserNameTextChange method to set username.
   *  @param: username text
   */
  const onUserNameTextChange = text => {
    setUserName(text);
    validation();
  };

  /**
   * onPasswordTextChange method to set password.
   * @param: password text
   */
  const onPasswordTextChange = text => {
    setPassword(text);
    validation();
  };

  /**
   * Validation method to validate the user and password.
   */
  const validation = () => {
    if (
      userName.length === Constant.MIN_VALID_LENGTH ||
      password.length === Constant.MIN_VALID_LENGTH
    ) {
      setLoginEnable(false);
    } else {
      setLoginEnable(true);
    }
  };

  /**
   * checkUserValidity method to validate the user and password is correct or not.
   */
  const checkUserValidity = () => {
    dispatch(login(userName, password))
      .then(response => {
        if (response.status === 'success') {
          successCall();
        }
      })
      .catch(error => {
        Alert.alert(ErrorConstants.ERROR_INVALID_INPUT);
      });
  };

  /**
   * Handlle button click even of Login button.
   */
  const handleLoginPress = () => {
    checkUserValidity();
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ImageBackground
        resizeMode="cover"
        source={require('../../Asset/wbg4.jpeg')}
        style={style.bgimage}>
        <Image
          style={style.image}
          source={require('../../Asset/cloud4.png')}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <Text style={style.signIn}>Weather App</Text>
        <View style={style.innerContainer}>
          <View style={style.inputView}>
            <TextInput
              style={style.textInput}
              placeholder={Constant.USERNAME_PLACEHOLDER}
              value={userName}
              onChangeText={text => onUserNameTextChange(text)}
            />
          </View>
          <View style={style.inputView}>
            <TextInput
              style={style.textInput}
              placeholder={Constant.PASSWORD_PLACEHOLDER}
              secureTextEntry={true}
              mode="outlined"
              value={password}
              onChangeText={text => onPasswordTextChange(text)}
            />
          </View>
          <ButtonComponent
            style={style.loginBtn}
            onPress={handleLoginPress}
            title={Constant.LOGIN_BUTTON}
            isDisabled={!loginEnable}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
