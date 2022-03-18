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


const Schema = require('validate'),
	PermissionsEnum = require('./password-protect-options').Permission;

/**
 * Document Permissions for {@link ProtectPDFOperation}
 */
class Permissions {
	/**
	 * Constructs a new Permissions instance with no permission added.
	 */
	constructor() {
		this._permissionsSet = new Set();
	}

	/**
	 * Creates a new {@link Permissions} instance.
	 *
	 * @return a {@link Permissions} instance
	 */
	 static createNew() {
		return new Permissions();
	 }


	/**
	 * Returns the intended set of document permissions values.
	 *
	 * @return the set of document permissions
	 */
	getValues() {
		return this._permissionsSet;
	}

	/**
	 * Adds a document [Permission]{@link PasswordProtectOptions.Permission} in the permissions set.
	 *
	 * @param {!PasswordProtectOptions.Permission} permission - The permission.
	 */
	addPermission(permission) {
		if(!permission) throw new Error('Permission can not be null');
		this.validate(permission);
		this._permissionsSet.add(permission);
	}

	validate(permission) {
		if(!Object.values(PermissionsEnum).includes(permission))
			throw new Error('Permission must be one of PRINT_LOW_QUALITY, PRINT_HIGH_QUALITY, EDIT_CONTENT, ' +
				'EDIT_DOCUMENT_ASSEMBLY, EDIT_ANNOTATIONS, EDIT_FILL_AND_SIGN_FORM_FIELDS or COPY_CONTENT')
	}
}

Object.freeze(Permissions);
module.exports = Permissions;
