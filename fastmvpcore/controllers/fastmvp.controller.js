class FastMvpController {
  static async Create(req, res) {
    const {
      create,
      innerJoinLeft,
      innerJoinRight,
    } = require("../services/allfunctions.service");
    const response = await create(req.params.table, req.body).catch((e) => {
      console.error("FastMvp Controller: can't create", e);
      return e;
    });
    if (response?.status && response.status == "ok") {
      return res.json(response).status(200);
    } else if (
      response?.status &&
      response.code &&
      response.status == "error"
    ) {
      if (response.code == "42P01") {
        return res.json(response).status(404);
      } else if (response.code == "23505") {
        return res.json(response).status(400);
      }
    }
    return res.json(response).status(500);
  }
  static async Get(req, res) {
    const { get } = require("../services/allfunctions.service");
    const response = await get(req.params.table, req.body).catch((e) => {
      console.error("FastMvp Controller: can't get", e);
      return e;
    });
    if (response?.status && response.status == "ok") {
      return res.json(response).status(200);
    } else if (
      response?.status &&
      response.code &&
      response.status == "error"
    ) {
      if (response.code == "42P01") {
        return res.json(response).status(404);
      } else if (response.code == "23505") {
        return res.json(response).status(400);
      }
    }
    return res.json(response).status(500);
  }
  static async Update(req, res) {
    const { update } = require("../services/allfunctions.service");
    let condition = req.params.key
      ? {
          key: req.params.key,
          value: req.params.value,
        }
      : null;
    const response = await update(req.params.table, req.body, condition).catch(
      (e) => {
        console.error("FastMvp Controller: can't update", e);
        return e;
      }
    );
    if (response?.status && response.status == "ok") {
      return res.json(response).status(200);
    }
    return res.json(response).status(500);
  }
  static async Delete(req, res) {
    const { deletePg } = require("../services/allfunctions.service");
    let condition = req.params.key
      ? {
          key: req.params.key,
          value: req.params.value,
        }
      : null;
    console.log("condition", condition);
    const response = await deletePg(req.params.table, condition).catch((e) => {
      console.error("FastMvp Controller: can't delete", e);
      return e;
    });
    if (response?.status && response.status == "ok") {
      return res.json(response).status(200);
    }
    return res.json(response).status(500);
  }
  static async InnerJoin(req, res) {
    const { innerJoin } = require("../services/allfunctions.service");
    if (req.params.table1 && req.params.table2) {
      const tables = {
        table1: req.params.table1,
        table2: req.params.table2,
      };
      const response = await innerJoin(tables, req.body).catch((e) => {
        console.error("FastMvp Controller: can't execute InnerJoin", e);
        return e;
      });
      if (response?.status && response.status == "ok") {
        return res.json(response).status(200);
      }
      return res.json(response).status(500);
    }
    return res
      .json({
        status: "error",
        msg: "Wrong Url",
        data: null,
      })
      .status(404);
  }
  static async InnerJoinLeft(req, res) {
    const { innerJoinLeft } = require("../services/allfunctions.service");
    if (req.params.table1 && req.params.table2) {
      const tables = {
        table1: req.params.table1,
        table2: req.params.table2,
      };
      const response = await innerJoinLeft(tables, req.body).catch((e) => {
        console.error("FastMvp Controller: can't execute InnerJoin", e);
        return e;
      });
      if (response?.status && response.status == "ok") {
        return res.json(response).status(200);
      }
      return res.json(response).status(500);
    }
    return res
      .json({
        status: "error",
        msg: "Wrong Url",
        data: null,
      })
      .status(404);
  }
  static async InnerJoinRight(req, res) {
    const { innerJoinRight } = require("../services/allfunctions.service");
    if (req.params.table1 && req.params.table2) {
      const tables = {
        table1: req.params.table1,
        table2: req.params.table2,
      };
      const response = await innerJoinRight(tables, req.body).catch((e) => {
        console.error("FastMvp Controller: can't execute InnerJoin", e);
        return e;
      });
      if (response?.status && response.status == "ok") {
        return res.json(response).status(200);
      }
      return res.json(response).status(500);
    }
    return res
      .json({
        status: "error",
        msg: "Wrong Url",
        data: null,
      })
      .status(404);
  }
}
module.exports = FastMvpController;