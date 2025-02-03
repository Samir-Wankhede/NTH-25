#!/bin/sh
echo "Creating /etc/letsencrypt directory..."
mkdir -p /etc/letsencrypt
chmod -R 755 /etc/letsencrypt
echo "✅ /data directory created successfully!"
echo "Creating /var/www/certbot directory..."
mkdir -p /var/www/certbot
chmod -R 755 /var/www/certbot
echo "✅ /data directory created successfully!"
