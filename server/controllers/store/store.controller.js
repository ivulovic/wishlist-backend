const { StoreModel } = require("../../models");

module.exports = {
  create: async (req, res) => {
    const content = req.value.body;
    content.createdAt = Date.now();
    content.modifiedAt = Date.now();
    content.createdBy = req.decoded.user;
    content.modifiedBy = req.decoded.user;
    const objToSave = new StoreModel(content);
    await objToSave.save();
    res.status(200).send(objToSave);
  },
  list: async (req, res) => {
    const arr = await StoreModel.find({}, { _id: 0, name: 1, logo: 1, origin: 1 }).sort("-modifiedAt");
    res.status(200).send(arr);
  },
  listAll: async (req, res) => {
    const arr = await StoreModel.find();
    res.status(200).send(arr);
  },
  remove: async (req, res) => {
    const { id } = req.value.params;

    await StoreModel.findByIdAndRemove(id);

    res.status(200).send({ _id: id });
  },
  update: async (req, res) => {
    const { id } = req.value.params;
    const content = req.value.body;
    content.modifiedAt = Date.now();
    content.modifiedBy = req.decoded.user;
    const objToSave = await StoreModel.findByIdAndUpdate(id, content);
    res.status(200).send({ ...objToSave._doc, ...content });
  },
};
