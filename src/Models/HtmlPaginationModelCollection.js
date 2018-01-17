import HtmlModelCollection from './HtmlModelCollection';

/**
 * Collection models for Html and pagination
 */
class HtmlPaginationModelCollection extends HtmlModelCollection {

  /**
   * Make collection
   * @return {HtmlPaginationModelCollection}
   */
  async make() {
    await this.makeFromDataProvider(await this.getDataProvider());
    if (this.config.rules.collection.hasOwnProperty('pagination')) {
      await this.makeRecursivePagination(await this.getDataProvider());
    }
    return this;
  }

  /**
   *
   * @param dataProvider HtmlDataProvider
   * @return {Promise.<void>}
   */
  async makeRecursivePagination(dataProvider) {
    let url = await dataProvider.getElementByQuery(
      this.config.rules.collection.pagination.active
    );

    if (url && url.nextElementSibling) {
      url = url.nextElementSibling.getAttribute('href');
      let dataConf = Object.assign(
        this.config.dataProvider.config,
        { url, data: '' }
      );
      try {
        let dataProvider = await (new this.config.dataProvider.class(dataConf)).init();
        // await Promise.all([this.makeFromDataProvider(dataProvider), this.makeRecursivePagination(dataProvider)]);
        await this.makeFromDataProvider(dataProvider);
        await this.makeRecursivePagination(dataProvider);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

module.exports = HtmlPaginationModelCollection;
