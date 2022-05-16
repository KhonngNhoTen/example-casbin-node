const { Enforcer } = require("casbin");
const casbin = require("casbin");
const path = require("path");

async function Auth(req, res, next) {
  const enforcer = await casbin.newEnforcer(
    path.join(__dirname, "../configs/rbac_model.conf"),
    path.join(__dirname, "../configs/rbac_save.csv")
  );

  const user = req.headers.authorization || req.headers.Authorization;
  const action = req.method;
  const ok = await enforcer.enforce(user, req.url, action);
  if (ok) next();
  else res.status(403);
}
module.exports = Auth;
