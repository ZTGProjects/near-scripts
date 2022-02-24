const { connect, keyStores } = require("near-api-js");
const path = require("path");
const TXParser = require("near-tx-parser");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";

/**
 * SET NETWORK FLAG !!
 * set to false for testnet , true for mainnet 
 */
const IS_TEST = true;
let network = "";

// return config
function getConfig() {

	// set network for testing
	(IS_TEST) ? network = "test" : network = "main";

	// generate connect config
	// const keyStore = new keyStores.UnencryptedFileSystemKeyStore(path.join(homedir, CREDENTIALS_DIR));
	return config = {
		keyStore: new keyStores.UnencryptedFileSystemKeyStore(path.join(homedir, CREDENTIALS_DIR)),
		networkId: network + "net",
		nodeUrl: "https://archival-rpc." + network + "net.near.org",
	};
}

// account id
// ******** WHY IT WORKS WHEN ACCOUNT ID S WRONG ???????????
//
const accountId = "narwalsandeep." + network + "net";
// tx id
// /*
const txStack = [
	"6YRJMXDtZSAZSdZrUnYcuZSfrVKzH1QHeQBBQwUwVjhM",
	"CJKdeHET5TvTf31cAWpeKNB6uHouSK3FLvfV3RsHSxp4",
	"CukbtuCgay4vJv697osi1ep4h1FV2dZ5fUhUPJ1JjaG",
	"2rqBxoUzR8Ks4Yg1CzdbDZZ8DnQ6G7gwcxHqE2W18HcQ",
	"c3Cbkjz5BN2MnrzsDzbpng9FNciSiCSATPGfyU57Vxs",
	"8LtnF5vaLC5u3rabh5dbFpeGM7nVbPTzbXhZRFeEbMB5",
	"8AxCbwcGX6aJQzVpX5xjLcA9pWRkCgGeMiFq5oeCeQNg",
	"2FNdUoXp2uQPfdU9SxSi8qCaj961sKBq5FJMq79J2mBn",
	"BUFpmGhHAdE4q1EfwzF6Bt3Trf3FCPginu8yFzHADi1s",
	"9uj4UAGxrNJ7LQ9hXLAd4LuFH3xiExxRyzxhLxRcyzg1",
	"8mhwPPRwphvqBXDEdiRMrueVPYoPwAjrRKoJsEXx3YyG",
	"8YHQp7gLbjiLSCn55W3Cg8S9sTtNpRepbJ4RNqhf5MaN",
	"33phYKtX35fn71CLqyHwrLFKAoUAsBK9qWvNC1WdNMbi"
];

// */

/*

	tried to send 1000 to vineetsai.testnet, return tx hash below
	EEo9dD5v3P9B9Z7aVFCLcpP31EK8TereKU1DDCZV3DcF
	but tx not found ??

	we tried
	near delete narwalsandeep.testnet vineetsaivineetsai.testnet
	BC4PNBYPWGugdYWZ2hifRsJdbpgYNLA4gL1FCmCNpTHz
	it return tx hash but this works
	near tx-status 8mhwPPRwphvqBXDEdiRMrueVPYoPwAjrRKoJsEXx3YyG --accountId narwalsandeep.testnet

	stake examplle
	near tx-status 2jTjceFYwriWuAqpvzdVbTof88E7YKt9td9J7iU9hYeP --accountId tbt.testnet

	so there are cases where TX does not exists, and when they do its simple to parse

	when they dont exists, near-api-js does throw error stack

*/
// const txStack = ["2jTjceFYwriWuAqpvzdVbTof88E7YKt9td9J7iU9hYeP"];

/**
 * Use TXParser
 */
(async function () {

	try {
		txStack.forEach(async (txHash) => {
			let txPayload = await txStatus(txHash, accountId);
			// let response = await txStatusReceipts(txHash,accountId);
			//console.log(JSON.stringify(txPayload, null, 2));
			// 3. init parser
			const txp = new TXParser();
			// 4. call parser method with payload
			const raw = await txp.getReadableTx(txPayload);
			// 5. view log
			//console.log(JSON.stringify(raw, null, 2));
			 console.log(raw[0].readable);
		});
	}
	catch (error) {
		console.error(error);
	}

})();

async function txStatusReceipts(txHash, accountId) {

	// failed
	// 1. connect
	const near = await connect(getConfig());
	// 2. get tx payload from provider
	let res = await near.connection.provider.txStatusReceipts([txHash], accountId);
	const txp = new TXParser();
	return await txp.getReadableTx(res);

}

async function txStatus(txHash, accountId) {
	// working !!!!!!!
	// 1. connect
	const near = await connect(getConfig());
	// 2. get tx payload from provider
	return await near.connection.provider.txStatus(txHash, accountId);

}
