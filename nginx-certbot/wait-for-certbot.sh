#!/bin/sh

# Start nginx
nginx

# Wait for the certbot_finished file to appear
while [ ! -f /var/www/certbot/certbot_finished ]; do
    echo "Waiting for certbot to finish..."
    sleep 5
done

echo "Certbot finished, shutting down nginx-certbot..."
nginx -s quit

# Wait a bit to ensure nginx has time to shutdown gracefully
exit 0