mklink ..\..\package.js "meteor/package-noglyph.js"
mklink package.json "../../package.json"
set MONGO_URL=mongodb://
meteor run
del ..\..\package.js package.json
