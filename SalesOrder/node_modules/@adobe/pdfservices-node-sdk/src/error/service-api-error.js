/*
 * Copyright 2019 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

/**
 * The default value of status code if there is no status code for this service failure.
 * @memberOf ServiceApiError
 * @instance
 * @type {number}
 */
const DEFAULT_STATUS_CODE = 0;

/**
 * The default value of error code if there is no error code for this service failure.
 * @memberOf ServiceApiError
 * @instance
 * @type {string}
 */
const DEFAULT_ERROR_CODE = 'UNKNOWN';

/**
 * ServiceApiError is thrown when an underlying service API call results in an error.
 */
class ServiceApiError extends Error {
	/**
	 * @hideconstructor
	 */
	constructor(message, requestTrackingId, statusCode, errorCode) {
		super(message);
		this.requestTrackingId = requestTrackingId;
		this.statusCode = statusCode || DEFAULT_STATUS_CODE;
		this.name = this.constructor.name;
		this.errorCode = errorCode || DEFAULT_ERROR_CODE;

		Error.captureStackTrace(this, this.constructor);
	}

	/**
	 * Returns the HTTP Status code or {@link DEFAULT_STATUS_CODE} if the status code doesn't adequately represent the error.
	 *
	 * @returns {number}
	 */
	getStatusCode() {
		return this.statusCode;
	}

	/**
	 * Returns the Error code or {@link DEFAULT_ERROR_CODE} if the error code doesn't adequately represent the error.
	 *
	 * @returns {string}
	 */
	getErrorCode() {
		return this.errorCode;
	}

	/**
	 * Returns the detailed message of this error.
	 *
	 * @return {string} the detail message
	 */
	getMessage() {
		return this.message;
	}

	/**
	 * Returns the Request ID (the value of the X-Request-ID header).
	 *
	 * @returns {string}
	 */
	getRequestTrackingId() {
		return this.requestTrackingId;
	}


	/**
	 * Returns a user-friendly interpretation of the current error instance.
	 * @returns {string}
	 */
	toString() {
		return `description = ${this.message}; requestTrackingId = ${this.requestTrackingId
		}; statusCode = ${this.statusCode}; errorCode = ${this.errorCode}`;
	}
}

module.exports = ServiceApiError;
