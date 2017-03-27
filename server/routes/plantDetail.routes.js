
module.exports = (app, { next }) => {
  app.get(/\/detail\/(garden|museum|herbarium)/, (req, res) => {
    res.send(req.query);
  });
};
