/*
 * Asset API:
 *   asset = object
 *   asset.uri:                 the URI for the path
 *   asset.type:     (optional) asset type — default: script
 *   asset.appendTo: (optional) can by `body` or `head` — default: `body`
 *   asset.prefix:   (optional) a prefix to use with localStorage
 *   asset.callback: (optional) triggered after an asset is successfully injected
 *
 * Example usage:

    // Assume that the calling script is in the same directory.
    import {requireAssets} from './assets.js';

    requireAssets([
      {
        uri: '/scripts/test.js',
      },
      {
        uri: '/styles/test.css',
        type: 'style', // Defaults to 'script'
        appendTo: 'head',
        prefix: 'cached-js_', // optional localStorage prefix
      }
    ]);
 */

/**
 * Creates a prefixed identifier for the asset.
 * @param  {object}  asset object with asset info
 * @return {string}       the generated asset key
 */
const generateAssetKey = asset => {

  // Use a prefix to avoid collisions in localStorage.
  const assetPrefix = asset.prefix || 'jl-cached-asset_';
  return assetPrefix + asset.uri;
};

/**
 * Stores an asset object as JSON in localStorage
 * @param  {Object} asset asset information
 * @return {Void}
 */
const storeAssetInCache = asset => {
  const key = generateAssetKey(asset);
  localStorage.setItem(key, JSON.stringify(asset));
};

/**
 * Loads and asset as JSON from localStorage
 * @param  {Object} asset asset information
 * @return {Mixed}        asset object or `false`
 */
const loadAssetFromCache = asset => {
  const key = generateAssetKey(asset);
  return JSON.parse(localStorage.getItem(key)) || false;
};

/**
 * Creates an element and injects the contents of the asset into the DOM.
 * @param  {Enum}     options.type     `style` or `script`
 * @param  {Enum}     options.appendTo `head` or `body`
 * @param  {Mixed}    options.content  File contents for the asset or `false`
 * @param  {Function} options.callback Callback for successful asset injection
 * @param  {Object}   options.         The asset information object
 * @return {Boolean}                   `true` on success, `false` on failure
 */
const injectAsset = ({
  type = 'script',
  appendTo = 'body',
  content = false,
  callback = () => {},
}) => {

  // If there's no content for the asset, don't add an element.
  if (!content) {
    return false;
  }

  // Create the specified element type and append to the DOM.
  const element = document.createElement(type);
  element.innerHTML = content;

  if (appendTo === 'body' && !document.body) {

    /*
     * Since this is directly-injected, it executes _fast_.
     * This makes sure we don’t get `undefined` errors.
     */
    document.addEventListener('DOMContentLoaded', event => {
      document[appendTo].appendChild(element);
      callback();
    });
  } else {
    document[appendTo].appendChild(element);
    callback();
  }

  return true;
};

/**
 * Loads an asset's content via AJAX.
 * @param  {Object} asset asset information
 * @return {Void}
 */
const loadAssetFromURI = asset => {
  const client = new XMLHttpRequest();

  // Set up error and success handlers for the AJAX request.
  const onError = event => { console.error(event.target.statusText); };

  const onSuccess = event => {
    if (event.target.status >= 200 && event.target.status < 300) {
      const loadedAsset = asset;
      loadedAsset.content = event.target.response;
      injectAsset(loadedAsset);
      storeAssetInCache(loadedAsset);
    } else {
      onError(event);
    }
  };

  // Attach the handlers to the appropriate events.
  client.addEventListener('load', onSuccess);
  client.addEventListener('error', onError);

  // Trigger the actual AJAX request.
  client.open('GET', asset.uri);
  client.send();
};

/**
 * Injects assets into the DOM from localStorage or via URI.
 *
 * If an asset is not already in localStorage, the asset
 * will be stored for faster access on subsequent page loads.
 *
 * @param  {Array}  assetArray array of objects containing asset info
 * @return {Void}
 */
const requireAssets = (assetArray = []) => {
  // Set up a loop to go through each required asset.
  assetArray.forEach(asset => {
    const cached = loadAssetFromCache(asset);

    // If the asset was previously cached, we only need to insert it.
    if (cached) {
      cached.callback = asset.callback;
      injectAsset(cached);
    } else {

      // Assets that _aren’t_ cached are loaded via AJAX once the page loads.
      window.addEventListener('load', loadAssetFromURI.bind(null, asset));
    }
  });
};

export default requireAssets;
