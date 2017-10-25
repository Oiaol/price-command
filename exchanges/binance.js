const binance = async (coin) => {
	const axios = require("axios");
	try {
		console.log(coin);
		const url = await axios.get("https://www.binance.com/api/v1/ticker/allPrices");
		const symbols = url.data.map(sss => sss.symbol);
		if(coin.includes("-")) coin = coin.split("-").join("");
		else if(coin.startsWith("$")) coin = `${coin.substring(1)}USDT`;
		else coin = `${coin}BTC`;

		if(symbols.includes(coin)) {
			const { data: { quoteVolume, lastPrice, askPrice, bidPrice, highPrice, lowPrice } } = await axios.get(`https://www.binance.com/api/v1/ticker/24hr?symbol=${coin}`);
			return [quoteVolume, lastPrice, askPrice, bidPrice, highPrice, lowPrice];
		} else { return [] }
	} catch(ex) {
		console.log(ex);
		return false;
	}
};

module.exports = binance;
