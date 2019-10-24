import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Card,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

class ListScreen extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => {
    return {
      title: 'Favoris',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { textAlign: 'center', flex: 1 },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.props.navigation.getParam(
      'Alcool',
      ''
    )}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson.drinks,
        });
      })
      .catch(error => {
        console.error(error); // to catch error if any
      });
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };
  renderItem = data => (
    <TouchableOpacity style={styles.list}>
      <Text>
        Alcool {JSON.stringify(this.props.navigation.getParam('Alcool', ''))}
      </Text>
      <Text style={styles.titleText}>{data.item.strDrink}</Text>
      <Text style={styles.lightText}>{data.item.strInstructions}</Text>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: data.item.strDrinkThumb }}
      />
      <Text style={styles.lightText}>
        {data.item.strMeasure1} {data.item.strIngredient1}
      </Text>
      <Text style={styles.lightText}>
        {data.item.strMeasure2} {data.item.strIngredient2}
      </Text>
      <Text style={styles.lightText}>
        {data.item.strMeasure3} {data.item.strIngredient3}
      </Text>
      <Text style={styles.lightText}>
        {data.item.strMeasure4} {data.item.strIngredient4}
      </Text>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ListScreen;
