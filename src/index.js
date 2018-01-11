import Moving from './Moving';
import Algorithm from './Algorithms/Algorithm';
import DataProvider from './DataProviders/DataProvider';
import HtmlDataProvider from './DataProviders/HtmlDataProvider';
import Model from './Models/Model';
import ModelCollection from './Models/ModelCollection';
import HtmlModel from './Models/HtmlModel';
import HtmlPaginationModelCollection from './Models/HtmlPaginationModelCollection';

const movingSites = {
  Moving,
  Algorithm,
  DataProvider,
  HtmlDataProvider,
  Model,
  ModelCollection,
  HtmlModel,
  HtmlPaginationModelCollection
};

module.exports = movingSites;
