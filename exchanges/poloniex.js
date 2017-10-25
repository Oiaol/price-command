const axios = require("axios");

const poloniex = async (coin) => {
	const testHyphen = new RegExp("\\w{1,}[\\-]\\b", "g");
	if(testHyphen.test(coin)) coin = coin.split("-").reverse().join("_");
	else if(coin.startsWith("$")) coin = `USDT_${coin.substring(1)}`;
	else coin = `BTC_${coin}`;
	try {
		const tickerData = await axios.get("https://poloniex.com/public?command=returnTicker");
		if(Object.keys(tickerData.data).includes(coin)) {
			const { [coin]: { baseVolume, last, lowestAsk, highestBid, high24hr, low24hr } } = tickerData.data;
			return [baseVolume, last, lowestAsk, highestBid, high24hr, low24hr];
		} else {return []};
	} catch(error) {
		console.log(error);
	}
};


module.exports = poloniex;
/* "last":"0.00000025",
"lowestAsk":"0.00000025",
"highestBid":"0.00000024",
"high24hr":"0.00000025",
"low24hr":"0.00000024"
*/
