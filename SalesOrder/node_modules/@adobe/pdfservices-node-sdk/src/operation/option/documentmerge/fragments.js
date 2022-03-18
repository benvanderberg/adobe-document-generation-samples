/**
 * Class for providing support for Fragments. To know more about fragments use-case in document generation and document templates, please see the <a href="http://www.adobe.com/go/dcdocgen_fragments_support">documentation</a>
 */
class Fragments {

	/**
	 * Creates a new {@link Fragments} instance
	 */
	constructor() {
		this.fragmentsList = [];
	}

	/**
	 * To add JsonObject into the fragmentsList.
	 * @param {Object} fragment - JSON Object to be added to fragmentsList
	 */
	addFragment(fragment) {
		this.fragmentsList.push(fragment);
	}

	/**
	 * To add List of JsonObject into the fragmentsList.
	 * @param {Array} fragments - List of JSON object to be added to fragmentsList
	 */
	addFragments(fragments) {
		this.fragmentsList.push.apply(this.fragmentsList, fragments);
	}

	/**
	 * Gets the fragmentsList.
	 * @return the list of fragments
	 */
	getFragmentsList() {
		return this.fragmentsList;
	}
}

module.exports = Fragments;
