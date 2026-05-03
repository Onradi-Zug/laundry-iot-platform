--
-- PostgreSQL database dump
--

\restrict UvtZeTek1VuiSQHEsq8gohaWvvaFlGoQkgTyWH9Ep8e5uJS0BbsujlhzrEmZyUy

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: apartments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apartments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    number character varying NOT NULL,
    "buildingId" uuid
);


ALTER TABLE public.apartments OWNER TO postgres;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "startTime" timestamp with time zone NOT NULL,
    "endTime" timestamp with time zone NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL,
    price integer,
    "userId" uuid,
    "machineId" uuid
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: buildings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buildings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "tenantId" uuid
);


ALTER TABLE public.buildings OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type character varying NOT NULL,
    payload jsonb,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "machineId" uuid
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: laundries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laundries (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "buildingId" uuid
);


ALTER TABLE public.laundries OWNER TO postgres;

--
-- Name: laundry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laundry (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "buildingId" uuid NOT NULL
);


ALTER TABLE public.laundry OWNER TO postgres;

--
-- Name: machines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.machines (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    status character varying DEFAULT 'idle'::character varying NOT NULL,
    "tenantId" uuid,
    "laundryId" uuid NOT NULL,
    type character varying NOT NULL,
    "lastEventAt" timestamp with time zone
);


ALTER TABLE public.machines OWNER TO postgres;

--
-- Name: tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenants (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.tenants OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying,
    "tenantId" uuid
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: apartments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.apartments (id, number, "buildingId") FROM stdin;
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, "startTime", "endTime", status, price, "userId", "machineId") FROM stdin;
8a2d03d1-75f0-4b83-a88e-66b10f3d1b5a	2026-05-03 12:00:00+00	2026-05-03 13:00:00+00	active	\N	e4b52a96-e3d7-432a-a187-1a9116e4851d	2e686aa0-0ee1-4bcd-aa06-7182811050a8
\.


--
-- Data for Name: buildings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buildings (id, name, "tenantId") FROM stdin;
a7cf5301-374c-429a-89d6-3f7dc00ae1a3	Main Building	11111111-1111-1111-1111-111111111111
d4f1bd82-65f0-48dc-81e9-3795386d6922	Test Building	bcd383de-41df-42af-a759-386ea8983240
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, type, payload, "createdAt", "machineId") FROM stdin;
eb2adc44-0eee-4974-a711-4774342a5dd4	start	{"program": "cotton"}	2026-05-03 10:14:15.675425+00	deb21b8f-4294-446b-9d2a-1a42359a1cdb
55c84da4-ef46-4914-a621-b711838bd53e	finish	{"program": "cotton"}	2026-05-03 10:20:16.814651+00	deb21b8f-4294-446b-9d2a-1a42359a1cdb
\.


--
-- Data for Name: laundries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laundries (id, name, "buildingId") FROM stdin;
\.


--
-- Data for Name: laundry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laundry (id, name, "buildingId") FROM stdin;
bea34738-ad42-40d5-a6a0-6787e3b0a038	Laundry 1	a7cf5301-374c-429a-89d6-3f7dc00ae1a3
7dad9b06-9b80-443c-b172-8f9a9725a38d	Test Laundry	d4f1bd82-65f0-48dc-81e9-3795386d6922
\.


--
-- Data for Name: machines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.machines (id, name, status, "tenantId", "laundryId", type, "lastEventAt") FROM stdin;
deb21b8f-4294-446b-9d2a-1a42359a1cdb	Washer A	idle	\N	bea34738-ad42-40d5-a6a0-6787e3b0a038	washer	2026-05-03 10:20:16.834+00
2e686aa0-0ee1-4bcd-aa06-7182811050a8	Test Machine	idle	bcd383de-41df-42af-a759-386ea8983240	7dad9b06-9b80-443c-b172-8f9a9725a38d	washer	\N
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenants (id, name) FROM stdin;
11111111-1111-1111-1111-111111111111	Default Tenant
bcd383de-41df-42af-a759-386ea8983240	test-tenant
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, "tenantId") FROM stdin;
3cf84f53-7630-4938-9222-408929a6223f	test1@example.com	$2b$10$/C/9yfNOqBKFcz/VISdlpOLqVN243vL2sQ7PTUkMLAceVR7dDQ3Mi	user	11111111-1111-1111-1111-111111111111
e4b52a96-e3d7-432a-a187-1a9116e4851d	test@example.com	password	user	bcd383de-41df-42af-a759-386ea8983240
\.


--
-- Name: laundry PK_09d25a86f836dc67b26cacaae1e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laundry
    ADD CONSTRAINT "PK_09d25a86f836dc67b26cacaae1e" PRIMARY KEY (id);


--
-- Name: laundries PK_3ff6e4eeedc60b8815ffdef0851; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT "PK_3ff6e4eeedc60b8815ffdef0851" PRIMARY KEY (id);


--
-- Name: events PK_40731c7151fe4be3116e45ddf73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY (id);


--
-- Name: tenants PK_53be67a04681c66b87ee27c9321; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY (id);


--
-- Name: machines PK_7b0817c674bb984650c5274e713; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT "PK_7b0817c674bb984650c5274e713" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: buildings PK_bc65c1acce268c383e41a69003a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY (id);


--
-- Name: bookings PK_bee6805982cc1e248e94ce94957; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY (id);


--
-- Name: apartments PK_f6058e85d6d715dbe22b72fe722; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartments
    ADD CONSTRAINT "PK_f6058e85d6d715dbe22b72fe722" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: bookings FK_16c5c60777450ab8ccc8a69ea21; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "FK_16c5c60777450ab8ccc8a69ea21" FOREIGN KEY ("machineId") REFERENCES public.machines(id) ON DELETE CASCADE;


--
-- Name: machines FK_1b036b45bcb55d04f0890b09289; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT "FK_1b036b45bcb55d04f0890b09289" FOREIGN KEY ("laundryId") REFERENCES public.laundry(id) ON DELETE CASCADE;


--
-- Name: bookings FK_38a69a58a323647f2e75eb994de; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: laundry FK_744c346643638aa8356a59e34f5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laundry
    ADD CONSTRAINT "FK_744c346643638aa8356a59e34f5" FOREIGN KEY ("buildingId") REFERENCES public.buildings(id) ON DELETE CASCADE;


--
-- Name: buildings FK_8be9b9356d0480f426b029bf2d1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT "FK_8be9b9356d0480f426b029bf2d1" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id);


--
-- Name: events FK_9faf8c78ff31996a81d038b724c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_9faf8c78ff31996a81d038b724c" FOREIGN KEY ("machineId") REFERENCES public.machines(id) ON DELETE CASCADE;


--
-- Name: laundries FK_9fd5b9b1cb72643291f0b3fa32e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT "FK_9fd5b9b1cb72643291f0b3fa32e" FOREIGN KEY ("buildingId") REFERENCES public.buildings(id);


--
-- Name: machines FK_a7b7775f1c9780700348fd612e1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT "FK_a7b7775f1c9780700348fd612e1" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON DELETE SET NULL;


--
-- Name: users FK_c58f7e88c286e5e3478960a998b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON DELETE SET NULL;


--
-- Name: apartments FK_fe03c5d43296fd372662b4bf8c7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartments
    ADD CONSTRAINT "FK_fe03c5d43296fd372662b4bf8c7" FOREIGN KEY ("buildingId") REFERENCES public.buildings(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict UvtZeTek1VuiSQHEsq8gohaWvvaFlGoQkgTyWH9Ep8e5uJS0BbsujlhzrEmZyUy

