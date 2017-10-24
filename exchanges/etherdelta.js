const axios = require("axios");
const etherdelta = async (coin) => {
	if(!coin.endsWith("-ETH")) return;
	try {
		coin = coin.split("-").reverse().join("_");
		const { data, data: { [coin]: { baseVolume, last, bid, ask } } } = await axios.get("https://api.etherdelta.com/returnTicker");
		if(Object.keys(data).includes(coin)) return [baseVolume, last, ask, bid];
		else return false;
	} catch(error) {
		console.log(error.response.status);
	}
};
module.exports = etherdelta;
