# sanity check: make sure we're in the root directory of the example
cd "$( dirname "$0" )"

# delete temp files even if Ctrl+C is pressed
int_trap() {
  echo "Cleaning up..."
}
trap int_trap INT

ln -s "meteor/package-noglyph.js" ../../package.js
ln -s "../../package.json" package.json

MONGO_URL=mongodb:// meteor run

rm ../../package.js package.json
