const { Router } = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const authenticate = require("../middleware/authenticate");
const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");
const { storage, limits, fileFilter } = require("../utils/mutlerUtils");

const upload = multer({ storage, limits, fileFilter });
const router = Router();

// @route - POST /api/products/
// @desc - Create a new product
// @method - Private
router.post(
  "/",

  upload.array("product-image", 3),
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("totalQuantity", "Total quantity is required").not().isEmpty(),
  ],
  createProduct
);

// @route - GET /api/products/
// @desc - Fetch all products
// @method - Public
router.get("/", fetchAllProducts);

// @route - GET /api/products/:productId
// @desc - Fetch a product
// @method - Public
router.get("/:productId", fetchProductById);

// @route - PUT /api/products/:productId
// @desc - Update a product
// @method - Private
router.put(
  "/:productId",
  authenticate,
  upload.array("product-image", 3),
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("totalQuantity", "Total quantity is required").not().isEmpty(),
  ],
  updateProductById
);

// @route - DELETE /api/products/:productId
// @desc - Delete a product
// @method - Private (Auth)
router.delete("/:productId", authenticate, deleteProductById);

module.exports = router;
