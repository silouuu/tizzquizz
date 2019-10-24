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

import { ingredients } from '../data/ingredients';
import { drinks } from '../data/drinks';

class ListScreen extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => {
    return {
      title: 'Mes ingredients',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { textAlign: 'center', flex: 1 },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      categorieChoosen: [],
      ingredientChoosen: [],
    };
  }

  static navigationOptions = {
    title: 'Ingredients',
    headerStyle: {
      backgroundColor: '#3062b3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    let ingredientsContent = [];
    let categorie = [];
    let categorieContent = [];
    let ingredientsCategoriesContent = [];

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    // Listing catégories
    for (let i = 0; i < ingredients.length ; i++) {
      ingredientsContent.push(<Text>{ingredients[i].strIngredient}</Text>);
      categorie.push(ingredients[i].strType);
      var categorieUnique = Array.from(new Set(categorie));
    }

    // Listing Ingrédients by catégories
    for (let j = 0; j < categorieUnique.length; j++) {
      ingredientsCategoriesContent.push(
        <Text style={styles.titleText}>{categorieUnique[j]}</Text>
      );
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].strType === categorieUnique[j]) {
          ingredientsCategoriesContent.push(
            <Text>{ingredients[i].strIngredient}</Text>
          );
        }
      }
    }

    return (
      <ScrollView style={styles.container}>
        
        <Text style={styles.titleText}>Catégories d'ingrédients</Text>
        { categorieUnique.map(item => (
          <View style={styles.switchWrapper}>
            <Switch
              style={{ marginHorizontal: 30 }}
              onValueChange={value => {
                const newingredientChoosen = [...this.state.ingredientChoosen]
                const newcategorieChoosen = [...this.state.categorieChoosen]
                if(value){
                  newcategorieChoosen.push(item)
                  for (let i = 0; i < ingredients.length; i++) {
                    if (ingredients[i].strType === item) {
                      newingredientChoosen.push(ingredients[i].strIngredient)
                    }
                  }
                }
                else{
                  newcategorieChoosen.splice( newcategorieChoosen.indexOf(item), 1)
                  for (let i = 0; i < ingredients.length; i++) {
                    if (ingredients[i].strType === item) {
                      newingredientChoosen.splice( newingredientChoosen.indexOf(ingredients[i].strIngredient), 1)
                    }
                  }
                }
                this.setState({ ingredientChoosen : newingredientChoosen, categorieChoosen : newcategorieChoosen })
                }}
              value={this.state.categorieChoosen.find(function(el){
                return el === item
              }) !== undefined}
            />
            <Text>{item}</Text>
          </View>
        ))}
        <Button
          title="Valider"
          onPress={() => this.props.navigation.navigate('ListResponse', { ingredients: this.state.ingredientChoosen, categories: this.state.categorieChoosen})}
        />
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
  switchWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  }
});

export default ListScreen;
