import DataProvider from './DataProvider';

import fetch from 'node-fetch';

import { JSDOM } from 'jsdom';


/**
 * Data provider for html
 * @extends DataProvider
 */
class HtmlDataProvider extends DataProvider {

  /**
   * Initialize
   * @override
   * @return DataProvider
   */
  async init() {
    try {
      if (this.config.data) {
        this.dataDom = new JSDOM(this.config.data);
      } else if (this.config.url) {
        await fetch(this.config.url, { timeout: 20000, follow: 3 })
          .then(async res => {
            this.dataDom = new JSDOM(await (res.text()));
          })
          .catch(err => { throw err; });
      }
    } catch (e) {
      console.log(e.message);
    }

    return super.init();
  }

  /**
   * Execute query and return value
   * @override
   * @param query
   * @returns {*}
   */
  async getCollectionByQuery(query) {
    return this.dataDom.window.document.querySelectorAll(query);
  }

  /**
   * Get inner html of element
   * @override
   * @param query
   * @return {Promise.<string>|null}
   */
  async getPropertyByQuery(query) {
    const element = await this.getElementByQuery(query);
    return element ? element.innerHTML : null;
  }

  /**
   * Execute query and return value
   * @override
   * @param query
   * @returns {*}
   */
  async getElementByQuery(query) {
    return this.dataDom.window.document.querySelector(query);
  }


  /**
   * Get attribute by query
   * @param query
   * @param attr
   * @return {Promise.<string>|null}
   */
  async getAttributeByQuery(query, attr) {
    const element = await this.getElementByQuery(query);
    return element ? element.getAttribute(attr) : null;
  }
}

module.exports = HtmlDataProvider;
