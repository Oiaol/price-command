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


const price = async (coin) => {
	const testHyphen = new RegExp("\\w{1,}[\\-]\\b", "g");
	let tickerVol = coin.split("-")[1] || false;
	const onExchanges = await Promise.all(Object.values(coins).map(fn => fn(coin)));
	if(onExchanges.some(value => value)) {
		if(testHyphen.test(coin)) tickerVol = coin.split("-")[1];
		else if(coin.startsWith("$")) tickerVol = "USD";
		else tickerVol = "BTC";
		const exchangeHighestVolume = Object.keys(coins).reduce((a, key, i) => a.value[0] > onExchanges[i][0] ? a : { key, value: onExchanges[i] },{value: [0]}),
		exchangeData = exchangeHighestVolume.value;
		console.log(`**Exchange:** ${exchangeHighestVolume.key}\n**Ticker:** ${coin}\n**Volume in ${tickerVol}:** ${parseFloat(exchangeData[0]).toLocaleString()}\n**Last Price:** ${exchangeData[1]}\n**Ask Price:** ${exchangeData[2]}\n**Bid Price:** ${exchangeData[3]}\n**High Price:** ${exchangeData[4] || false}\n**Low Price:** ${exchangeData[5] || false}`);
	}
};

