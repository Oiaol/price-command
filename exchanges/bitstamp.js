const axios = require("axios");
const bitstamp = async (coin) => {
	coin = coin.toLowerCase();
	const tickers = ["btcusd", "btceur", "eurusd", "xrpusd", "xrpeur", "xrpbtc", "ltcusd", "ltceur", "ltcbtc", "ethusd", "etheur", "ethbtc"];
	if(coin.startsWith("$")) coin = `${coin.substring(1)}usd`;
	else if(coin.includes("-")) coin = coin.split("-").join("");
	else coin += "btc";
	if(tickers.includes(coin)) {
		try {
			const { data: { last, volume, high, bid, low, ask } } = await axios.get(`https://www.bitstamp.net/api/v2/ticker/${coin}/`),
				{ volume24h, price } = { volume24h: volume * last, price: last };
			return [volume24h, price, ask, bid, high, low];
		} catch(ex) {
			console.log(ex);
			return false;
		}
	} else { return [] };
};
module.exports = bitstamp;
/* "high": "6119.91",
"last": "5877.22",
"bid": "5867.72",
"low": "5700.00",
"ask": "5876.79"
*/
