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
		return this._parseError(payload);
	}

	/**
	 * 
	 * @param {*} payload 
	 */
	_parseError(payload){

		return payload.error.data;
	}

}

module.exports = ErrorParser;
