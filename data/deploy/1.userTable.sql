-- Deploy compagnon-jdr:1.userTable to pg

BEGIN;

CREATE TABLE IF NOT EXISTS public.user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL UNIQUE CHECK (email ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]+$'),
    username text NOT NULL UNIQUE,
    password text NOT NULL CHECK (password ~ '.{6,16}'),
    avatarURL text,
    isGuest BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT null
);

INSERT INTO public.user (email, username, password, isGuest)
  VALUES
    ('michel@hotmail.com', 'michoux', 'michouxdu95', FALSE),
    ('Gimli@moria.org', 'nainportant', '123456789', FALSE);

COMMIT;
