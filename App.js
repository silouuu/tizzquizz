import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

// You can import from local files

import RandomScreen from './components/RandomScreen';
import HomeScreen from './components/HomeScreen';
import ListScreen from './components/ListScreen';
import SearchScreen from './components/SearchScreen';
import CheckBox from './components/CheckBox';
import ListResponse from './components/ListResponse';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class FavorisScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Fav!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const RandomStack = createStackNavigator({
  Random: { screen: RandomScreen },
  Details: { screen: DetailsScreen },
},{headerMode: 'none'});

const ListStack = createStackNavigator({
  List: { screen: ListScreen },
  Details: { screen: DetailsScreen },
});
const SearchStack = createStackNavigator({
  Search: { screen: SearchScreen },
  ListResponse: { screen: ListResponse },
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Random: { screen: RandomStack },
      Check: { screen: CheckBox },
      List: { screen: ListScreen },
      Search: { screen: SearchStack },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Check') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Random') {
            iconName = `ios-wine${focused ? '' : ''}`;
          } else if (routeName === 'List') {
            iconName = `ios-star${focused ? '' : '-outline'}`;
          } else if (routeName === 'Search') {
            iconName = `ios-search${focused ? '' : ''}`;
          }

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
