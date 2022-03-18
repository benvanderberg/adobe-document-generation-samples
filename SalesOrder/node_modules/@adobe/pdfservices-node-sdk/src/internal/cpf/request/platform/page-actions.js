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
const RotateCommand =  require("./rotate-command"),
	DeleteCommand = require("./delete-command");

class PageActions {
	constructor(){
		this.pageActions = [];
	}
	withRotateAction(pageRanges, angle) {
		this.pageActions.push({
								  "pageAction": {
									  "rotate": {
										  "angle": angle,
										  "pageRanges": pageRanges
									  }
								  }
							  });
		return this;
	}
	withDeleteAction(pageRanges) {
		this.pageActions.push({
								  "pageAction": {
									  "delete": {
										  "pageRanges": pageRanges
									  }
								  }
							  });
		return this;
	}

}

module.exports = PageActions;
