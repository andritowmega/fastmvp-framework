const functionsModule = {
  sanitationStringSql(data) {
    if (data && (typeof data === "string" || typeof data === "number")) {
      if (data && typeof data === "number") {
        data = data.toString();
      }
      const cleanData = data
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
      const cleanDataWithoutSqlInjection = cleanData.replace(/(['";])/g, "");
      return cleanDataWithoutSqlInjection;
    }
    return null;
  },
  errorControlWithSqlCode(errJson,table){
    console.log("errorJson",errJson);
    if (errJson.error.code == "42P01") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "No existe la tabla " + table,
          code: errJson.error.code,
          detail: table,
          data: null,
        },
      };
    } else if (errJson.error.code == "23505") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "Un dato está duplicado",
          code: errJson.error.code,
          detail: errJson.error.detail,
          data: null,
        },
      };
    } else if (errJson.error.code == "23502") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "Un campo es requerido y está sin datos",
          code: errJson.error.code,
          detail: errJson.error.detail,
          data: null,
        },
      };
    } else if (errJson.error.code == "42703") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "Un campo no existe en la tabla o puede que te refieras a otra tabla",
          code: errJson.error.code,
          detail: errJson.error.detail,
          data: errJson.error.hint,
        },
      };
    } else if (errJson.error.code == "outrange") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "No existe el valor para la condicional",
          code: errJson.error.code,
          detail: errJson.error.detail,
          data: null,
        },
      };
    } else if (errJson.error.code == "valuesJson") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "No se han enviado Valores",
          code: errJson.error.code,
          detail: errJson.error.detail,
          data: null,
        },
      };
    } else if (errJson.error.code == "tableundefined") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "No se ha recibido el nombre de la tabla",
          code: errJson.error.code,
          detail: null,
          data: null,
        },
      };
    } else if (errJson.error.code == "keysundefined") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "No se han recibido las keys para la búsqueda",
          code: errJson.error.code,
          detail: null,
          data: null,
        },
      };
    } else if (errJson.error.code == "valueundefined") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "No se ha enviado value para la consulta",
          code: errJson.error.code,
          detail: null,
          data: null,
        },
      };
    } else if (errJson.error.code == "wrongproject") {
      return {
        conditional: true,
        payload: {
          status: "error",
          msg: "El proyecto no existe",
          code: errJson.error.code,
          detail: null,
          data: null,
        },
      };
    } 
      return {
        conditional: false,
        payload: errJson,
      };
  },
  useReplace(singleQuery,responseArray){
      for(var fieldKey in singleQuery.body){
        if(singleQuery.body.hasOwnProperty(fieldKey)){
          var value = singleQuery.body[fieldKey];
          if(typeof value === 'string' && value.includes('USE::')){
            let valueToFind =  singleQuery.body[fieldKey].substring(5);
            singleQuery.body[fieldKey]  = functionsModule.findKeyFromArrayResponse(responseArray,valueToFind);
          }
        }
      }
    return singleQuery;
  },
  findKeyFromArrayResponse(responseArray,valueToFind){
    let arrayToFind = new Array();
    if(!valueToFind.includes('.')) return null;
    arrayToFind = valueToFind.split('.');
    if(arrayToFind.length<2) return null;
    for(let i=0;i<responseArray.length;i++){
      if(arrayToFind[0] in responseArray[i]){
        if(responseArray[i][arrayToFind[0]].status=='error') return null;
        if(arrayToFind[1] in responseArray[i][arrayToFind[0]].data) {
          return responseArray[i][arrayToFind[0]].data[arrayToFind[1]];
        }
      }
    }
    return null;
  },
  isNoEmptyJSON(obj) {
    return typeof obj === 'object' && obj !== null && JSON.stringify(obj) !== '{}';
  }  
};
module.exports = functionsModule;