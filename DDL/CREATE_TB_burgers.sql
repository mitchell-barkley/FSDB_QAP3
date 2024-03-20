CREATE TABLE public.burgers
(
    burger_id serial NOT NULL,
    price money NOT NULL,
    burger_name character varying(32) NOT NULL,
    sauce character varying(32),
    topping1 character varying(32),
    topping2 character varying(32),
    topping3 character varying(32),
    topping4 character varying(32),
    topping5 character varying(32),
    topping6 character varying(32),
    PRIMARY KEY (burger_id)
);

ALTER TABLE IF EXISTS public.burgers
    OWNER to postgres;