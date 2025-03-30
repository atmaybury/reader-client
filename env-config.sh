# Create the config file with the environment variable
cat > /usr/share/nginx/html/env-config.js << EOF
window.ENV_CONFIG = {
  API_URL: '${API_URL}',
};
EOF

