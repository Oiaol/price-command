const axios = require("axios");
const yobit = async (coin) => {
	try {
		const { data: { pairs } } = await axios.get("https://yobit.net/api/3/info");
    // USD/ETH/BTC/WAVES/RUR
		coin = coin.toLowerCase();
		const testHyphen = new RegExp("\\w{1,}[\\-]\\b", "g");
		if(testHyphen.test(coin)) coin = coin.replace("-", "_");
		else if(coin.startsWith("$")) coin = `${coin.substring(1)}_usd`;
		else coin += "_btc";

		if(Object.keys(pairs).includes(coin)) {
			const { data: { [coin]: { vol, last, sell, buy, high, low } } } = await axios.get(`https://yobit.net/api/3/ticker/${coin}`);
			return [vol, last, sell, buy, high, low];
		} else {return []}
	} catch(error) {
		console.log(error);
	}
};

module.exports = yobit;
/*	"high":0.00979978,
	"low":0.0094,
	"last":0.00953803,
	"buy"bid:0.00943425,
	"sell"ask:0.00953998
	*/
