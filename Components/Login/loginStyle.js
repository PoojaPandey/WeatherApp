import {StyleSheet} from 'react-native';
import Colors from '../../utils/color';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  bgimage: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    height: '40%',
    borderRadius: 10,
    alignItems: 'center',
  },
  inputView: {
    backgroundColor: Colors.inputColor,
    borderRadius: 10,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
  },

  textInput: {
    height: 50,
    flex: 1,
    alignItems: 'center',
    placeholderTextColor: Colors.inputPlaceHolderColor,
  },
  loginBtn: {
    width: '90%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  image: {
    width: '60%',
    height: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signIn: {
    color: Colors.whiteColor,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Times New Roman',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default LoginStyle;
