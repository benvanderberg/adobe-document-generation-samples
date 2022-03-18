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

const Schema = require('validate');

/**
 * Supported compression levels for {@link CompressPDFOperation}
 * @enum
 * @memberOf CompressPDFOptions
 * @readonly
 */
const CompressionLevel = {
	/**
	 * Reduces the file size of pdf by reducing resolution of the coloured and grayscale images above 100 dpi to 72 dpi (dots per inch).
	 * This option uses JPEG medium quality compression.
	 * Output pdf will not contain hidden layers, document structure, metadata, javascript, user properties and print settings.
	 * @type {string}
	 */
	HIGH:'HIGH',
	/**
	 * Reduces the file size of pdf by reducing resolution of the coloured and grayscale images above 200 dpi to 144 dpi (dots per inch).
	 * This option uses JP2K medium quality compression.
	 * @type {string}
	 */
	MEDIUM:'MEDIUM',
	/**
	 * Reduces the file size of pdf by reducing resolution of the coloured and grayscale images above 250 dpi to 200 dpi (dots per inch).
	 * This option uses JP2K high quality compression.
	 * @type {string}
	 */
	LOW:'LOW'
};

Object.freeze(CompressionLevel);

/**
 * Parameters for reducing file size of a pdf using {@link CompressPDFOperation}.
 */
class CompressPDFOptions {
	/**
	 * @hideconstructor
	 * @param builder
	 */
	constructor(builder) {
		this.compressionLevel = builder.compressionLevel;
		Object.preventExtensions(this);
	}

	static get CompressionLevel() {
		return CompressionLevel;
	}

	/**
	 * Returns a builder for {@link CompressPDFOptions}.
	 * @memberOf CompressPDFOptions
	 * @function
	 * @returns {CompressPDFOptionsBuilder} A Builder instance for initializing {@link CompressPDFOptions}.
	 */
	static get Builder() {
		/**
		 *
		 * Builds a {@link CompressPDFOptions} instance.
		 */
		class CompressPDFOptionsBuilder {
			/**
			 * @hideconstructor
			 */
			constructor() {
			}

			/**
			 * Sets compression level to be used for Compress PDF, specified by {@link CompressPDFOptions.CompressionLevel}
			 * @param {!CompressPDFOptions.CompressionLevel} compressionLevel - see {@link CompressPDFOptions.CompressionLevel}.
			 * @returns {CompressPDFOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			withCompressionLevel(compressionLevel) {
				if(!compressionLevel) throw new Error("compressionLevel cannot be null");
				this.compressionLevel = compressionLevel;
				return this;
			}
			/**
			 * Returns a new {@link CompressPDFOptions} instance built from the current state of this builder.
			 * @returns {CompressPDFOptions} A new CompressPDFOptions instance.
			 */
			build() {
				let compressPdfOptions =  new CompressPDFOptions(this);
				Object.freeze(compressPdfOptions);
				return compressPdfOptions;
			}
		}

		return CompressPDFOptionsBuilder;
	}

	validate() {
		const validator = new Schema({
			'compressionLevel': {
				type: String,
				required: false,
				enum:Object.values(CompressionLevel),
				message: {
					type: 'compressionLevel must be a string',
					require: 'compressionLevel cannot be null'
				}
			}
		});
		return validator.validate(this);
	}
}


module.exports = CompressPDFOptions;
