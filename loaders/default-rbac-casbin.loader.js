const casbin = require("casbin");
const path = require("path");

module.exports = async () => {
  const enforcer = await casbin.newEnforcer(
    path.join(__dirname, "../configs/rbac_model.conf"),
    path.join(__dirname, "../configs/rbac_save.csv")
  );

  await enforcer.addRoleForUser("user1", "student");

  await enforcer.addPermissionForUser("student", "/chapter", "GET");
  await enforcer.addPermissionForUser("student", "/course", "GET");

  await enforcer.addRoleForUser("user2", "teacher");
  await enforcer.addRoleForUser("teacher", "student");
  await enforcer.addPermissionForUser("teacher", "/chapter", "POST");
  await enforcer.addPermissionForUser("teacher", "/course", "POST");

  await enforcer.addRoleForUser("user3", "admin");
  await enforcer.addRoleForUser("admin", "teacher");
  await enforcer.addPermissionForUser("admin", "/chapter/:chapter", "DELETE");
  await enforcer.addPermissionForUser("admin", "/course/:chapter", "DELETE");

  await enforcer.savePolicy();
};
