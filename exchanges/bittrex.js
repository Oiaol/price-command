const axios = require("axios");
const bittrex = async (coin) => {
	try {
		const url = await axios.get("https://bittrex.com/api/v1.1/public/getmarketsummaries"),
			newMarkets = {},
			markets = url.data.result.map(market => {
				newMarkets[market.MarketName] = { Volume: market.BaseVolume, Price: market.Last, ask: market.Ask, bid: market.Bid, high: market.High, low: market.Low };
			});
		if(coin.endsWith("-ETH")) coin = `ETH-${coin.split("-")[0]}`;
		else if(coin.startsWith("$")) coin = `USDT-${coin.substring(1)}`;
		else coin = `BTC-${coin}`;
		if(Object.keys(newMarkets).includes(coin)) return [newMarkets[coin].Volume, newMarkets[coin].Price, newMarkets[coin].Ask, newMarkets[coin].ask, newMarkets[coin].bid, newMarkets[coin].high, newMarkets[coin].low];
	} catch(error) {
		console.log(error);
	}
};
module.exports = bittrex;
