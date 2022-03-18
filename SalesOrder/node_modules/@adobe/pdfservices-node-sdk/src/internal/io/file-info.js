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

const inputTypes = require('./input-types'),
	moveFile = require('move-file/index'),
	extensionMediaTypeMapping = require('../extension-mediatype-mapping'),
	path = require('path'),
	logger = require('./../logger'),
	fs = require('fs');


const deriveMediaTypeFromFilePath = (sourceObject, fileSource, inputType) => {
		// Derive media type from local file path when it is not explicitly provided.
		if (fileSource && inputType === inputTypes.localFile) {
			const fileExtension = path.extname(fileSource);
			Object.defineProperty(
				sourceObject, '_extension',
				{
					value: fileExtension.replace('.', ''),
					writable: false
				}
			);

			if (extensionMediaTypeMapping[sourceObject._extension]) {
				Object.defineProperty(
					sourceObject, '_mediaType',
					{
						value: extensionMediaTypeMapping[sourceObject._extension].mediaType,
						writable: false
					}
				);
			}
		}
	},

	getActualTargetFilePath = (destinationPath, extension) => {
		const fileBaseDir = path.dirname(destinationPath),
			fileBaseName = path.basename(destinationPath, path.extname(destinationPath));
		return `${fileBaseDir}${path.sep}${fileBaseName}.${extension}`;
	},

	/* eslint default-case: 0*/
	/**
     * Utility function to check if any of the input is empty
     * @param fileSource
     * @param mediaType
     * @param inputType
     */
	validate = (fileSource, mediaType, inputType) => {
		switch (inputType) {
			case inputTypes.stream:
				if (!fileSource) {
					throw new Error('Readable stream must not be empty');
				}
				if (!mediaType) {
					throw new Error('Media type must be provided for a stream');
				}
				if (typeof mediaType !== 'string') {
					throw new Error('Media type must be a string');
				}
				break;
			case inputTypes.localFile:
				if (!fileSource) {
					throw new Error('Local file path must not be empty');
				}
				if (mediaType && typeof mediaType !== 'string') {
					throw new Error('Media type must be a string');
				}
				break;
		}
	},

	validateInputUrl = (inputUrl) => {
		if(inputUrl) {
			if(typeof(inputUrl)==="string") {
				let res = inputUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
				if (!res) {
					throw Error(`Invalid URL ${inputUrl} provided for the operation.`);
				}
			}else {
				throw Error(`Invalid URL ${inputUrl} provided for the operation. URL cannot be ${typeof(inputUrl)}`);
			}
		} else {
			throw Error(`Input URL can not be null or empty.`);
		}
	};

class FileInfo {
	constructor(fileSource, mediaType, inputType, inputUrl, isOperationResult = false) {
		validate(fileSource, mediaType, inputType);
		if (fileSource === null) {
			validateInputUrl(inputUrl);
		}
		Object.defineProperty(this, '_fileSource', {
			value: fileSource,
			writable: false
		});
		Object.defineProperty(this, '_inputType', {
			value: inputType,
			writable: false
		});
		this._mediaType = mediaType;
		Object.defineProperty(this, '_inputUrl', {
			value: inputUrl,
			writable: false
		});
		this._isOperationResult = isOperationResult;
		if (mediaType) {
			// Prevent reassigning of fields
			Object.defineProperty(this, '_mediaType', {
				value: mediaType,
				writable: false
			});
			Object.defineProperty(this, '_extension', {
				value: extensionMediaTypeMapping.getExtensionFromMediaType(mediaType),
				writable: false
			});
		} else {
			deriveMediaTypeFromFilePath(this, fileSource, inputType);
		}
	}

	/**
     *
     * Creates and returns an input stream for this file.
     * @returns {MultiStream|null|*}
     */
	get asStream() {
		switch (this._inputType) {
			case inputTypes.localFile:
				return fs.createReadStream(this._fileSource);
			case inputTypes.stream:
				return this._fileSource;
			default:
				// We don't support url streams currently
				return null;
		}
	}

	get extension() {
		return this._extension;
	}

	get fileSource() {
		return this._fileSource;
	}

	get mediaType() {
		return this._mediaType;
	}

	get inputType() {
		return this._inputType;
	}

	get inputUrl(){
		return this._inputUrl;
	}

	get isOperationResult() {
		return this._isOperationResult;
	}

	set isOperationResult(isOperationResult) {
		this._isOperationResult = isOperationResult;
	}

	saveAsFile(destinationPath) {
		if (!this._isOperationResult) {
			throw new Error('saveAsFile can only be called on operation result instances');
		}
		if (destinationPath) {
			const actualFilePath = getActualTargetFilePath(destinationPath, this._extension);
			logger.info(`Moving the file from temporary location ${this._fileSource} to ${actualFilePath}.`);
			return moveFile(this._fileSource, actualFilePath, { overwrite: false })
				.then(() => {
					this._isOperationResult = false;
				});
		}
		throw new Error('No destination path provided for saving file');
	}

	writeToStream(writableStream) {
		if (!this._isOperationResult) {
			throw new Error('writeToStream can only be called on operation result instances');
		}
		if (writableStream) {
			logger.info(`Writing the file from temporary location ${this._fileSource} to writable stream.`);
			const stream = fs.createReadStream(this._fileSource);
			stream.on('end', () => {
				fs.unlink(this._fileSource, err => {
					if (err) {
						throw err;
					}
				});
				this._isOperationResult = false;
			});
			stream.pipe(writableStream);
		} else {
			throw new Error('No valid writable stream is provided');
		}
	}
}

module.exports = FileInfo;
