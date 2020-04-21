const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const {
  signinUser,
  signupUser,
  signoutUser,
  updateUser,
  fetchUserById,
} = require("../controllers/userController");
const { check } = require("express-validator");
const router = Router();

// @route - POST /api/users/signup
// @desc - Register a new user
// @method - Public
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be greater than 6 characters").isLength({
      min: 6,
    }),
    check(
      "password",
      "Password must contain atleast one digit"
    ).isAlphanumeric(),
  ],
  signupUser
);

// @route - GET /api/users/me
// @desc - Retreive current user details
// @method - Private (Auth)
router.get("/me", authenticate, (req, res) => {
  const user = req.user;
  res.send({ statusCode: 200, user });
});

// @route - GET /api/users/:userId
// @desc - Retreive specific user by Id
// @method - Public
router.get("/:userId", fetchUserById);

// @route - POST /api/users/login
// @desc - Signin a user
// @method - Public
router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  signinUser
);

// @route - PATCH /api/users/
// @desc - Update the authenticated user details
// @method - Private (Auth)
router.patch("/", authenticate, updateUser);

// @route - DELETE /api/users/
// @desc - Signin a user
// @method - Private
router.delete("/", authenticate, signoutUser);

module.exports = router;
