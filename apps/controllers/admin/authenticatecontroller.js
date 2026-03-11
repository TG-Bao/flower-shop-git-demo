const express = require("express");
const router = express.Router();

// Admin Login
router.get("/login", (req, res) => {
  if (req.session.user && req.session.user.role === "admin")
    return res.redirect("/admin");
  res.render("admin/login", { error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    req.session.user = { id: 1, username: "admin", role: "admin" };
    return res.redirect("/admin");
  }
  res.render("admin/login", {
    error: "Access Denied: Invalid admin credentials.",
  });
});

// Admin Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
});

module.exports = router;
