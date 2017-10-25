const axios = require("axios");
const liqui = async (coin) => {
	try {
		const url = await axios.get("https://api.liqui.io/api/3/info");
    // USDT/ETH/BTC
		coin = coin.toLowerCase();
		const ticker = Object.keys(url.data.pairs);
		if(coin.endsWith("-eth")) coin = coin.replace("-", "_");
		else if(coin.startsWith("$")) coin = `${coin.substring(1)}_usdt`;
		else coin += "_btc";
		if(ticker.includes(coin)) {
			const { data: { [coin]: { vol, last, buy, sell, high, low } } } = await axios.get(`https://api.liqui.io/api/3/ticker/${coin}`);
			return [vol, last, sell, buy, high, low];
		} else {return []};
	} catch(error) {
		console.log(error);
	}
};
module.exports = liqui;

/*
asking *to sell
bidding *to buy
{"high":0.05145112,
"low":0.048,
"last":0.0492663,
"buy":0.04915256,
"sell":0.04940546
*/
