'use strict';
var fs = require('fs');
var _ = require('lodash');
var google = require('googleapis');
var csv = require('csv');
var drive = google.drive('v2');
var request = require('request');

/**
 * Download the file from google Drive
 * @param  {String} accessToken Google api valid access token
 * @param  {String} file The file to download
 * @param  {Function} callback
 */
var downloadFile = function(accessToken, file, callback) {
  var options = {
    url: file.exportLinks['text/csv'],
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  };
  request(options, callback);
};

/**
 * Write the translations to the files
 * @param  {Object} trans Translations object
 */
var writeTranslations = function(trans) {
  fs.exists('locales/', function(exists) {
    if (!exists) {
      fs.mkdir('locales');
    }
    fs.writeFileSync('app/locales/en.json', JSON.stringify(trans.en));
    console.log('translations written !');
  });
};

/**
 * Initialize Google jwt authentication
 * @param  {String} Api credentials email
 * @param  {String} Path to the private key file
 * @param  {String} Private key content
 * @param  {Array} Google api Scopes
 * @param  {String} User to impersonate
 */
var jwtClient = new google.auth.JWT(
  '147607745380-aa8988hfccuru84bif0kogau0n091guv@developer.gserviceaccount.com',
  'verusgoogle.pem',
  null,
  ['https://www.googleapis.com/auth/drive.readonly'],
  '<%= emailGoogle %>');

/**
 * Ask google for authorization to connect
 */
jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  /**
   * Get the file from google drive
   * @param  {Object} params Parameters of the request (google api)
   */
  drive.files.get({auth: jwtClient, fileId:'1gL7NOjY6kVGlzlp0RJMhgYdn4ULalUE-hCmSkaBAQWc'}, function(err, file) {

    /**
     * Download the file
     */
    downloadFile(tokens['access_token'], file, function(error, response, body) {

      /**
       * Parse the csv file
       * @param  {String} body Buffer of the file
       * @param  {Function} callback
       */
      csv.parse(body, function(err, data) {

        var trans = {};

        /**
         * Extract the first row of the file to generate the keys array
         * Create the translation object with each translations (en, fr, sp, de ...)
         */
        var keys = _.map(data[0], function(key) {
          var _key = key.toLowerCase();
          if (!trans.hasOwnProperty(_key) && _key !== 'key') {
            trans[_key] = {};
          }
          return _key;
        });

        /**
         * Remove the first row of the file
         */
        data = data.slice(1, data.length);

        /**
         * Create an array containing each row as an object {key1: cell1, key2: cell2 }
         */
        var dataObject = _.map(data, function(row) {
          var obj = {};
          _.map(row, function(cell, index) {
            obj[keys[index]] = cell;
          });
          return obj;
        });
         /**
         * Convert the data to a translations array like this :
         * {en : [ {'KEY': 'VALUE'} ]}
         */
        _.map(dataObject, function(row) {
          var currentKey = row.key;
          trans.en[currentKey] = row.en;
        });

        /**
         * Write the translations
         */
        writeTranslations(trans);
      });
    });
  });
});
