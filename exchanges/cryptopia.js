const axios = require("axios");
const cryptopia = async (coin) => {
	try {
		const url = await axios.get("https://www.cryptopia.co.nz/api/GetMarkets"),
			tickerObj = {},
			tickerData = url.data.Data.map(a => {
				tickerObj[a.Label] = { volume: a.BaseVolume, price: a.LastPrice, ask: a.AskPrice, bid: a.BidPrice, high: a.High, low: a.Low };
			});
		if(coin.startsWith("$")) coin = `${coin.substring(1)}/USDT`;
		else if(coin.endsWith("-NZDT") || coin.endsWith("-USDT") || coin.endsWith("-LTC") || coin.endsWith("-DOGE")) coin = coin.split("-").join("/");
		else coin = `${coin}/BTC`;
        if(tickerObj[coin]) return [tickerObj[coin].volume, tickerObj[coin].price, tickerObj[coin].ask, tickerObj[coin].bid, tickerObj[coin].low];
	} catch(error) {
		console.log(error);
	}
};

module.exports = cryptopia;
/*"AskPrice":0.00000019,
"BidPrice":0.00000018,
"Low":0.00000018,
"High":0.00000021,
"LastPrice":0.00000018,
 */