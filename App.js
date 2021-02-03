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
  StatusBar,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {View, Colors, Dialog, Text, Picker, Avatar, Assets, PanningProvider, Spacings, TextField,  Button} from 'react-native-ui-lib'; //eslint-disable-line

const App: () => React$Node = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);
  const [amountToExchange, setAmountToExchange] = useState([]);
  const [exchanged, setExchanged] = useState([]);

  useEffect(() => {
    getCurrencies();
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
  console.log(fromCurrency)
  console.log(toCurrency)
  console.log(amountToExchange)
  console.log(exchanged)
  return (
    <>
    <ScrollView>
    <View flex paddingH-25 paddingT-120>
      <Text >Currency exchange</Text>
      <TextField 
      text50 
      placeholder="Amount"    
      onChangeText={text => setAmountToExchange(text)}
      value={amountToExchange}
      />

    {/* <Picker
      selectedValue={fromCurrency}
      style={{height: 50, width: 250}}
      onValueChange={(itemValue, itemIndex) =>
        setFromCurrency(itemValue)
    }>
      {    
        Object.entries(data).map(function([key,value]) {
        return <Picker.Item key={key} label={value.toString()} value={key} />})
      }
    </Picker> */}

    <Picker
            placeholder="Select from currency"
            floatingPlaceholder
            value={fromCurrency}
            enableModalBlur={false}
            onChange={item => setFromCurrency(item)}
            topBarProps={{title: 'Currencies'}}
            style={{color: Colors.red20}}
            showSearch
            searchPlaceholder={'Search a currency'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
            //onSearchChange={value => console.warn('value', value)}
          >
            {    
              Object.entries(data).map(function([key,value]) {
              return <Picker.Item key={key} label={value} value={key} />})
            }
          </Picker>
   
          {/* <Picker
            selectedValue={toCurrency}
            style={{height: 50, width: 250}}
            onValueChange={(itemValue, itemIndex) =>
              setToCurrency(itemValue)
            }>
              {    
                Object.entries(data).map(function([key,value]) {
                return <Picker.Item key={key} label={value.toString()} value={key} />})
              }
          </Picker> */}
           <Picker
            placeholder="Select to currency"
            floatingPlaceholder
            value={toCurrency}
            enableModalBlur={false}
            onChange={item => setToCurrency(item)}
            topBarProps={{title: 'Currencies'}}
            style={{color: Colors.red20}}
            showSearch
            searchPlaceholder={'Search a currency'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
            //onSearchChange={value => console.warn('value', value)}
          >
            {    
              Object.entries(data).map(function([key,value]) {
              return <Picker.Item key={key} label={value} value={key} />})
            }
          </Picker>
  
          <Button
            text70 white background-orange30
            label="Convert Currency"
              onPress={() => getCurrencies()}
            />

       <Text blue50 text20>{ exchanged && exchanged.rates  }</Text>
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
