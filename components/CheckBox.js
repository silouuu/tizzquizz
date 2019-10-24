import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements';

import '@expo/vector-icons';

export default class App extends Component {

static navigationOptions = {
    title: 'Quiz',
    headerStyle: {
      backgroundColor: '#3062b3',
    },
    headerTintColor: '#fff',
  };

  state = {
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox style={styles.checkcss}
          title="Vodka"
          checked={this.state.checked1}
          onPress={() => this.setState({ checked1: !this.state.checked1 })}
        />
        <CheckBox
          title="Rhum"
          checked={this.state.checked2}
          onPress={() => this.setState({ checked2: !this.state.checked2 })}
        />
        <CheckBox
          title="Rhum"
          checked={this.state.checked3}
          onPress={() => this.setState({ checked3: !this.state.checked3 })}
        />
        <CheckBox
          title="Ricard"
          checked={this.state.checked4}
          onPress={() => this.setState({ checked4: !this.state.checked4 })}
        />
        <CheckBox
          title="Tequila"
          checked={this.state.checked5}
          onPress={() => this.setState({ checked5: !this.state.checked5 })}
        />
        <CheckBox
          title="Gin"
          checked={this.state.checked6}
          onPress={() => this.setState({ checked6: !this.state.checked6 })}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,         // does nothing
    flex: 2,
    alignItems: 'baseline',
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff8dc',
  },

  checkcss: {
  color: '#636c72',
  },
});