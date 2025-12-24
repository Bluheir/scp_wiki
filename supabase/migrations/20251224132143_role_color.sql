BEGIN;
CREATE DOMAIN public.color AS TEXT
CHECK (
	VALUE ~* '^#([0-9a-f]{3}|[0-9a-f]{6})$'
	OR VALUE ~* '^rgb\(\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*\)$'
);

ALTER TABLE permission.urole
ADD role_color public.color NOT NULL
DEFAULT 'rgb(43, 215, 251)';
COMMIT;