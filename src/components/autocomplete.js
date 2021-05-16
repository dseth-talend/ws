import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import { hits, searchBox, configure } from 'instantsearch.js/es/widgets';

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';


/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   */
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }
  

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      'KA7ESF7QE5',
      'f1d2d5c65025c18786eb59f7552e3b0c'
    );

    this._searchInstance = instantsearch({
      indexName: 'williams_spencer',
      searchClient: this._searchClient,
    });
  }

  /** Create a custom autocomplete *****/

  _myAutocomplete() {
    this._autocomplete  = instantSearch.connectors.connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container, onSelectChange } = widgetParams;

    if (isFirstRendering) {
      container.html('<select id="ais-autocomplete"></select>');

      container.find('select').selectize({
        options: [],
        valueField: 'query',
        labelField: 'query',
        highlight: false,
        onType: refine,
        onBlur() {
          refine(this.getValue());
        },
        onChange(value) {
          refine(value);
          onSelectChange({
            query: value,
          });
        },
        score() {
          return () => 1;
        },
        render: {
          option({ query }) {
            return `
              <div class="option">
                ${query}
              </div>
            `;
          },
        },
      });

      return;
    }

    const [select] = container.find('select');

    select.selectize.clearOptions();
    indices.forEach(({ results }) => {
      results.hits.forEach(hit => select.selectize.addOption(hit));
    });
    select.selectize.refreshOptions(select.selectize.isOpen);
  }
);

  } 

  /******/

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
    /*  instantsearch.widgets
    .index({ indexName: 'instant_search_demo_query_suggestions' })
    .addWidgets([
      autocomplete({
        container: $('#this._autocomplete'),
        onSelectChange({ query }) {
          this._searchInstance.helper.setQuery(query).search();
        },
      }),
    ]),*/
      configure({
        hitsPerPage: 3,
      }),
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }

}


export default Autocomplete;
