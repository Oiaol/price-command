const bitfinex = async (coin) => {
	const axios = require("axios");
	if(coin.endsWith("-ETH")) coin = coin.split("-").reverse().join("");
	else if(coin.startsWith("$")) coin = `${coin.substring(1)}USD`;
	else coin = `${coin}BTC`;
	try {
		const bitfinexData = await axios.get(`https://api.bitfinex.com/v2/ticker/t${coin}`);
		const price = bitfinexData.data[6],
			volume = bitfinexData.data[7] * price,
			ask = bitfinexData.data[0],
			bid = bitfinexData.data[2],
			high = bitfinexData.data[8],
			low = bitfinexData.data[9];
		return [volume, price, ask, bid, high, low];
	} catch(error) {
		console.error;
	}
};

module.exports = bitfinex;
