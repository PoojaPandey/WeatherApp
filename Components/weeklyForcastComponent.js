import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../utils/color';

export default function weeklyForcastComponent({img, day, temp, description}) {
  return (
    <View style={styles.hour}>
      <Image
        style={styles.smallIcon}
        source={{
          uri: img,
        }}
      />
      <Text style={styles.infoDetail}>{day}</Text>
      <Text style={styles.infoDetail}>{temp}C</Text>
      <Text style={styles.infoDetail}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hour: {
    flex: 1,
    flexDirection: 'column',
    padding: 6,
    alignItems: 'center',
  },
  infoDetail: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.whiteColor,
    marginTop: 4,
  },
  smallIcon: {
    width: 70,
    height: 70,
  },
});
