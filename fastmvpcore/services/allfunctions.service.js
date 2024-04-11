const AllTablesModel = require("../models/alltablescrud.model");
const JoinsModel = require("../models/joins.model");
const servicesModule = {
  async create(project, table, dataJson) {
    const create = await AllTablesModel.create(project, table, dataJson).catch(
      (e) => {
        console.error("SERVICE AllFunctions: can not create", e);
        return e;
      }
    );
    if (create?.status && create.status == "ok") {
      return {
        status: "ok",
        msg: "Se insertó correctamente",
        data: create.data,
      };
    } else {
      if (create?.error?.code) {
        const { errorControlWithSqlCode } = require("../utils/functions");
        let formatError = errorControlWithSqlCode(create, table);
        if (formatError.conditional) return formatError.payload;
      }
      return {
        status: "error",
        msg: "Error desconocido",
        code: 500,
        data: null,
      };
    }
  },
  async get(project, table, data) {
    const create = await AllTablesModel.get(project, table, data).catch((e) => {
      console.error("SERVICE AllFunctions: can not get", e);
      return e;
    });
    if (create?.status && create.status == "ok") {
      return {
        status: "ok",
        msg: "Datos obtenidos",
        data: create.data,
      };
    } else {
      if (create?.error?.code) {
        const { errorControlWithSqlCode } = require("../utils/functions");
        let formatError = errorControlWithSqlCode(create, table);
        if (formatError.conditional) return formatError.payload;
      }
      return {
        status: "error",
        msg: "Error desconocido",
        code: 500,
        data: null,
      };
    }
  },
  async update(project, table, dataJson, condition) {
    const updateResponse = await AllTablesModel.update(
      project,
      table,
      dataJson,
      condition
    ).catch((e) => {
      console.error("SERVICE AllFunctions: can not update", e);
      return e;
    });
    if (updateResponse?.status && updateResponse.status == "ok") {
      return {
        status: "ok",
        msg: "Se actualizo correctamente",
        data: updateResponse.data,
      };
    } else {
      if (updateResponse?.error?.code) {
        const { errorControlWithSqlCode } = require("../utils/functions");
        let formatError = errorControlWithSqlCode(updateResponse, table);
        if (formatError.conditional) return formatError.payload;
      }
      return {
        status: "error",
        msg: "Error desconocido",
        code: 500,
        data: null,
      };
    }
  },
  async deletePg(project, table, condition) {
    const deleteResponse = await AllTablesModel.delete(project,table,condition).catch((e) => {
      console.error("SERVICE AllFunctions: can not delete", e);
      return e;
    });
    if (deleteResponse?.status && deleteResponse.status == "ok") {
      return {
        status: "ok",
        msg: "Se elimino correctamente",
        data: deleteResponse.data,
      };
    }
    if (deleteResponse?.error?.code) {
      const { errorControlWithSqlCode } = require("../utils/functions");
      let formatError = errorControlWithSqlCode(deleteResponse, table);
      if (formatError.conditional) return formatError.payload;
    }
    return {
      status: "error",
      msg: "Error desconocido",
      code: 500,
      data: null,
    };
  },
  async innerJoin(project, tables, dataJson) {
    const create = await JoinsModel.innerJoin(project, tables, dataJson).catch(
      (e) => {
        console.error("SERVICE AllFunctions: can not execute innerJoin", e);
        return e;
      }
    );
    if (create?.status && create.status == "ok") {
      return {
        status: "ok",
        msg: "Datos obtenidos",
        data: create.data,
      };
    } else {
      if (create?.error?.code) {
        const { errorControlWithSqlCode } = require("../utils/functions");
        let formatError = errorControlWithSqlCode(create, tables.table1);
        if (formatError.conditional) return formatError.payload;
      }
      return {
        status: "error",
        msg: "Error desconocido",
        code: 500,
        data: null,
      };
    }
  },
  async innerJoinLeft(project, tables, dataJson) {
    const create = await JoinsModel.innerJoinValueLeft(project, tables, dataJson).catch(
      (e) => {
        console.error("SERVICE AllFunctions: can not execute innerJoin", e);
        return e;
      }
    );
    if (create?.status && create.status == "ok") {
      return {
        status: "ok",
        msg: "Datos obtenidos",
        data: create.data,
      };
    } else {
      if (create?.error?.code) {
        const { errorControlWithSqlCode } = require("../utils/functions");
        let formatError = errorControlWithSqlCode(create, tables.table1);
        if (formatError.conditional) return formatError.payload;
      }
      return {
        status: "error",
        msg: "Error desconocido",
        code: 500,
        data: null,
      };
    }
  },
  async innerJoinRight(project, tables, dataJson) {
    const create = await JoinsModel.innerJoinValueRight(project, tables, dataJson).catch(
      (e) => {
        console.error("SERVICE AllFunctions: can not execute innerJoin", e);
        return e;
      }
    );
    if (create?.status && create.status == "ok") {
      return {
        status: "ok",
        msg: "Datos obtenidos",
        data: create.data,
      };
    } else {
      if (create?.error?.code) {
        const { errorControlWithSqlCode } = require("../utils/functions");
        let formatError = errorControlWithSqlCode(create, tables.table1);
        if (formatError.conditional) return formatError.payload;
      }
      return {
        status: "error",
        msg: "Error desconocido",
        code: 500,
        data: null,
      };
    }
  },
  async orderedList(project,data){
    console.log("creat",project)

    if(data?.orderedList && Array.isArray(data.orderedList)){
      var response = new Array();
      for(let singleQuery of data.orderedList){
        if(!singleQuery?.type) {
          response.push({
            status: "error",
            msg: "El parametro Type no fue enviado",
            data: null,
          });
          continue;
        }
        if(!singleQuery?.body){
          response.push({
            status: "error",
            msg: "El parametro body no fue enviado",
            data: null,
          });
          continue;
        } 
        if(singleQuery.type=="create"){
          let createResponse = await servicesModule.create(project,singleQuery.in,singleQuery.body).catch(
            (e) => {
              console.error("SERVICE AllFunctions: can not create on OrderedList", e);
              return e;
            }
          );
          let dataJson = {};
          dataJson[singleQuery.in]=createResponse
          response.push(dataJson);
          continue;
        }else if(singleQuery.type=="get"){
          let getResponse = await servicesModule.get(project,singleQuery.in,singleQuery.body).catch(
            (e) => {
              console.error("SERVICE AllFunctions: can not Get on OrderedList", e);
              return e;
            }
          )
          let dataJson = {};
          dataJson[singleQuery.in]=getResponse
          response.push(dataJson);
          continue;
        }else if(singleQuery.type=="delete"){
          let deleteResponse = await servicesModule.deletePg(project,singleQuery.in,singleQuery.body).catch(
            (e) => {
              console.error("SERVICE AllFunctions: can not Delete on OrderedList", e);
              return e;
            }
          )
          let dataJson = {};
          dataJson[singleQuery.in]=deleteResponse
          response.push(dataJson);
          continue;
        }
        return response.push({
          status: "error",
          msg: "Error desconocido",
          code: 500,
          data: null,
        });
      };
      return {
        status: "ok",
        msg: "Consultas ordenadas",
        data: response,
      }
    }
    return {
      status: "error",
      msg: "Error desconocido",
      code: 500,
      data: null,
    };
  }
};

module.exports = servicesModule;