const connectionDb = require("../../config/postgresdb");
module.exports = {
  async create(table, dataJson) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const { makeSqlStringInsert } = require("../../core/toassemble");
      const { sanitationStringSql } = require("../../core/functions");
      const queryString =
        `INSERT INTO  ${sanitationStringSql(table)} ` +
        makeSqlStringInsert(dataJson);
      console.log("queryString", queryString);
      const data = await connection
        .query(queryString, Object.values(dataJson))
        .catch((err) => {
          console.error("MODEL AllTablesCrud: Can not create - ", err);
          return {
            status: "error",
            msg: "db",
            error: err,
          };
        });
      connection.end();
      if (data?.rows?.length && data.rows.length > 0)
        return resolve({
          status: "ok",
          msg: "done",
          data: data.rows[0],
        });
      return reject(data);
    });
  },
  async update(table, dataJson, condition) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const { makeSqlStringUpdate } = require("../../core/toassemble");
      const { sanitationStringSql } = require("../../core/functions");
      const queryString = `UPDATE  ${sanitationStringSql(
        table
      )} SET ${makeSqlStringUpdate(dataJson, condition)}`;
      console.log("queryString", queryString);
      const data = await connection
        .query(queryString, Object.values(dataJson))
        .catch((err) => {
          console.error("MODEL AllTablesCrud: Can not update - ", err);
          return {
            status: "error",
            msg: "db",
            error: err,
          };
        });
      connection.end();
      if (data?.command && data?.command == "UPDATE" &&data.rows.length === 0) {
        return reject({
          status: "error",
          msg: "key out range",
          error: {
            code: "rangeUpdate",
          },
        });
      }
      if (data?.rows?.length && data.rows.length > 0)
        return resolve({
          status: "ok",
          msg: "done",
          data: data.rows[0],
        });

      return reject(data);
    });
  },
};
