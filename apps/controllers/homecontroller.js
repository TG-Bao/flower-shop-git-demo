const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");

// 1. User/Visitor Auth (Login)
router.get("/login", (req, res) => {
  if (req.session.user) {
    return req.session.user.role === "admin"
      ? res.redirect("/admin")
      : res.redirect("/");
  }
  res.render("admin/authenticate/user", { currentPage: "login", error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "user") {
    req.session.user = { role: "user", username: "user" };
    res.redirect("/");
  } else if (username === "admin" && password === "admin") {
    res.render("admin/authenticate/user", {
      error: "Please use official Admin Login portal.",
      currentPage: "login",
    });
  } else {
    res.render("admin/authenticate/user", {
      error: "Invalid Credentials!",
      currentPage: "login",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// 2. Main Public Pages
const restrictAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin")
    return res.redirect("/admin");
  next();
};

router.get("/", restrictAdmin, (req, res) => {
  const products = productModel.getAll();
  res.render("admin/home", {
    products,
    user: req.session.user,
    currentPage: "home",
  });
});

router.get("/contact", (req, res) => {
  res.render("admin/contact", {
    title: "Liên hệ với chúng tôi",
    email: "contact@flowershop.com",
    phone: "0123-456-789",
    address: "123 Đường Hoa, Quận 1, TP.HCM",
    currentPage: "contact"
  });
});
module.exports = router;
