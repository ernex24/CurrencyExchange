const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [from, setFrom] = useState([]);
const [currencyFrom, setCurrencyFrom] = useState([]);
const [to, setTo] = useState([]);
const [result, setResult] = useState([]);

useEffect(() => {
    getExchange();
  }, []);

const getExchange = () => {

    fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${from}&to=${to}&amount=${currencyFrom}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-rapidapi-key': 'b44fcbfa4bmsh462b2e3982edb12p1f5e7ajsnd2a3ec013991',
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
        'useQueryString': 'true'
      },
    })
      .then((response) => response.json())
      .then((json) => setResult(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  <div>{result.rates[to].rate_for_amount}</div>