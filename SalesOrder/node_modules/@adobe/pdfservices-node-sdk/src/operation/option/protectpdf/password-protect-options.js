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
 * Supported encryption algorithms for {@link ProtectPDFOperation}
 * @enum
 * @memberOf PasswordProtectOptions
 * @readonly
 */
const EncryptionAlgorithm = {
		/**
		 * Represents AES-128 encryption algorithm.
		 * @type {string}
		 */
		AES_128: 'AES_128',
		/**
		 * Represents AES-256 encryption algorithm.
		 * @type {string}
		 */
		AES_256: 'AES_256'
},
	/**
	 * Supported types of content to encrypt for {@link ProtectPDFOperation}
	 * @enum
	 * @memberOf PasswordProtectOptions
	 * @readonly
	 */
	ContentEncryption = {
		/**
		 * Encrypts all the content of the PDF file.
		 * @type {string}
		 */
		ALL_CONTENT: 'ALL_CONTENT',

		/**
		 * Encrypts all the content except the metadata of the PDF file.
		 * @type {string}
		 */
		ALL_CONTENT_EXCEPT_METADATA:'ALL_CONTENT_EXCEPT_METADATA'
	},
	/**
	 * Supported document permission types for {@link ProtectPDFOperation}
	 * @enum
	 * @memberOf PasswordProtectOptions
	 * @readonly
	 */
	Permission = {

		/**
		 * Enables low quality printing of the PDF document.
		 * @type {string}
		 */
		PRINT_LOW_QUALITY: 'PRINT_LOW_QUALITY',

		/**
		 * Enables high quality printing of the PDF document.
		 * @type {string}
		 */
		PRINT_HIGH_QUALITY: 'PRINT_HIGH_QUALITY',

		/**
		 * Enables all the editing permissions in the PDF document except commenting and page extraction.
		 * @type {string}
		 */
		EDIT_CONTENT: 'EDIT_CONTENT',

		/**
		 * Enables insertion, deletion and rotation of pages in a PDF document.
		 * @type {string}
		 */
		EDIT_DOCUMENT_ASSEMBLY: 'EDIT_DOCUMENT_ASSEMBLY',

		/**
		 * Enables additions of comments, digital signatures and filling in of forms in a PDF document.
		 * @type {string}
		 */
		EDIT_ANNOTATIONS: 'EDIT_ANNOTATIONS',

		/**
		 * Enables filling in of forms, digital signature and creation of template pages in a PDF document.
		 * @type {string}
		 */
		EDIT_FILL_AND_SIGN_FORM_FIELDS: 'EDIT_FILL_AND_SIGN_FORM_FIELDS',

		/**
		 * Enables copying of content from the PDF document.
		 * @type {string}
		 */
		COPY_CONTENT: 'COPY_CONTENT'
}
Object.freeze(EncryptionAlgorithm);
Object.freeze(ContentEncryption);
Object.freeze(Permission);

/**
 * Parameters for securing PDF file with a password using {@link ProtectPDFOperation}.
 */
class PasswordProtectOptions {
	/**
	 * @hideconstructor
	 * @param builder
	 */
	constructor(builder) {
		this.userPassword = builder.userPassword;
		this.ownerPassword = builder.ownerPassword;
		this.encryptionAlgorithm = builder.encryptionAlgorithm;
		this.contentEncryption = builder.contentEncryption;
		this.permissions = builder.permissions;
		Object.preventExtensions(this);
	}

	static get EncryptionAlgorithm() {
		return EncryptionAlgorithm;
	}

	static get ContentEncryption(){
		return ContentEncryption;
	}

	static get Permission(){
		return Permission;
	}

	/**
	 * Returns a builder for {@link PasswordProtectOptions}.
	 * @memberOf PasswordProtectOptions
	 * @function
	 * @returns {PasswordProtectOptionsBuilder} A Builder instance for initializing {@link PasswordProtectOptions}.
	 */
	static get Builder() {
		/**
		 *
		 * Builds a {@link PasswordProtectOptions} instance.
		 */
		class PasswordProtectOptionsBuilder {
			/**
			 * @hideconstructor
			 */
			constructor() {
			}

			/**
			 * Sets the intended user password required for opening the encrypted PDF file. Allowed maximum length for the user
			 * password is 128 bytes.
			 *
			 * @param {!string} userPassword - The user password.
			 * @returns {PasswordProtectOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			setUserPassword(userPassword) {
				if(!userPassword) throw new Error("userPassword cannot be null");
				this.userPassword = userPassword;
				return this;
			}

			/**
			 * Sets the intended owner password required to control access permissions in the encrypted PDF file. This
			 * password can also be used to open/view the encrypted PDF file. Allowed maximum length for the owner password is 128
			 * bytes.
			 *
			 * @param {!string} ownerPassword - The owner password.
			 * @returns {PasswordProtectOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			setOwnerPassword(ownerPassword) {
				if(!ownerPassword) throw new Error("ownerPassword cannot be null");
				this.ownerPassword = ownerPassword;
				return this;
			}

			/**
			 * Sets the intended encryption algorithm required for encrypting the PDF file. For AES-128 encryption, the password
			 * supports LATIN-I characters only. For AES-256 encryption, passwords supports Unicode character set.
			 *
			 * @param {!PasswordProtectOptions.EncryptionAlgorithm} encryptionAlgorithm - The encryption algorithm.
			 * @returns {PasswordProtectOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			setEncryptionAlgorithm(encryptionAlgorithm) {
				this.encryptionAlgorithm  = encryptionAlgorithm;
				return this;
			}

			/**
			 * Sets the intended type of content to encrypt in the PDF file.
			 *
			 * @param {!PasswordProtectOptions.ContentEncryption} contentEncryption - The type of content to encrypt.
			 * @returns {PasswordProtectOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			setContentEncryption( contentEncryption) {
				if(!contentEncryption) throw new Error("contentEncryption cannot be null");
				this.contentEncryption = contentEncryption;
				return this;
			}

			/**
			 * Sets the intended permissions for the encrypted PDF file. This includes permissions to allow printing, editing
			 * and content copying in the PDF document. Permissions can only be used in case the owner password is set.
			 *
			 * @param {!Permissions} permissions - The permissions.
			 * @returns {PasswordProtectOptionsBuilder} This Builder instance to add any additional parameters.
			 */
			setPermissions( permissions) {
				if(!permissions || Object.keys(permissions).length === 0) throw new Error("permissions cannot be null");
				this.permissions = Array.from(permissions.getValues());
				return this;
			}

			/**
			 * Returns a new {@link PasswordProtectOptions} instance built from the current state of this builder.
			 * @returns {PasswordProtectOptions} A new ProtectPDFOptions instance.
			 */
			build() {
				let protectPDFOptions =  new PasswordProtectOptions(this);
				Object.freeze(protectPDFOptions);
				return protectPDFOptions;
			}
		}

		return PasswordProtectOptionsBuilder;
	}

	validate() {
		const validator = new Schema({
			'userPassword': {
				type: String,
				required: false,
				message: {
					type: 'User Password must be a string',
					required: 'User Password cannot be null or empty'
				}
			},
			'ownerPassword': {
				type: String,
				required: false,
				message: {
					type: 'Owner Password must be a string',
					required: 'Owner Password cannot be null or empty'
				}
			},
			'encryptionAlgorithm': {
				type: String,
				required: true,
				enum:Object.values(EncryptionAlgorithm),
				message: {
					type: 'Encryption Algorithm must be a string',
					required: 'Encryption Algorithm cannot be null or empty'
				}
			},
			'contentEncryption': {
				type: String,
				required: false,
				enum:Object.values(ContentEncryption),
				message: {
					type: 'Content Encryption must be a string',
					required: 'Content Encryption cannot be null or empty'
				}
			},
			'permissions': {
				type: Array,
				required: false,
				message: {
					type: 'Permissions must be an Array',
					required: 'Permissions cannot be null or empty'
				}
			}
		});
		return validator.validate(this);
	}
}

module.exports = PasswordProtectOptions;
