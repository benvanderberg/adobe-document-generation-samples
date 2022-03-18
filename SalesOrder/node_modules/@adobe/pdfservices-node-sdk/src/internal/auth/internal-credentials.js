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

const ServiceTokenCredentialsBuilder = require('./service-token-credentials-builder');
/**
 * For Internal use only
 * Marker base class for different types of credentials. Currently it supports only {@link ServiceTokenCredentials}.
 * The factory methods within this class can be used to create instances of credentials classes.
 */
class InternalCredentials {
	/**
	 * @hideconstructor
	 */
	constructor() {
	}

	/**
	 *
	 * Creates a new {@link ServiceTokenCredentials} builder.
	 * @memberOf Credentials
	 * @function
	 * @returns {ServiceTokenCredentials} A new ServiceAccountCredentials instance.
	 *
	 */
	static serviceTokenCredentialsBuilder() {
		return new ServiceTokenCredentialsBuilder();
	}
}

module.exports = InternalCredentials;
