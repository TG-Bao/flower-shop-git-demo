const express = require("express");
const router = express.Router();
const productModel = require("../../model/productModel");

// Middleware for Admin area (Protected)
const isAdminAuth = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") return next();
  res.redirect("/admin/login");
};

router.use(isAdminAuth);

// Admin CRUD Dashboard/List
router.get("/", (req, res) => {
  const products = productModel.getAll();
  res.render("admin/userManage", { products, user: req.session.user });
});

router.get("/add", (req, res) => {
  res.render("admin/add_product", { user: req.session.user });
});

router.post("/add", (req, res) => {
  const { name, price, description, image } = req.body;
  productModel.add(name, price, description, image);
  res.redirect("/admin");
});

router.get("/edit/:id", (req, res) => {
  const product = productModel.getById(req.params.id);
  if (!product) return res.redirect("/admin");
  res.render("admin/edit_product", { product, user: req.session.user });
});

router.post("/edit/:id", (req, res) => {
  const { name, price, description, image } = req.body;
  productModel.update(req.params.id, name, price, description, image);
  res.redirect("/admin");
});

router.get("/delete/:id", (req, res) => {
  productModel.delete(req.params.id);
  res.redirect("/admin");
});

module.exports = router;
