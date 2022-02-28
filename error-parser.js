/**
 * TXParser: a simple parser to return TX Actions in a more readeable form to be used for logging
 * Return object will be an array and can have multiple Actions in a readable form
 * 
 */
 class ErrorParser {

	/**
	 * 
	 * @param {*} payload 
	 * @returns 
	 */
	getReadableError(payload){
		// parse varios error here
		return "this shohuld be redable"
	}

	/**
	 * 
	 * @param {*} payload 
	 */
	_parseError(payload){

		console.log(payload);
	}

}

module.exports = ErrorParser;
