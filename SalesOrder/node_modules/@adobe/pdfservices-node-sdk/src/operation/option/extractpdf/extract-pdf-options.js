const Schema = require('validate');

/**
 * Supported Elements for Json Extraction in {@link ExtractPdfOperation}
 * @enum
 * @memberOf ExtractPdfOptions
 * @readonly
 */

const ExtractElementType = {
		/**
		 * Represents Text elements to extract in the JSON
		 * @type {string}
		 */
		TEXT: 'text',
		/**
		 * Represents Table elements to extract in the JSON.
		 * @type {string}
		 */
		TABLES: 'tables',
	},
	/**
	 * Supported Output formats for exporting Tables in {@link ExtractPdfOperation}
	 * @enum
	 * @memberOf ExtractPdfOptions
	 * @readonly
	 */
	TableStructureType = {
		/**
		 * Represents CSV format for exporting extracted Table Data
		 * @type {string}
		 */
		CSV: 'csv',
		/**
		 * Represents XLSX format for exporting extracted Table Data
		 * @type {string}
		 */
		XLSX: 'xlsx',
	},
	/**
	 * Supported Elements for Renditions Extraction in {@link ExtractPdfOperation}
	 * @enum
	 * @memberOf ExtractPdfOptions
	 * @readonly
	 */
	ExtractRenditionsElementType = {
		/**
		 * Represents png renditions of Tables to generate from the PDF
		 * @type {string}
		 */
		TABLES: 'tables',
		/**
		 * Represents png renditions of Figures to generate from the PDF
		 * @type {string}
		 */
		FIGURES: 'figures',
	}

Object.freeze(TableStructureType);
Object.freeze(ExtractElementType);
Object.freeze(ExtractRenditionsElementType);
/**
 * Parameters for extract PDF file using {@link ExtractPdfOperation}.
 */
class ExtractPdfOptions {
	/**
	 * @hideconstructor
	 * @param builder
	 */

	constructor(builder) {
		this.renditionsToExtract = builder.renditionsToExtract;
		this.elementsToExtract = builder.elementsToExtract;
		this.getCharBounds = builder.getCharBounds;
		this.tableOutputFormat = builder.tableOutputFormat;
		this.includeStyling = builder.includeStyling;
		Object.preventExtensions(this);
	}

	static get ExtractElementType() {
		return ExtractElementType;
	}

	static get TableStructureType(){
		return TableStructureType;
	}

	static get ExtractRenditionsElementType(){
		return ExtractRenditionsElementType;
	}

	/**
	 * Returns a builder for {@link ExtractPdfOptions}.
	 * @memberOf ExtractPdfOptions
	 * @function
	 * @returns {ExtractPDFOptionsBuilder} A Builder instance for initializing {@link ExtractPdfOptions}.
	 */
	static get Builder() {
		/**
		 *
		 * Builds a {@link ExtractPdfOptions} instance.
		 */
		class ExtractPDFOptionsBuilder {
			/**
			 * @hideconstructor
			 */
			constructor() {
			}

			/**
			 * Sets the elements to extract - like text and/or tables.
			 * @param {ExtractPdfOptions.ExtractElementType} elements - List of Extract Element Type to be extracted
			 * @returns {ExtractPDFOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			addElementsToExtract(...elements) {
				this.elementsToExtract = elements;
				return this;
			}

			/**
			 * Sets the renditions to extract - like tables and/or figures.
			 * @param {ExtractPdfOptions.ExtractRenditionsElementType} elements - List of Renditions Element Type to be extracted
			 * @returns {ExtractPDFOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			addElementsToExtractRenditions(...elements) {
				this.renditionsToExtract = elements;
				return this;
			}

			/**
			 * Boolean specifying whether to add character level bounding boxes to output json
			 * @param {Boolean} element - Set True to extract character level bounding boxes information
			 * @return {ExtractPDFOptionsBuilder} - This Builder instance to add any additional parameters.
			 */
			addCharInfo(element){
				this.getCharBounds = element;
				return this;
			}

			/**
			 * Adds the table structure format (currently csv only) for extracting structured information.
			 * @param {ExtractPdfOptions.TableStructureType} element - TableStructureType to be extracted
			 * @return ExtractPdfOperation - current ExtractPdfOperation instance
			 */
			addTableStructureFormat(element){
				this.tableOutputFormat = element;
				return this;
			}

			/**
			 * Boolean specifying whether to get styling info of text
			 * @param {Boolean} element - Set True to extract styling info of text
			 * @return {ExtractPDFOptionsBuilder} - This Builder instance to add any additional parameters.
			 */
			getStylingInfo(element){
				this.includeStyling = element;
				return this;
			}


			/**
			 * Returns a new {@link ExtractPdfOptions} instance built from the current state of this builder.
			 * @returns {ExtractPdfOptions} A new ExtractPdfOptions instance.
			 */
			build() {
				let extractPDFOptions =  new ExtractPdfOptions(this);
				Object.freeze(extractPDFOptions);
				return extractPDFOptions;
			}
		}

		return ExtractPDFOptionsBuilder;
	}

	validate() {
		const validator = new Schema({
			'tableStructureType': {
				type: String,
				required: false,
				message: {
					type: 'tableStructureType must be a tableStructureType',
					required: 'tableStructureType cannot be null or empty'
				}
			},
			'addCharInfo': {
				type: Boolean,
				required: false,
				message: {
					type: 'addCharInfo must be a boolean',
					required: 'addCharInfo cannot be null or empty'
				}
			},
			'elementsToExtractRenditions': {
				type: Array,
				required: false,
				message: {
					type: 'elementsToExtractRenditions must be an Array',
					required: 'elementsToExtractRenditions cannot be null or empty'
				}
			},
			'elementsToExtract': {
				type: Array,
				required: true,
				message: {
					type: 'elementsToExtract must be an Array',
					required: 'elementsToExtract cannot be null or empty'
				}
			}
		});
		return validator.validate(this);
	}
}

module.exports = ExtractPdfOptions;
