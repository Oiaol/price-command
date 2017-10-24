const axios = require("axios");
const kraken = async (coin) => {
	const testHyphen = new RegExp("\\w{1,}[\\-]\\b", "g");
	if(testHyphen.test(coin)) coin = coin.split("-").join("");
	else if(coin.startsWith("$")) coin = `${coin.substring(1)}USD`;
	else coin += "XBT";

	if(coin.startsWith("BTC")) coin = coin.replace(/BTC/i, "XBT");

	try {
		const { data, data: { error } } = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${coin}`);
		if(error.length) return;
		const { volume, price, ask, bid, high, low} = { volume: data.result[Object.keys(data.result)[0]].v[0], price: data.result[Object.keys(data.result)[0]].c[0], ask: data.result[Object.keys(data.result)[0]].a[0], bid: data.result[Object.keys(data.result)[0]].b[0], high: data.result[Object.keys(data.result)[0]].h[0], low: data.result[Object.keys(data.result)[0]].l[0] };
		return [volume * price, price, ask, bid, high, low];
	} catch(error) {
		console.log(error);
	}
};

module.exports = kraken;

/*a = ask array(<price>, <whole lot volume>, <lot volume>),
b = bid array(<price>, <whole lot volume>, <lot volume>),
c = last trade closed array(<price>, <lot volume>),
l = low array(<today>, <last 24 hours>),
h = high array(<today>, <last 24 hours>),
*/