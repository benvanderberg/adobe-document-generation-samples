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
 * Parameters for getting properties of a PDF using {@link PDFPropertiesOperation}.
 */
class PDFPropertiesOptions {
	/**
	 * @hideconstructor
	 * @param builder
	 */

	constructor(builder) {
		this.pageLevel = builder.includePageLevelProperties;
		Object.preventExtensions(this);
	}

	/**
	 * Returns a builder for {@link PDFPropertiesOptions}.
	 * @memberOf PDFPropertiesOptions
	 * @function
	 * @returns {PDFPropertiesOptionsBuilder} A Builder instance for initializing {@link PDFPropertiesOptions}.
	 */
	static get Builder() {
		/**
		 *
		 * Builds a {@link PDFPropertiesOptions} instance.
		 */
		class PDFPropertiesOptionsBuilder {
			/**
			 * @hideconstructor
			 */
			constructor() {
			}

			/**
			 * Sets the includePageLevelProperties parameter.
			 * If true, the page level properties of the input PDF will be included in the resulting JSON file.
			 *
			 * @param {!Boolean} includePageLevelProperties - Default value is false.
			 * @returns {PDFPropertiesOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			includePageLevelProperties(includePageLevelProperties) {
				if(includePageLevelProperties == null)
					throw new Error("includePageLevelProperties cannot be null");
				this.includePageLevelProperties = includePageLevelProperties;
				return this;
			}

			/**
			 * Returns a new {@link PDFPropertiesOptions} instance built from the current state of this builder.
			 * @returns {PDFPropertiesOptions} A new PDFPropertiesOptions instance.
			 */
			build() {
				let pdfPropertiesOptions =  new PDFPropertiesOptions(this);
				Object.freeze(pdfPropertiesOptions);
				return pdfPropertiesOptions;
			}
		}

		return PDFPropertiesOptionsBuilder;
	}
	validate() {
		const validator = new Schema({
			'pageLevel': {
				type: Boolean,
				required: false,
				message: {
					type: 'includePageLevelProperties must be a boolean'
				}
			}
		});
		return validator.validate(this);
	}
}

module.exports = PDFPropertiesOptions;
