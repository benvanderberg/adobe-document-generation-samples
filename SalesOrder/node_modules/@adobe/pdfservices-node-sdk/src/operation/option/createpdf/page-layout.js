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

const DEFAULT_PAGE_HEIGHT = 11,
	DEFAULT_PAGE_WIDTH = 8.5;

/**
 * Class for specifying the layout of a page.
 */
class PageLayout {
	/**
	 * Constructor to initialize a default page layout. The default layout sets
	 * the height as 11 inches and width as 8.5 inches.
	 */
	constructor() {
		this.pageHeight = DEFAULT_PAGE_HEIGHT;
		this.pageWidth = DEFAULT_PAGE_WIDTH;
	}

	/**
	 * Sets a custom page size.<br>
	 * Page size and orientation can also be set using paged media CSS which overrides the SDK Page Layout settings.
	 * @param {!Number} pageWidth - Width of the page in inches
	 * @param {!Number} pageHeight - Height of the page in inches
	 */
	setPageSize(pageWidth, pageHeight) {
		this.pageWidth = pageWidth;
		this.pageHeight = pageHeight;
	}
}

module.exports = PageLayout;
