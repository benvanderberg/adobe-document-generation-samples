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

const ServiceApiError = require('../../error/service-api-error'),
	Httprequest = require('../http/http-request'),
	uuid = require('uuid'),
	DefaultHeaders = require('../http/default-dc-request-options'),
	DefaultConfig = require('./../config/dc-services-default-config');

class ServiceTokenAuthenticator {
	constructor(serviceTokenCredentials) {

		Object.defineProperty(this, 'config', {
			value: serviceTokenCredentials,
			writable: false
		});
		this.token = null;
	}

	refreshSessionToken() {
		return new Promise((resolve, reject) => {
			try {
				const options = { headers: {} },
					content = [
						'grant_type=authorization_code',
						`client_id=${this.config.getClientId()}`,
						`client_secret=${this.config.getClientSecret()}`,
						`code=${this.config.getAuthCode()}`
					].join('&');
				options.headers[DefaultHeaders.SESSION_TOKEN_REQUEST_ID_HEADER_KEY] = uuid.v4();
				options.headers['x-api-app-info'] = DefaultConfig.appInfo;
				options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				options.requestConfig = {
					method: 'POST',
					uri: this.config.getImsUri()
				};
				const request = new Httprequest(options).withBodyContent(content);

				return request.call()
					.then(result => {
						if (result.status === 200) {
							result.expiresAt = (new Date().getTime() + result.content.expires_in) - (60 * 1000);
							const token = {
								access_token: result.content.access_token,
								expiresAt: result.expiresAt
							};

							return resolve(token);
						}
						return reject(new ServiceApiError(
							result.content.error,
							result.headers[DefaultHeaders.SESSION_TOKEN_REQUEST_ID_HEADER_KEY],
							result.status
						));
					})
					.catch(err => reject(err));
			} catch (err) {
				reject(err);
			}
		});
	}

	setToken(token) {
		this.token = token;
	}

	getSessionToken(forced) {
		if (this.token && !forced) {
			if (this.token.expiresAt &&
				new Date().getTime() <= this.token.expiresAt) {
				return Promise.resolve(this.token);
			}
		}
		return this.refreshSessionToken()
			.then(token => {
				this.setToken(token);
				return Promise.resolve(token);
			})
			.catch(err => Promise.reject(err));
	}
}

module.exports = ServiceTokenAuthenticator;
