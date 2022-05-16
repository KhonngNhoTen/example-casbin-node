const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("INDEX");
});

router.get("/chapter", (req, res) => {
  res.send("GET chapter");
});
router.post("/chapter", (req, res) => {
  res.send("POST chapter");
});
router.delete("/chapter/:id", (req, res) => {
  res.send("DELETE chapter");
});

router.get("/course", (req, res) => {
  res.send("GET course");
});
router.post("/course", (req, res) => {
  res.send("POST course");
});
router.delete("/course/:id", (req, res) => {
  res.send("DELETE course");
});

module.exports = router;
