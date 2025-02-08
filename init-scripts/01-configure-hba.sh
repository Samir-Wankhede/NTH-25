#!/bin/bash
set -e

# Wait for postgres to start
until pg_isready; do
  echo "Waiting for postgres to start..."
  sleep 1
done

# Write the new pg_hba.conf
cat > "$PGDATA/pg_hba.conf" << EOF
# TYPE  DATABASE        USER            ADDRESS                 METHOD
# Allow localhost connections
host    all             all             127.0.0.1/32            md5
# Allow your specific VM
host    all             all             10.2.0.5/32             md5
# Allow the external IP
host    all             all             103.146.240.134/32      md5
# Allow other containers in the same network
host    all             all             172.16.0.0/12           md5
# Deny all other connections
host    all             all             0.0.0.0/0               reject
EOF

# Set proper permissions
chmod 600 "$PGDATA/pg_hba.conf"

# Reload PostgreSQL configuration
pg_ctl reload