import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Card,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Switch,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { drinks } from '../data/drinks';

const filterCocktails = (ingredientName, cocktailsList) => {
  const cocktailFilter = function(cocktail) {
    const valueFind = function(value) {
      return value === ingredientName
    }
    return Object.values(cocktail).find(valueFind) !== undefined
  }
  return cocktailsList.filter(cocktailFilter)
}


class ListResponse extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
    title: 'Cocktail possible',
    headerStyle: {
      backgroundColor: '#3062b3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  
  render() {
    const ingredients = this.props.navigation.getParam('ingredients')
    const categories = this.props.navigation.getParam('categories')
    const nbIngredients = ingredients.length
    let myCocktails = []

    // SI UN INGRÉDIENT COCHÉ
    if(nbIngredients === 1){
      myCocktails = filterCocktails(ingredients[0], drinks)
    }
    else{
      for(let i = 0; i < nbIngredients; i++){
        const myCocktailsIngredient = filterCocktails(ingredients[i], drinks)
        myCocktails = myCocktails.concat(myCocktailsIngredient)
        //myCocktails = myCocktailsIngredient
      }
      // CONDITION ET
      //for(let i = 0; i < nbIngredients; i++){
      //  myCocktails = filterCocktails(ingredients[i], myCocktails)
      //}
    }


    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>Cocktails à base de {categories}</Text>
        <Text>{myCocktails.length} résultats de recherche (sur {drinks.length} cocktails)</Text>
        { myCocktails.map(item => (
          <View style={styles.drinkWrapper}>
            <Image 
            style={styles.image}
            source={{ uri: item.strDrinkThumb }} />
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ fontWeight: 400, fontSize: 18 }}>{item.strDrink}</Text>
              <Text style={{ fontWeight: 200, fontSize: 15 }}>{item.strCategory}</Text>
              <Ionicons name='ios-heart-empty' size={40} />
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  drinkWrapper: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F4F6FF'
  }
});

export default ListResponse;
