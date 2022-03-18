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

const RANDOM_STRING_LENGTH = 12;
const REQUEST_ID_UNAVAILABLE = "UnknownRequestID";

module.exports = {
	getRandomStringName: () => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
			charactersLength = characters.length;
		for (let i = 0; i < RANDOM_STRING_LENGTH; i += 1) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
	getRequestIdFromLocation(location) {
		if(!location){
			return REQUEST_ID_UNAVAILABLE;
		}
		let locationTokens = location.split("/");
		return locationTokens[locationTokens.length - 1];
	},
	buildMap: (arr1, arr2) => {
		const map = new Map();
		for(let i = 0; i < arr1.length; i++){
			map.set(arr1[i], arr2[i]);
		};
		return map;
	},
};
