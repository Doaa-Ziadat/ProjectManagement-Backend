BEGIN;

DROP TABLE IF EXISTS users, projects ,tasks, project_member CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255), 
    location VARCHAR(255),
    adminFlag BOOLEAN,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    name TEXT NOT NULL,
    timeline  DATE NOT NULL,
    priority VARCHAR(255) ,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE  project_member  (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    projectId INTEGER REFERENCES projects(id)
);

CREATE TABLE  tasks  (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    projectId INTEGER REFERENCES projects(id),
    timeline DATE NOT NULL,
    priority VARCHAR(255) ,
    processLabel VARCHAR(255) ,
    userId INTEGER REFERENCES users(id),
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);


COMMIT;