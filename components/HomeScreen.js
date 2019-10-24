import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: 'Username' };
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#3062b3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Cocktail App</Text>
        <TextInput
          style={{
            height: 40,
            width: 150,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <Text>Username : {this.state.username} </Text>
        <Button
          title="Cocktail aléatoire"
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Random')}
        />
        <Button
          title="Cocktail Margarita"
          style={styles.button}
          onPress={() => this.props.navigation.navigate('List')}
        />
        <Button
          title="Rechercher un cocktail"
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Search')}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('List', { Alcool: 'Gin' })
            }>
            <Text>Gin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('List', { Alcool: 'Vodka' })
            }>
            <Text>Vodka</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3062b3',
    margin: 15,
    padding: 15,
    color: 'white',
    textTransform: 'uppercase',
    borderRadius: 30,
  },
});
export default HomeScreen;
