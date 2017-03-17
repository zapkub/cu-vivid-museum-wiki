
module.exports = (server, app) => {
  server.get(/\/detail\/(garden|museum|herbarium)/, (req, res) => {
    res.send(req.query);
  });
};
