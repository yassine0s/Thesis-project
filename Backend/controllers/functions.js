//Axios: HTTP requests package
var axios = require('axios');
const dbconfig = require('../configs/database-config');
const mysql = require('mysql2');
const pool = mysql.createPool(dbconfig.connection);


/**
 * Executes a given query with the given values. This is a helper function to avoid the Pyramide of doom with the nested queries.
 * 
 * @param {String} query - The SQL query to be executed. ? marks will be filled with values string respectively. 
 * @param {[String]} values - Values to substitute the ? in the query
 * @returns - {error: String, results: query result}
 */
 const execQuery = async (query , values) => {
  try{
      let results = await (new Promise( (resolve, reject) => {
          pool.query(query, values,  function (error, results) {
              if(error) return reject(error);
              return resolve(results);
          });
      }));
      return {error: null, results: results};
  }catch(error){
      return {error: error, results: null};
  }
};

/**
* 
* Powered by axios, it is a helper function that wrap over axios http requests.
* 
* @param {String} method  - Requesting method.
* @param {String} url  - URL that you want to send request to
* @param {*} data  - Contains the data related to the request
* @param {Object} headers - Contains the Header information 
* @returns - {error: String, results: respond results}
*/
const execReq = async (method, url, data, headers) => {
  try {
      let results = await axios({ 
          method : method,
          url: url, 
          data: data,
          headers: headers
      });
      return {error: null, results: results};
  }catch(error){
      console.log(error);
      return {error: error, results: null};
  }
};







module.exports = {execReq, execQuery}