
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
		const volumeExchanges = {
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
			tickerExchanges = {
				bitfinex: onExchanges[Object.keys(coins).indexOf("bitfinex")],
				yobit: onExchanges[Object.keys(coins).indexOf("yobit")],
				binance: onExchanges[Object.keys(coins).indexOf("binance")],
				kraken: onExchanges[Object.keys(coins).indexOf("kraken")],
				bitstamp: onExchanges[Object.keys(coins).indexOf("bitstamp")],
				liqui: onExchanges[Object.keys(coins).indexOf("liqui")],
				hitbtc: onExchanges[Object.keys(coins).indexOf("hitbtc")],
				bittrex: onExchanges[Object.keys(coins).indexOf("bittrex")],
				polo: onExchanges[Object.keys(coins).indexOf("poloniex")],
				cryptopia: onExchanges[Object.keys(coins).indexOf("cryptopia")]
			};
		console.log(`**Ticker:** ${coin}\n**Volume in ${tickerVol}:** ${parseFloat(volumeExchanges[max]).toLocaleString()}\n**Last Price:** ${tickerExchanges[max][1]}\n**Ask Price:** ${tickerExchanges[max][2]}\n**Bid Price:** ${tickerExchanges[max][3]}\n**High Price:** ${tickerExchanges[max][4] || false}\n**Low Price:** ${tickerExchanges[max][5] || false}`);
	}
};
