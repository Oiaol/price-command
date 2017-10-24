const axios = require("axios");

const hitbtc = async (coin) => {
	if(coin.endsWith("-ETH")) coin = coin.split("-").reverse().join("");
	else if(coin.startsWith("$")) coin = `${coin.substring(1)}USD`;
	else coin += "BTC";
	try {
		const url = await axios.get("https://api.hitbtc.com/api/1/public/ticker");
		if(Object.keys(url.data).includes(coin)) return [url.data[coin].volume_quote, url.data[coin].last, url.data[coin].ask, url.data[coin].bid, url.data[coin].high, url.data[coin].low];
	} catch(error) {
		console.log(error);
	}
};

module.exports = hitbtc;
/* "ask":"0.0000002504",
"bid":"0.0000002501",
"last":"0.0000002503",
"low":"0.0000002500",
"high":"0.0000002570"
[
    VOLUME,
    LAST,
    HIGH,
    LOW,
    ASK,
    BID
]
*/
