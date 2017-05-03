const markdown = require('markdown-js');
const fs = require('fs');
const path = require('path');

const cl = fs.readFileSync(path.join(__dirname, '../../CHANGELOG.md')).toString();
const tfs = fs.readFileSync(path.join(__dirname, '../../docs/terms-of-services.md')).toString();
const pap = fs.readFileSync(path.join(__dirname, '../../docs/policy-and-privacy.md')).toString();

const changlogHTML = markdown.makeHtml(cl);
const termsHTML = markdown.makeHtml(tfs);
const papHTML = markdown.makeHtml(pap);

module.exports = (app, { next }) => {
  app.get('/changelog-md', (req, res) => {
    res.send(changlogHTML);
  });
  app.get('/policy-md', (req, res) => {
    res.send(papHTML);
  });
  app.get('/terms-md', (req, res) => {
    res.send(termsHTML);
  });
};
