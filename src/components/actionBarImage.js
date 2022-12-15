import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ActionBarImage = onPress => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: './../asset/humidity.png',
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ActionBarImage;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
    tintColor: 'white',
  },
});
