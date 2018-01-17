import ModelCollection from './ModelCollection';

/**
 * Collection models for Html
 */
class HtmlModelCollection extends ModelCollection {

  /**
   * get data provider and make
   * @override
   * @param dataProvider DataProvider
   * @return {Promise.<HtmlModelCollection>}
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
}

module.exports = HtmlModelCollection;
