const router = require("express-promise-router")();
const { validateBody, schemas } = require("../../helpers/route.helper");
const AccountController = require("../../controllers/account/account.controller");
const tokenMiddleware = require("../../middlewares/token.middleware");
const { login, register } = require("../../schemas/account/account.schema");

router.route("/login").post([validateBody(login)], AccountController.login);

router.route("/register").post([validateBody(register)], AccountController.register);

router.use(tokenMiddleware);

router.route("/info").get([], AccountController.getInfo);

// router.route("/profile")
//   .get(AuthController.profile)

// router.route("/articles")
//   .get(AuthController.getUserArticles)

module.exports = router;
