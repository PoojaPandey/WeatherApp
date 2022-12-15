import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  Button,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getWeatherList, logout} from '../../redux/action/auth';
import style from './forecastStyle';
import * as Constant from '../../utils/constant';
import Geolocation from 'react-native-geolocation-service';
import ExtraInfoComponent from '../common/extraInfoComponent';
import WeeklyForcastComponent from '../common/weeklyForcastComponent';
import DeviceInfo from 'react-native-device-info';
import UserInactivity from 'react-native-user-inactivity';
import Colors from '../../utils/color';

export default function Forecast({route, navigation}) {
  const [forecast, setForecast] = useState(weatherData);
  const [selectedDay] = useState(0);
  const [active, setActive] = useState(true);
  const [timer] = useState(30000);
  const reducer = useSelector(state => state);
  const {auth} = reducer;
  const {weatherData} = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    setUpNavBar();
    checkDeviceLocationAccessibility();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      setActive(false);
      backHandler.remove();
    };
  }, []);

  /**
   * checkDeviceLocationAccessibility method to check if user has provided location access or not.
   */
  const checkDeviceLocationAccessibility = () => {
    DeviceInfo.isLocationEnabled().then(enabled => {
      if (enabled) {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        getWeatherInfo(Constant.DEFAULT_LOCATION);
      }
    });
  };

  /**
   * setUpNavBar method set uo navigattion bar.
   */
  const setUpNavBar = () => {
    navigation.setOptions({
      headerTitleStyle: {
        color: Colors.whiteColor,
      },
      headerRight: () => (
        <Button
          onPress={() => logoutPressed()}
          title={Constant.LOGOUT_BUTTON}
          color={Colors.themeBlueColor}
        />
      ),
    });
  };

  /**
   * getOneTimeLocation method to get one time location if user given one time access.
   */
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        getWeatherInfo(position);
      },
      error => {
        getWeatherInfo(Constant.DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  /**
   * subscribeLocationLocation method to get updated location when user location changes.
   */
  const subscribeLocationLocation = async () => {
    Geolocation.watchPosition(
      position => {
        getWeatherInfo(position);
      },
      error => {},
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  /**
   * getWeatherInfo method will be called to get updated location..
   * @param position : New location.
   */
  const getWeatherInfo = async position => {
    //REDUX PART:
    dispatch(getWeatherList(position))
      .then(response => {
        if (response.status === 'success') {
          setForecast(response.weatherData);
        }
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  /**
   * sessionExpried method will be called when user is not active in some time.
   */
  const sessionExpried = () => {
    Alert.alert(
      Constant.SESSION_EXPIRED_TITLE,
      Constant.SESSION_EXPIRED_DETAIL,
      [{text: 'OK', onPress: () => confirmLogout()}],
    );
  };

  /**
   * logoutPressed method to get logout confirmation from user..
   */
  const logoutPressed = () => {
    Alert.alert(Constant.CONFIRMATION, Constant.LOGUT_ALERT_MSG, [
      {text: 'No'},
      {text: 'Yes', onPress: () => confirmLogout()},
    ]);
  };

  /**
   * confirmLogout method to get confirmation for logout the user.
   */
  const confirmLogout = () => {
    dispatch(logout()).then(response => {
      if (response.status === 'success') {
        navigation.navigate(Constant.LOGIN_SCREEN);
      }
    });
  };

  if (!forecast) {
    return (
      <SafeAreaView style={style.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // Weather list for days forcast
  var filterdWeather = [];

  // Filter by day weather list
  weatherData.list.map((obj, index) => {
    if (filterdWeather.length > 0) {
      let weatherObj = filterdWeather[filterdWeather.length - 1];
      if (obj.dt_txt.includes(weatherObj.dt_txt.split(' ')[0])) {
      } else {
        filterdWeather.push(obj);
      }
    } else {
      if (index > 0) {
        filterdWeather.push(obj);
      }
    }
  });
  filterdWeather.splice(0, 1);

  // Setting current, main and wind detail fro today
  const current = weatherData.list[selectedDay].weather[0];
  const main = weatherData.list[selectedDay].main;
  const wind = weatherData.list[selectedDay].wind;

  // Getting and Setting today day.
  var currentDayLong = new Date(
    weatherData.list[selectedDay].dt * 1000,
  ).toLocaleString('en-us', {
    weekday: 'long',
  });
  var currentDay = currentDayLong.split(',')[0];

  /**
   * TodaysForcastDetail method to show today weather detail.
   */
  const TodaysForcastDetail = () => {
    return (
      <View style={style.extraInfo}>
        <ExtraInfoComponent
          img={require('./../../asset/temp1.png')}
          value={`${Constant.getTempInCelcius(main.feels_like)}C`}
          text={Constant.FEELS_LIKE}
        />
        <ExtraInfoComponent
          img={require('./../../asset/humidity.png')}
          value={main.humidity}
          text={Constant.HUMIDITY}
        />
        <ExtraInfoComponent
          img={require('./../../asset/wind1.png')}
          value={Math.round(wind.speed * 3.6)}
          text={Constant.KM_H}
        />
      </View>
    );
  };

  /**
   * WeeklyForcast method to show weekly 5 days weather detail.
   */
  const WeeklyForcast = () => {
    return (
      <View style={style.hourView}>
        <Text style={style.subtitle}>{Constant.WEEKLY_FORECAST}</Text>
        <FlatList
          horizontal
          data={filterdWeather}
          renderItem={(hour, index) => {
            var dayLong = new Date(hour.item.dt * 1000).toLocaleString(
              'en-us',
              {weekday: 'short'},
            );
            var day = dayLong.split(',')[0];
            var weather = hour.item.weather[0];
            return (
              <WeeklyForcastComponent
                img={`${Constant.ICON_API}${weather.icon}@4x.png`}
                day={day}
                temp={Constant.getTempInCelcius(hour.item.main.temp)}
                description={weather.description}
              />
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <ImageBackground
        resizeMode="cover"
        source={require('../../asset/wbg4.jpeg')}
        style={style.bgimage}>
        <UserInactivity
          isActive={active}
          timeForInactivity={timer}
          onAction={isActive => {
            if (!isActive) {
              sessionExpried();
            }
          }}
          style={{flex: 1}}>
          <ScrollView>
            <Text style={style.title}>
              {weatherData.city.name}, {weatherData.city.country}
            </Text>
            <Text style={style.currentDescription}>
              {currentDay} {Constant.TODAY}
            </Text>
            <View style={style.current}>
              <Image
                style={style.largeIcon}
                source={{
                  uri: `${Constant.ICON_API}${current.icon}@4x.png`,
                }}
              />
              <Text style={style.currentTemp}>
                {' '}
                {Constant.getTempInCelcius(main.temp)}
              </Text>
            </View>
            <Text style={style.currentDescription}>{current.description}</Text>
            <TodaysForcastDetail />
            <WeeklyForcast />
          </ScrollView>
        </UserInactivity>
      </ImageBackground>
    </View>
  );
}
