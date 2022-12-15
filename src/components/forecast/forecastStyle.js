import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../utils/color';

const ForecastStyle = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.whiteColor,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    marginVertical: 12,
    marginLeft: 7,
    color: Colors.offWhiteColor,
    fontFamily: 'Helvetica',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  current: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  currentTemp: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.whiteColor,
    fontFamily: 'Helvetica',
  },
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 15,
    marginBottom: 5,
    color: Colors.whiteColor,
    fontFamily: 'Helvetica',
  },
  hour: {
    flex: 1,
    flexDirection: 'column',
    padding: 6,
    alignItems: 'center',
  },
  largeIcon: {
    width: 300,
    height: 250,
  },
  smallIcon: {
    width: 70,
    height: 70,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  info: {
    width: Dimensions.get('screen').width / 5,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDetail: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.whiteColor,
    marginTop: 4,
  },
  infoImage: {
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    tintColor: Colors.themeBlueColor,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  hourView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgimage: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
});

export default ForecastStyle;
