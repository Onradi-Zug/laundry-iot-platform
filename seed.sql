-- seed.sql
-- Safe idempotent inserts: will not fail if rows already exist

BEGIN;

-- tenants
INSERT INTO tenants (id, name)
VALUES ('bcd383de-41df-42af-a759-386ea8983240','test-tenant')
ON CONFLICT (id) DO NOTHING;

-- buildings
INSERT INTO buildings (id, name, "tenantId")
VALUES ('d4f1bd82-65f0-48dc-81e9-3795386d6922','Test Building','bcd383de-41df-42af-a759-386ea8983240')
ON CONFLICT (id) DO NOTHING;

-- laundry
INSERT INTO laundry (id, name, "buildingId")
VALUES ('7dad9b06-9b80-443c-b172-8f9a9725a38d','Test Laundry','d4f1bd82-65f0-48dc-81e9-3795386d6922')
ON CONFLICT (id) DO NOTHING;

-- machines
INSERT INTO machines (id, name, status, "laundryId", "tenantId", type)
VALUES ('2e686aa0-0ee1-4bcd-aa06-7182811050a8','Test Machine','idle','7dad9b06-9b80-443c-b172-8f9a9725a38d','bcd383de-41df-42af-a759-386ea8983240','washer')
ON CONFLICT (id) DO NOTHING;

-- users
INSERT INTO users (id, email, password, role, "tenantId")
VALUES ('e4b52a96-e3d7-432a-a187-1a9116e4851d','test@example.com','password','user','bcd383de-41df-42af-a759-386ea8983240')
ON CONFLICT (id) DO NOTHING;

COMMIT;
