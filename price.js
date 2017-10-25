// require all exchange files to call later on with Promise.all
const coins = {
	bitfinex: require("./exchanges/bitfinex.js"),
	yobit: require("./exchanges/yobit.js"),
	binance: require("./exchanges/binance.js"),
	kraken: require("./exchanges/kraken.js"),
	bitstamp: require("./exchanges/bitstamp.js"),
	liqui: require("./exchanges/liqui.js"),
	hitbtc: require("./exchanges/hitbtc.js"),
	bittrex: require("./exchanges/bittrex.js"),
	poloniex: require("./exchanges/poloniex.js"),
	cryptopia: require("./exchanges/cryptopia.js")
};

// price async function taking a param (coin) which is the ticker 
const price = async (coin) => {
	const testHyphen = new RegExp("\\w{1,}[\\-]\\b", "g"); // test if it includes a "-"
	let tickerVol = coin.split("-")[1] || false;
	const onExchanges = await Promise.all(Object.values(coins).map(fn => fn(coin))); 
	/* check if its on any exchange by awaiting all the exchanges defined in a object as coins
	and using map to call each function in the object coins with the parameter given which is coin. */
	if(onExchanges.some(value => value)) { // if onExchanges contains any information then continue
		if(testHyphen.test(coin)) tickerVol = coin.split("-")[1];
		else if(coin.startsWith("$")) tickerVol = "USD";
		else tickerVol = "BTC";
		const volumeExchanges = { // storing exchange ticker volume if its returned else its false.
				bitfinex: onExchanges[Object.keys(coins).indexOf("bitfinex")][0] || false,
				yobit: onExchanges[Object.keys(coins).indexOf("yobit")][0] || false,
				binance: onExchanges[Object.keys(coins).indexOf("binance")][0] || false,
				kraken: onExchanges[Object.keys(coins).indexOf("kraken")][0] || false,
				bitstamp: onExchanges[Object.keys(coins).indexOf("bitstamp")][0] || false,
				liqui: onExchanges[Object.keys(coins).indexOf("liqui")][0] || false,
				hitbtc: onExchanges[Object.keys(coins).indexOf("hitbtc")][0] || false,
				bittrex: onExchanges[Object.keys(coins).indexOf("bittrex")][0] || false,
				polo: onExchanges[Object.keys(coins).indexOf("poloniex")][0] || false,
				cryptopia: onExchanges[Object.keys(coins).indexOf("cryptopia")][0] || false
			},
			max = Object.keys(volumeExchanges).reduce((a, b) => volumeExchanges[a] > volumeExchanges[b] ? a : b),
		      /* max = caclulate the highest volume in given object which returns the key which can be used later on 
		      in the code to extract futher information about the coin in the array. */
		      //now we can max to get more information about the coin including last price ask price bid price etc.
		      tickerExchange = onExchange[Object.keys(coins).indexOf(max)] // this now includes the information from the highest volume exchange of the ticker given.
		console.log(`**Ticker:** ${coin}\n**Volume in ${tickerVol}:** ${parseFloat(volumeExchanges[max]).toLocaleString()}\n**Last Price:** ${tickerExchange[1]}\n**Ask Price:** ${tickerExchange[2]}\n**Bid Price:** ${tickerExchange[3]}\n**High Price:** ${tickerExchange[4] || false}\n**Low Price:** ${tickerExchange[5] || false}`);
	}
};
