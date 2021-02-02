/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState }  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  Picker
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App: () => React$Node = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);
  const [amountToExchange, setAmountToExchange] = useState([]);
  const [exchanged, setExchanged] = useState([]);

  useEffect(() => {
    getCurrencies();
    getExchange();
  }, []);

  const getCurrencies = () => {
    fetch('https://currency-converter5.p.rapidapi.com/currency/list', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-rapidapi-key': 'b44fcbfa4bmsh462b2e3982edb12p1f5e7ajsnd2a3ec013991',
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
        'useQueryString': 'true'
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.currencies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const getExchange = () => {
    fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromCurrency}&to=${toCurrency}&amount=${amountToExchange}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-rapidapi-key': 'b44fcbfa4bmsh462b2e3982edb12p1f5e7ajsnd2a3ec013991',
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
        'useQueryString': 'true'
      },
    })
      .then((response) => response.json())
      .then((json) => setExchanged(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  //console.log(data)
  console.log("From: " + fromCurrency)
  console.log("To: " + toCurrency)
  console.log("To exchange: " + amountToExchange)
  console.log(exchanged && exchanged.rates && exchanged.rates[toCurrency])
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <Text>Cambiar moneda</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setAmountToExchange(text)}
      value={amountToExchange}
    />
    <Picker
      selectedValue={fromCurrency}
      style={{height: 50, width: 250}}
      onValueChange={(itemValue, itemIndex) =>
        setFromCurrency(itemValue)
    }>
      {    
        Object.entries(data).map(function([key,value]) {
        return <Picker.Item key={key} label={value.toString()} value={key} />})
      }
    </Picker>
    </View>
    <View style={styles.container}>
          <Picker
            selectedValue={toCurrency}
            style={{height: 50, width: 250}}
            onValueChange={(itemValue, itemIndex) =>
              setToCurrency(itemValue)
            }>
              {    
                Object.entries(data).map(function([key,value]) {
                return <Picker.Item key={key} label={value.toString()} value={key} />})
              }
          </Picker>
    </View>
    <View style={styles.container2}></View>
    <Button
        title="Press me"
        onPress={() => getCurrencies()}
      />
    <View style={styles.container2}>
       <Text>{ exchanged && exchanged.rates && exchanged.rates[toCurrency] && exchanged.rates[toCurrency].rate_for_amount }</Text>
    </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 50,
  },container2: {
    marginTop: 180,
    marginLeft: 50,
  },  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
