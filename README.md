## Demo nho casbin

List cac API de test bao gom:

1. Role Student:

- GET: localhost:3001/chapter
- GET: localhost:3001/course

2. Role teacher:

- POST: localhost:3001/chapter
- POST: localhost:3001/course
- GET: localhost:3001/chapter
- GET: localhost:3001/course

3. Role admin

- POST: localhost:3001/chapter
- POST: localhost:3001/course
- GET: localhost:3001/chapter
- GET: localhost:3001/course
- DELETE: localhost:3001/chapter/:chapter
- DELETE: localhost:3001/course/:course

## Config model

```
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act


[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && ( r.obj == p.obj || keyMatch2(r.obj, p.obj)) && regexMatch(r.act, p.act)
```

## create permission

#### Load model:

```
const enforcer = await casbin.newEnforcer(
    path.join(__dirname, "../configs/rbac_model.conf"),
    path.join(__dirname, "../configs/rbac_save.csv")
);
```

#### Add role for student

```
await enforcer.addRoleForUser("user1", "student");
```

#### Add permission

```
await enforcer.addPermissionForUser("student", "/chapter", "GET");
await enforcer.addPermissionForUser("student", "/course", "GET");
```

#### Add role and permission for Teacher

```
await enforcer.addRoleForUser("user2", "teacher");
await enforcer.addRoleForUser("teacher", "student");
await enforcer.addPermissionForUser("teacher", "/chapter", "POST");
await enforcer.addPermissionForUser("teacher", "/course", "POST");
```

#### Add role and permission for Admin

```
await enforcer.addRoleForUser("user3", "admin");
await enforcer.addRoleForUser("admin", "teacher");
await enforcer.addPermissionForUser("admin", "/chapter/:chapter", "DELETE");
await enforcer.addPermissionForUser("admin", "/course/:chapter", "DELETE");
```

#### Save

```
await enforcer.savePolicy();
```

## Verify permission for route

```
const user = req.headers.authorization || req.headers.Authorization;
const action = req.method;
const ok = await enforcer.enforce(user, req.url, action);
if (ok) next();
else res.status(403);
```
