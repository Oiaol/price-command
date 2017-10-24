/* PRICE COMMAND, YOU'LL BE ABLE TO SEARCH A COIN ON ALL EXCHANGES
THIS WILL BE AVAILABLE IN A WEEK'S TIME.
THE USAGE WILL BE AS SHOWN.. PRICE BTC = BTC FROM THE EXCHANGE WHERE THE VOLUME IS THE MOST SO PROBBALY BITMEX AND THATS THE USE.
EXCHANGES I AM GOING TO USE:
BITFINEX - done
BITTREX - done
POLONIEX - done
HITBTC - done
BINANCE - done
KRAKEN - DONE

BITSTAMP - done
YOBIT - done
LIQUI - done
ETHERDELTA - done
*/
const axios = require("axios");
const bitfinex = require("./exchanges/bitfinex.js");// ETH BTC USD
const yobit = require("./exchanges/yobit.js");// DOGE ETH BTC USDT RUR WAVES
const binance = require("./exchanges/binance.js");
const kraken = require("./exchanges/kraken.js");
const bitstamp = require("./exchanges/bitstamp.js");// USD EUR BTC
const liqui = require("./exchanges/liqui.js");
const hitbtc = require("./exchanges/hitbtc.js");
const bittrex = require("./exchanges/bittrex.js");
const poloniex = require("./exchanges/poloniex.js");
const cryptopia = require("./exchanges/cryptopia.js");
/* CALL A FUNCTION
AND ACCESS THE ARRAY IN THIS ORDER
[
    VOLUME,
    LAST
    ASK,
    BID,
    HIGH,
    LOW,
]
*/
const price = async (coin) => {
	const testHyphen = new RegExp("\\w{1,}[\\-]\\b", "g");
	const [isOnBitfinex, isOnYobit, isOnBinance, isOnKraken, isOnBitstamp, isOnLiqui, isOnHitbtc, isOnBittrex, isOnPolo, isOnCryptopia] = await Promise.all([bitfinex(coin), yobit(coin), binance(coin), kraken(coin), bitstamp(coin), liqui(coin), hitbtc(coin), bittrex(coin), poloniex(coin), cryptopia(coin)]);
	const ticker = coin.split("-")[1];
	if(isOnBitfinex || isOnYobit || isOnBinance || isOnKraken || isOnBitstamp || isOnLiqui || isOnHitbtc || isOnBittrex || isOnPolo || isOnCryptopia) {
		if(testHyphen.test(coin)) {
			const volumeExchanges = {
				bitfinex: isOnBitfinex ? isOnBitfinex[0] : false,
				yobit: isOnYobit ? isOnYobit[0] : false,
				binance: isOnBinance ? isOnBinance[0] : false,
				kraken: isOnKraken ? isOnKraken[0] : false,
				bitstamp: isOnBitstamp ? isOnBitstamp[0] : false,
				liqui: isOnLiqui ? isOnLiqui[0] : false,
				hitbtc: isOnHitbtc ? isOnHitbtc[0] : false,
				bittrex: isOnBittrex ? isOnBittrex[0] : false,
				polo: isOnPolo ? isOnPolo[0] : false,
				cryptopia: isOnCryptopia ? isOnCryptopia[0] : false
			};
			const max = Object.keys(volumeExchanges).reduce((a, b) => volumeExchanges[a] > volumeExchanges[b] ? a : b);
			if(typeof max === "undefined") return;
			console.log(max);
			const tickerExchanges = {
				bitfinex: isOnBitfinex ? isOnBitfinex : false,
				yobit: isOnYobit ? isOnYobit : false,
				binance: isOnBinance ? isOnBinance : false,
				kraken: isOnKraken ? isOnKraken : false,
				bitstamp: isOnBitstamp ? isOnBitstamp : false,
				liqui: isOnLiqui ? isOnLiqui : false,
				hitbtc: isOnHitbtc ? isOnHitbtc : false,
				bittrex: isOnBittrex ? isOnBittrex : false,
				polo: isOnPolo ? isOnPolo : false,
				cryptopia: isOnCryptopia ? isOnCryptopia : false
			};
			console.log(`This information is from ${max} ${volumeExchanges[max]}\n last: ${tickerExchanges[max][1]}\nask price: ${tickerExchanges[max][2]}\nbid price: ${tickerExchanges[max][3]}\nhigh price: ${tickerExchanges[max][4]}\nlow pirce: ${tickerExchanges[max][5]}`);
		} else {
			const volumeExchanges = {
				bitfinex: isOnBitfinex ? isOnBitfinex[0] : false,
				yobit: isOnYobit ? isOnYobit[0] : false,
				binance: isOnBinance ? isOnBinance[0] : false,
				kraken: isOnKraken ? isOnKraken[0] : false,
				bitstamp: isOnBitstamp ? isOnBitstamp[0] : false,
				liqui: isOnLiqui ? isOnLiqui[0] : false,
				hitbtc: isOnHitbtc ? isOnHitbtc[0] : false,
				bittrex: isOnBittrex ? isOnBittrex[0] : false,
				polo: isOnPolo ? isOnPolo[0] : false,
				cryptopia: isOnCryptopia ? isOnCryptopia[0] : false
			};
			const max = Object.keys(volumeExchanges).reduce((a, b) => volumeExchanges[a] > volumeExchanges[b] ? a : b);
			if(typeof max === "undefined") return;
			console.log(max);
			const tickerExchanges = {
				bitfinex: isOnBitfinex ? isOnBitfinex : false,
				yobit: isOnYobit ? isOnYobit : false,
				binance: isOnBinance ? isOnBinance : false,
				kraken: isOnKraken ? isOnKraken : false,
				bitstamp: isOnBitstamp ? isOnBitstamp : false,
				liqui: isOnLiqui ? isOnLiqui : false,
				hitbtc: isOnHitbtc ? isOnHitbtc : false,
				bittrex: isOnBittrex ? isOnBittrex : false,
				polo: isOnPolo ? isOnPolo : false,
				cryptopia: isOnCryptopia ? isOnCryptopia : false
			};
			console.log(`This information is from ${max} ${volumeExchanges[max]}\n last: ${tickerExchanges[max][1]}\nask price: ${tickerExchanges[max][2]}\nbid price: ${tickerExchanges[max][3]}\nhigh price: ${tickerExchanges[max][4]}\nlow pirce: ${tickerExchanges[max][5]}`);
		}
	}
};
async function main() {
	console.log(await price("ETH"));
}
main();