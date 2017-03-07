--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-03-06 19:54:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2140 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 563 (class 1247 OID 16410)
-- Name: enum_Users_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "enum_Users_gender" AS ENUM (
    'M',
    'F'
);


ALTER TYPE "enum_Users_gender" OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 186 (class 1259 OID 16417)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    motto character varying(255),
    gender "enum_Users_gender" DEFAULT 'M'::"enum_Users_gender" NOT NULL,
    figure character varying(255),
    credits integer DEFAULT 0 NOT NULL,
    pixels integer DEFAULT 0 NOT NULL,
    auth_ticket character varying(255) NOT NULL
);


ALTER TABLE "Users" OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16415)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO postgres;

--
-- TOC entry 2141 (class 0 OID 0)
-- Dependencies: 185
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- TOC entry 2005 (class 2604 OID 16420)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- TOC entry 2133 (class 0 OID 16417)
-- Dependencies: 186
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "Users" (id, username, motto, gender, figure, credits, pixels, auth_ticket) FROM stdin;
1	Jaden	Habbo emulator developer	M	lg-285-64.hd-209-1.hr-100-61.sh-300-1408.cc-260-1408.ch-12667435-1408	300	0	game
\.


--
-- TOC entry 2142 (class 0 OID 0)
-- Dependencies: 185
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Users_id_seq"', 1, false);


--
-- TOC entry 2010 (class 2606 OID 16432)
-- Name: Users Users_auth_ticket_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_auth_ticket_key" UNIQUE (auth_ticket);


--
-- TOC entry 2012 (class 2606 OID 16428)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 2014 (class 2606 OID 16430)
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


-- Completed on 2017-03-06 19:54:39

--
-- PostgreSQL database dump complete
--

