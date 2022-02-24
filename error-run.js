const { connect, keyStores } = require("near-api-js");
const path = require("path");
const ErrorParser = require("./error-parser");
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
const accountId = "youraccount." + network + "net";
// /*

/*

	near tx-status 2jTjceFYwriWuAqpvzdVbTof88E7YKt9td9J7iU9hYeP --accountId tbt.testnet

	so there are cases where TX does not exists, and when they do its simple to parse

	when they dont exists, near-api-js does throw error stack

*/
//const txStack = ["2jTjceFYwriWuAqpvzdVbTof88E7YKt9td9J7iU9hYeP"];
const txStack = ["2jTjceFYwriWuAqpvzdVbTof88E7YKt9td9J7iU9hYe1"];

/**
 * Use TXParser
 */
(async function () {

	try {
		txStack.forEach(async (txHash) => {
			const near = await connect(getConfig());
			let response = await near.connection.provider.txStatus(txHash, accountId);
			console.log(response);
			const errorp = new ErrorParser();
			const payload = await errorp.getReadableError(response);
			//console.log(payload);
		});
	}
	catch (error) {
		console.error(error);
	}

})();


async function txStatus(txHash, accountId) {
	// working !!!!!!!
	// 1. connect

}
