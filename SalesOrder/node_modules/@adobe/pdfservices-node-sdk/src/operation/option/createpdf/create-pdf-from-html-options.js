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

const PageLayout = require('./page-layout'),
	Schema = require('validate');

const PRINT_HEADER_FOOTER_BY_DEFAULT = true;
const DATA_TO_MERGE_BY_DEFAULT = {};
/**
 * Parameters for converting HTML to PDF using {@link CreatePDFOperation}.
 */
class CreatePDFFromHtmlOptions {
	/**
     * @hideconstructor
     * @param builder
     */
	constructor(builder) {
		this.includeHeaderFooter = builder.includeHeaderFooter;
		this.pageLayout = builder.pageLayout;
		this.dataToMerge = builder.dataToMerge;
		Object.preventExtensions(this);
	}

	/**
     * Returns a builder for {@link CreatePDFFromHtmlOptions}.
     * @memberOf CreatePDFFromHtmlOptions
     * @function
     * @returns {CreatePDFFromHtmlOptionsBuilder} A Builder instance for initializing {@link CreatePDFFromHtmlOptions}.
     */
	static get Builder() {
		/**
         *
         * Builds a {@link CreatePDFFromHtmlOptions} instance.
         */
			class CreatePDFFromHtmlOptionsBuilder {
			/**
             * Constructs a {@link CreatePDFFromHtmlOptionsBuilder} instance.
             */
			constructor() {
				this.includeHeaderFooter = PRINT_HEADER_FOOTER_BY_DEFAULT;
				this.pageLayout = new PageLayout();
				this.dataToMerge = DATA_TO_MERGE_BY_DEFAULT;
			}


			/**
             * Sets the includeHeaderFooter parameter. If true, default header and footer will be included in resulting PDF.
             * The default header consists of the date and the document.title.
             * The default footer consists of the file name and page number.
             * @param {!Boolean} includeHeaderFooter - True if default header and footer should be included in the
             * resulting PDF. Default value is true.
             * @returns {CreatePDFFromHtmlOptionsBuilder} This Builder instance to add any additional parameters.
             */
			includesHeaderFooter(includeHeaderFooter) {
				this.includeHeaderFooter = includeHeaderFooter;
				return this;
			}

			/**
             * Sets the pageLayout parameter.
             * @param {!PageLayout} pageLayout - Intended page layout of the resulting PDF file.
             * @returns {CreatePDFFromHtmlOptionsBuilder} This builder instance to add any additional parameters.
             */
			withPageLayout(pageLayout) {
				this.pageLayout = pageLayout;
				return this;
			}

			/**
			 * Sets the data to be used by the javascript in the source html file to manipulate the HTML DOM before it
			 * gets converted to PDF. This mechanism is intended to be used to supply data that might otherwise be
			 * retrieved using ajax requests.
			 *
			 * To make use of this mechanism, the source html file must include a script element such as:
			 *
			 * &nbsp;&nbsp;&nbsp; \<script src='./json.js' type='text/javascript'\>\</script\>
			 *
			 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; where json.js refers to the JSON data,
			 *
			 * And also requires javascript in the source html file to make use of this JSON data to manipulate the
			 * HTML DOM.
			 * @param {Object=} jsonValue - JSON object.
			 * @returns {CreatePDFFromHtmlOptionsBuilder} This builder instance to add any additional parameters.
			 */
			withDataToMerge(jsonValue) {
				this.dataToMerge = jsonValue;
				return this;
			}
			/**
             * Returns a new {@link CreatePDFFromHtmlOptions} instance built from the current state of this builder.
             * @returns {CreatePDFFromHtmlOptions} A CreatePDFFromHtmlOptions instance.
             */
			build() {
				let createPDFFromHtmlOptions =  new CreatePDFFromHtmlOptions(this);
				Object.freeze(createPDFFromHtmlOptions);
				return createPDFFromHtmlOptions;
			}
		}

		return CreatePDFFromHtmlOptionsBuilder;
	}

	validate() {
		const validator = new Schema({
			'includeHeaderFooter': {
				type: Boolean,
				required: true,
				message: {
					type: 'includeHeaderFooter must be a Boolean',
					require: 'includeHeaderFooter cannot be null'
				}
			},
			'pageLayout': {
				'pageWidth': {
					type: Number,
					required: true,
					message: {
						type: 'pageWidth must be a number',
						required: 'pageWidth cannot be null'
					}
				},
				'pageHeight': {
					type: Number,
					required: true,
					message: {
						type: 'pageHeight must be a number',
						required: 'pageHeight cannot be null'
					}
				}
			}
		});
		return validator.validate(this);
	}
}

module.exports = CreatePDFFromHtmlOptions;
