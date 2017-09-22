#!/usr/bin/env bash

if [ ! -f config.js ]; then
  cat > config.js << EOF
// read process.env.NODE_ENV to set values depending on environment

module.exports = {
  ANALYTICS_TRACKING_ID: 'FIXME',
};
EOF
fi;

if [ ! -f server/config.js ]; then
  cat > server/config.js << EOF
// read process.env.NODE_ENV to set values depending on environment

module.exports = { };
EOF
fi;
