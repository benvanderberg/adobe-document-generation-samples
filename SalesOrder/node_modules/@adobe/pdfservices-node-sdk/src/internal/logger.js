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

const log4js = require('log4js'),
	fs = require('fs'),
	DefaultConfig = require('./config/dc-services-default-config');

const defaultLogConfig = {
		appenders: {
			console: {
				type: 'console',
				layout: {
					type: 'pattern',
					pattern: '%d:[%p]: %m'
				}
			}
		},
		categories: {
			default: { appenders: ['console'], level: 'info' }
		}
	},
	initializeLogger = () => {
		if (fs.existsSync(DefaultConfig.logFileName)) {
			// eslint-disable-next-line no-console
			console.log(`Logging configuration found at ${DefaultConfig.logFileName}.`);
			log4js.configure(DefaultConfig.logFileName);
		} else {
			// eslint-disable-next-line no-console
			console.log('No logging configuration. Using default config');
			log4js.configure(defaultLogConfig);
		}
		return log4js.getLogger();
	};


module.exports = initializeLogger();
