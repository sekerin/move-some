import ModelCollection from './ModelCollection';

/**
 * Collection models for Html and pagination
 */
class HtmlPaginationModelCollection extends ModelCollection {

  /**
   * Initialization collection
   * @return {HtmlPaginationModelCollection}
   */
  async init() {
    return this;
  }

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
   * get data provider and make
   * @override
   * @param dataProvider DataProvider
   * @return {Promise.<HtmlPaginationModelCollection>}
   */
  async makeFromDataProvider(dataProvider) {
    for (let element of await dataProvider.getCollectionByQuery(this.config.rules.element.query)) {
      let elementConfig = this.config.rules.element.config;
      elementConfig.dataProvider.config.data = element.innerHTML;
      let elementModel = await new this.config.rules.element.class(elementConfig).init();
      await this.addItem(await elementModel.make());
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
