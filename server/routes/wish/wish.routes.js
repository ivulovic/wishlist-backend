const router = require("express-promise-router")();
const { validateBody, validateParams } = require("../../helpers/route.helper");
const wishSchema = require("../../schemas/wish/wish.schema");
const commonSchema = require("../../schemas/common.schema");
const tokenMiddleware = require("../../middlewares/token.middleware");
const WishController = require("../../controllers/wish/wish.controller");

router.route("/user").post([validateBody(wishSchema.urlIdentificator)], WishController.listForUser);

router.use(tokenMiddleware);

router.route("/").get(WishController.list);

router.route("/").post([validateBody(wishSchema.create)], WishController.create);
router.route("/fetch").post([validateBody(wishSchema.fetch)], WishController.fetch);

router.route("/all").get(WishController.listAll);

router
  .route("/:id")
  .patch([validateParams(commonSchema.objectId, "id"), validateBody(wishSchema.update)], WishController.update)
  .delete([validateParams(commonSchema.objectId, "id")], WishController.remove);
module.exports = router;
