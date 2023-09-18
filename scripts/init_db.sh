#!/bin/bash

# Create FileMetadata table in secure-file-sharing-backend.db
sqlite3 ../db/secure-file-sharing-backend.db << EOF
CREATE TABLE IF NOT EXISTS FileMetadata (
    id TEXT PRIMARY KEY,
    originalFilename TEXT NOT NULL,
    fileSize INTEGER NOT NULL,
    key BLOB NOT NULL,
    iv BLOB NOT NULL,
    expiresAt TEXT,
    downloadCount INTEGER,
    maxDownloadCount INTEGER
);

EOF
