module.exports = {
  routes: "./server/routes/",
  secret: process.env.NODE_ENV === "production" ? process.env.TOKEN_SECRET : "53jkdj9843953fsfwertyuibvhdjkdfdfd"
};
