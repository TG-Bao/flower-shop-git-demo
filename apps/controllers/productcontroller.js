const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");

const restrictAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin")
    return res.redirect("/admin");
  next();
};

router.get("/flowers", restrictAdmin, (req, res) => {
  const products = productModel.getAll();
  res.render("product", {
    products,
    user: req.session.user,
    currentPage: "flowers",
  });
});

router.get("/details/:id", restrictAdmin, (req, res) => {
  const product = productModel.getById(req.params.id);
  if (!product) return res.redirect("/");
  res.render("admin/details", {
    product,
    user: req.session.user,
    currentPage: "details",
  });
});

module.exports = router;
