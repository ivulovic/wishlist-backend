const router = require("express-promise-router")();
const { validateBody, validateParams } = require("../../helpers/route.helper");
const storeSchema = require("../../schemas/store/store.schema");
const commonSchema = require("../../schemas/common.schema");
const tokenMiddleware = require("../../middlewares/token.middleware");
const StoreController = require("../../controllers/store/store.controller");

router.route("/").get(StoreController.list);

router.use(tokenMiddleware);

router.route("/").post([validateBody(storeSchema.create)], StoreController.create);

router.route("/all").get(StoreController.listAll);

router
  .route("/:id")
  .patch([validateParams(commonSchema.objectId, "id"), validateBody(storeSchema.update)], StoreController.update)
  .delete([validateParams(commonSchema.objectId, "id")], StoreController.remove);
module.exports = router;
