import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import Colors from '../utils/color';

export default function extraInfoComponent({img, value, text}) {
  return (
    <View style={styles.info}>
      <Image source={img} style={styles.infoImage} />
      <Text style={styles.infoDetail}>{value}</Text>
      <Text style={styles.infoDetail}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
