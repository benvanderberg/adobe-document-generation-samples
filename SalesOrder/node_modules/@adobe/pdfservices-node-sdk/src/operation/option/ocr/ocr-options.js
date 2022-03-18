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
 * List of supported OCR types for {@link OCROperation}
 * @enum
 * @memberOf OCROptions
 * @readonly
 */
const OCRSupportedType = {
	/**
	 * Ensures that text is searchable and selectable. This option keeps the original image, deskews it as needed,
	 * and places an invisible text layer over it.
	 * @type {string}
	 */
	SEARCHABLE_IMAGE: 'searchable_image',
	/**
	 * Ensures that text is searchable and selectable. This option keeps the original image and places an invisible
	 * text layer over it. Recommended for cases requiring maximum fidelity to the original image.
	 * @type {string}
	 */
	SEARCHABLE_IMAGE_EXACT: 'searchable_image_exact'
	},

	/**
	 * List of supported locales for {@link OCROperation}
	 * @enum
	 * @memberOf OCROptions
	 * @readonly
	 */
	OCRSupportedLocale = {
		/**
		 * Represents "Danish (Denmark)" locale
		 * @type {string}
		 */
		DA_DK: 'da-DK',
		/**
		 * Represents "Lithuanian (Lithuania)" locale
		 * @type {string}
		 */
		LT_LT: 'lt-LT',
		/**
		 * Represents "Slovenian (Slovenia)" locale
		 * @type {string}
		 */
		SL_SI: 'sl-SI',
		/**
		 * Represents "Greek (Greece)" locale
		 * @type {string}
		 */
		EL_GR: 'el-GR',
		/**
		 * Represents "Russian (Russia)" locale
		 * @type {string}
		 */
		RU_RU: 'ru-RU',
		/**
		 * Represents "English (United States)" locale
		 * @type {string}
		 */
		EN_US: 'en-US',
		/**
		 * Represents "Chinese (Hong Kong)" locale
		 * @type {string}
		 */
		ZH_HK: 'zh-HK',
		/**
		 * Represents "Hungarian (Hungary)" locale
		 * @type {string}
		 */
		HU_HU: 'hu-HU',
		/**
		 * Represents "Estonian (Estonia)" locale
		 * @type {string}
		 */
		ET_EE: 'et-EE',
		/**
		 * Represents "Portuguese (Brazil)" locale
		 * @type {string}
		 */
		PT_BR: 'pt-BR',
		/**
		 * Represents "Ukrainian (Ukraine)" locale
		 * @type {string}
		 */
		UK_UA: 'uk-UA',
		/**
		 * Represents "Norwegian (Norway)" locale
		 * @type {string}
		 */
		NB_NO: 'nb-NO',
		/**
		 * Represents "Polish (Poland)" locale
		 * @type {string}
		 */
		PL_PL: 'pl-PL',
		/**
		 * Represents "Latvian (Latvia)" locale
		 * @type {string}
		 */
		LV_LV: 'lv-LV',
		/**
		 * Represents "Finnish (Finland)" locale
		 * @type {string}
		 */
		FI_FI: 'fi-FI',
		/**
		 * Represents "Japanese (Japan)" locale
		 * @type {string}
		 */
		JA_JP: 'ja-JP',
		/**
		 * Represents "Spanish (Spain)" locale
		 * @type {string}
		 */
		ES_ES: 'es-ES',
		/**
		 * Represents "Bulgarian (Bulgaria)" locale
		 * @type {string}
		 */
		BG_BG: 'bg-BG',
		/**
		 * Represents "English (United Kingdom)" locale
		 * @type {string}
		 */
		EN_GB: 'en-GB',
		/**
		 * Represents "Czech (Czech Republic)" locale
		 * @type {string}
		 */
		CS_CZ: 'cs-CZ',
		/**
		 * Represents "Maltese (Malta)" locale
		 * @type {string}
		 */
		MT_MT: 'mt-MT',
		/**
		 * Represents "German (Germany)" locale
		 * @type {string}
		 */
		DE_DE: 'de-DE',
		/**
		 * Represents "Croatian (Croatia)" locale
		 * @type {string}
		 */
		HR_HR: 'hr-HR',
		/**
		 * Represents "Slovak (Slovakia)" locale
		 * @type {string}
		 */
		SK_SK: 'sk-SK',
		/**
		 * Represents "Serbian (Serbia)" locale
		 * @type {string}
		 */
		SR_SR: 'sr-SR',
		/**
		 * Represents "Catalan (Canada)" locale
		 * @type {string}
		 */
		CA_CA: 'ca-CA',
		/**
		 * Represents "Macedonian (Macedonia)" locale
		 * @type {string}
		 */
		MK_MK: 'mk-MK',
		/**
		 * Represents "Korean (Korea)" locale
		 * @type {string}
		 */
		KO_KR: 'ko-KR',
		/**
		 * Represents "German (Switzerland)" locale
		 * @type {string}
		 */
		DE_CH: 'de-CH',
		/**
		 * Represents "Dutch (Netherlands)" locale
		 * @type {string}
		 */
		NL_NL: 'nl-NL',
		/**
		 * Represents "Chinese (China)" locale
		 * @type {string}
		 */
		ZH_CN: 'zh-CN',
		/**
		 * Represents "Swedish (Sweden)" locale
		 * @type {string}
		 */
		SV_SE: 'sv-SE',
		/**
		 * Represents "Italian (Italy)" locale
		 * @type {string}
		 */
		IT_IT: 'it-IT',
		/**
		 * Represents "Norwegian (Norway)" locale
		 * @type {string}
		 */
		NO_NO: 'no-NO',
		/**
		 * Represents "Turkish (Turkey)" locale
		 * @type {string}
		 */
		TR_TR: 'tr-TR',
		/**
		 * Represents "French (France)" locale
		 * @type {string}
		 */
		FR_FR: 'fr-FR',
		/**
		 * Represents "Romanian (Romania)" locale
		 * @type {string}
		 */
		RO_RO: 'ro-RO',
		/**
		 * Represents "Hebrew (Israel)" locale
		 * @type {string}
		 */
		IW_IL: 'iw-IL',
	};

Object.freeze(OCRSupportedLocale);
Object.freeze(OCRSupportedType);
/**
 * Parameters for converting PDF to a searchable PDF using {@link OCROperation}.
 */
class OCROptions {
	/**
	 * @hideconstructor
	 * @param builder
	 */
	constructor(builder) {
		this.ocrType = builder.ocrType;
		this.ocrLang = builder.ocrLang;
		Object.preventExtensions(this);
	}

	static get OCRSupportedType() {
		return OCRSupportedType;
	}

	static get OCRSupportedLocale() {
		return OCRSupportedLocale;
	}


	/**
	 * Returns a builder for {@link OCROptions}.
	 * @memberOf OCROptions
	 * @function
	 * @returns {OCROptionsBuilder} A Builder instance for initializing {@link OCROptions}.
	 */
	static get Builder() {
		/**
		 *
		 * Builds a {@link OCROptions} instance.
		 */
		class OCROptionsBuilder {
			/**
			 * @hideconstructor
			 */
			constructor() {
			}

			/**
			 * Sets OCR type, specified by {@link OCROptions.OCRSupportedType}
			 * @param {!OCROptions.OCRSupportedType} ocrType - see {@link OCROptions.OCRSupportedType}. Default value is
			 * {@link OCROptions.OCRSupportedType.SEARCHABLE_IMAGE}
			 * @returns {OCROptionsBuilder} This Builder instance to add any additional parameters.
			 */
			withOcrType(ocrType) {
				if(!ocrType) throw new Error("ocrType cannot be null");
				this.ocrType = ocrType;
				return this;
			}
			/**
			 * Sets input language to be used for OCR, specified by {@link OCROptions.OCRSupportedLocale}.
			 * @param {!OCROptions.OCRSupportedLocale} ocrLang - see {@link OCROptions.OCRSupportedLocale}. Default
			 * value is {@link OCROptions.OCRSupportedLocale.EN_US}
			 * @returns {OCROptionsBuilder} This Builder instance to add any additional parameters.
			 */
			withOcrLang(ocrLang) {
				if(!ocrLang)  throw new Error("ocrLang cannot be null");
				this.ocrLang = ocrLang;
				return this;
			}
			/**
			 * Returns a new {@link OCROptions} instance built from the current state of this builder.
			 * @returns {OCROptions} A new OCROptions instance.
			 */
			build() {
				let ocrOptions =  new OCROptions(this);
				Object.freeze(ocrOptions);
				return ocrOptions;
			}
		}

		return OCROptionsBuilder;
	}

	validate() {
		const validator = new Schema({
										 'ocrType': {
											 type: String,
											 required: false,
											 enum:Object.values(OCRSupportedType),
											 message: {
												 type: 'ocrType must be a string',
												 require: 'ocrType cannot be null'
											 }
										 },
										 'ocrLang': {
											 type: String,
											 required: false,
											 enum:Object.values(OCRSupportedLocale),
											 message: {
												 type: 'ocrLang must be a string',
												 require: 'ocrLang cannot be null'
											 }
										 }

									 });
		return validator.validate(this);
	}
}


module.exports = OCROptions;
