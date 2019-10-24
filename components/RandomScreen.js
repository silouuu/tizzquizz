import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  FlatList,
  RefreshControl,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import Constants from 'expo-constants';
import { Accelerometer } from 'expo-sensors';

import { drinks } from '../data/drinks';

// CONSTANTES
const THRESHOLD = 150;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class RandomScreen extends React.Component {
  static addListener(handler) {
    let last_x, last_y, last_z;
    let lastUpdate = 0;
    Accelerometer.addListener(accelerometerData => {
      let { x, y, z } = accelerometerData;
      let currTime = Date.now();
      if (currTime - lastUpdate > 100) {
        let diffTime = currTime - lastUpdate;
        lastUpdate = currTime;
        let speed =
          (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
        if (speed > THRESHOLD) {
          handler();
        }
        last_x = x;
        last_y = y;
        last_z = z;
      }
    });
  }
  static removeListener() {
    Accelerometer.removeAllListeners();
  }

  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() });
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      lastRefresh: Date(Date.now()).toString(),
      favoris: [],
    };
    this.refreshScreen = this.refreshScreen.bind(this);
  }
  componentWillMount() {
    RandomScreen.addListener(() => {
      this.refreshScreen();
    });
  }

  componentWillUnmount() {
    RandomScreen.removeListener();
  }

  onPress = () => {
    this.favoris.push('3');
  };

  render() {
    const cocktailIndex = parseInt(Math.random() * drinks.length - 1);

    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (drinks[cocktailIndex]['strIngredient' + i] != '') {
        ingredients.push(
          <Text key={'strIngredient' + i} >
            {drinks[cocktailIndex]['strMeasure' + i]}{' '}
            {drinks[cocktailIndex]['strIngredient' + i]}
          </Text>
        );
      }
    }

    return (
      <ParallaxScrollView
        style={styles.container}
        backgroundSource={{ uri : drinks[cocktailIndex].strDrinkThumb || 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjAv8uBwLTlAhU6DGMBHYNiApEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.1001cocktails.com%2Frecettes%2Frecette_margarita_354941.aspx&psig=AOvVaw2Ews8HTR5stTSQ4U86I8q4&ust=1571992872856966'}} 
        navBarTitle={drinks[cocktailIndex].strDrink}
        userImage=" "
        userName=" "
        userTitle=" "
        >
        <View style={{ backgroundColor: '#EFF1F5' }}>
          <View style={{ backgroundColor: '#EFF1F5' }}>
            <Text style={styles.headerText}>
              {drinks[cocktailIndex].strDrink}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#D6D6D6',
              backgroundColor: '#F9FAFC',
              paddingHorizontal: 10,
              borderRadius: 10,
              margin: 15,
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="shoppingcart" size={17} />
              <Text style={styles.titleText}> Ingrédients :</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {ingredients}
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#D6D6D6',
              backgroundColor: '#F9FAFC',
              paddingHorizontal: 10,
              borderRadius: 10,
              margin: 15,
              paddingBottom: 10,
            }}>
            <Text style={styles.titleText}>Préparation :</Text>
            <Text>{drinks[cocktailIndex].strInstructions}</Text>
          </View>
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <TouchableOpacity onPress={this.onPress}>
              <Text>{this.favoris}</Text>
              <Ionicons name="md-heart-empty" size={50} />
            </TouchableOpacity>
          </View>
          <Button onPress={this.refreshScreen} title="Un autre !" />
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go Back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 15,
    color: 'blue',
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});
