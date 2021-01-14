import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component{

  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
      isSearchPressed:false,
      word: "",
      lexicalCatergory: '',
      examples: [],
      defination: "",
    };
  }

  getWord=(word)=>{

    var searchKeyword = word.toLowerCase();
    var keyword = this.state.text;
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+ keyword + ".json"

    return fetch(url)

    .then((data)=>{
      if(data.status === 200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response) =>{
      var responseObject = response;

      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description 
        var lexicalCatergory = wordData.wordtype

        this.state ({
          "word" : this.state.text,
          "definition" : definition,
          "lexicalCategory" : lexicalCatergory
        })
        
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Header
          backgroundColor={'green'}
          centerComponent={{
            text: 'DICTIONARY APP',
            style: { color: '#fff' },
          }}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 5,
            marginTop: 80,
            textAlign: 'center',
          }}
          onChangeText={(text) => {
            this.setState({ 
            text: text,
            isSearchPressed:false,
            word : "Loading...",
            lexicalCatergory: '',
            examples: [],
            defination: "",
           });
          }}
          value={this.state.text}
        />
        <Text style={styles.tstyle}>{this.state.text}</Text>
        <TouchableOpacity
          style={styles.bstyle}

          onPress={() => {
            this.setState({ isSearchPressed: true }),
            this.getWord(this.state.text)}
        }
          >

          <Text>Search</Text>
        </TouchableOpacity> 

        <View>
          <Text style = {styles.detailsTitle}>
            Word:{""}
          </Text>

          <Text style = {{fontSize:18}}>
            {this.state.word}
          </Text>
          <View style = {styles.detailsContainer}>
            <Text style = {styles.detailsTitle}>
              Type:{""}
            </Text>
            <Text style = {{fontSize:18}}>
              {this.state.lexicalCatergory}
            </Text>
          </View>

          <View style = {{flexDirection : 'row', flexWrap : 'wrap'}}>
            <Text style = {styles.detailsTitle}>
              Definition:{""}
            </Text>
            <Text style = {{fontSize:18}}>
              {this.state.definition}
            </Text>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bstyle: {
    alignSelf: 'center',
    alignContent : 'center',
    marginTop: 180, 
    borderWidth: 3,
    height : 25,
    width:75,
    backgroundColor: 'white',
  },

  tstyle: {
    alignSelf: 'center',
    marginTop: 10,
  },

  detailsTitle: {
    alignSelf: 'center',
    marginTop: 10,
  },

  detailsContainer: {
    alignSelf: 'center',
    marginTop: 10, 
  }
});
