const connectionDb = require("../../config/postgresdb");
module.exports = {
  async innerJoin(tables, dataJson) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const { makeSqlStringSelect } = require("../utils/toassemble");
      const { sanitationStringSql } = require("../utils/functions");
      const table1 = sanitationStringSql(tables.table1);
      const table2 = sanitationStringSql(tables.table2);
      let queryString = `SELECT ${makeSqlStringSelect(
        dataJson
      )} FROM ${table1} INNER JOIN ${table2} ON ${table1}.${sanitationStringSql(
        dataJson.keys.left
      )} = ${table2}.${sanitationStringSql(dataJson.keys.right)}`;
      console.log("queryString", queryString);
      let data;
      if (dataJson.filters) {
        data = await connection
          .query(queryString, Object.values(dataJson.filters))
          .catch((err) => {
            console.error(
              `MODEL Joins: Can not execute InnerJoin ON ${table1} and ${table2} `,
              err
            );
            return {
              status: "error",
              msg: "db",
              error: err,
            };
          });
      } else {
        data = await connection.query(queryString).catch((err) => {
          console.error(
            `MODEL Joins: Can not execute InnerJoin ON ${table1} and ${table2} `,
            err
          );
          return {
            status: "error",
            msg: "db",
            error: err,
          };
        });
      }

      connection.end();
      if (data?.rows?.length && data.rows.length > 0)
        return resolve({
          status: "ok",
          msg: "done",
          data: data.rows,
        });
      return reject(data);
    });
  },
  async innerJoinValueRight(tables, dataJson) {
    console.log("datajson",dataJson);
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const { makeSqlStringSelect } = require("../utils/toassemble");
      const { sanitationStringSql } = require("../utils/functions");
      const table1 = sanitationStringSql(tables.table1);
      const table2 = sanitationStringSql(tables.table2);
      let queryString = `SELECT ${makeSqlStringSelect(
        dataJson
      )} FROM ${table1} INNER JOIN ${table2} ON ${table1}.${sanitationStringSql(
        dataJson.keys.left
      )} = ${table2}.${sanitationStringSql(
        dataJson.keys.right
      )} WHERE ${table1}.${sanitationStringSql(
        Object.keys(dataJson)[0]
      )}=${sanitationStringSql(Object.values(dataJson)[0])}`;
      console.log("queryString", queryString);
      let data;
      if (dataJson.filters) {
        data = await connection
          .query(queryString, Object.values(dataJson.filters))
          .catch((err) => {
            console.error(
              `MODEL Joins: Can not execute InnerJoin ON ${table1} and ${table2} `,
              err
            );
            return {
              status: "error",
              msg: "db",
              error: err,
            };
          });
      } else {
        data = await connection.query(queryString).catch((err) => {
          console.error(
            `MODEL Joins: Can not execute InnerJoin ON ${table1} and ${table2} `,
            err
          );
          return {
            status: "error",
            msg: "db",
            error: err,
          };
        });
      }

      connection.end();
      if (data?.rows?.length && data.rows.length > 0)
        return resolve({
          status: "ok",
          msg: "done",
          data: data.rows,
        });
      return reject(data);
    });
  },
  async innerJoinValueLeft(tables, dataJson) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const { makeSqlStringSelect } = require("../utils/toassemble");
      const { sanitationStringSql } = require("../utils/functions");
      const table1 = sanitationStringSql(tables.table1);
      const table2 = sanitationStringSql(tables.table2);
      let queryString = `SELECT ${makeSqlStringSelect(
        dataJson
      )} FROM ${table1} INNER JOIN ${table2} ON ${table1}.${sanitationStringSql(
        dataJson.keys.left
      )} = ${table2}.${sanitationStringSql(
        dataJson.keys.right
      )} WHERE ${table2}.${sanitationStringSql(
        dataJson.value.key
      )}=${sanitationStringSql(dataJson.value.value)}`;
      console.log("queryString", queryString);
      let data;
      if (dataJson.filters) {
        data = await connection
          .query(queryString, Object.values(dataJson.filters))
          .catch((err) => {
            console.error(
              `MODEL Joins: Can not execute InnerJoin ON ${table1} and ${table2} `,
              err
            );
            return {
              status: "error",
              msg: "db",
              error: err,
            };
          });
      } else {
        data = await connection.query(queryString).catch((err) => {
          console.error(
            `MODEL Joins: Can not execute InnerJoin ON ${table1} and ${table2} `,
            err
          );
          return {
            status: "error",
            msg: "db",
            error: err,
          };
        });
      }

      connection.end();
      if (data?.rows?.length && data.rows.length > 0)
        return resolve({
          status: "ok",
          msg: "done",
          data: data.rows,
        });
      return reject(data);
    });
  },
};