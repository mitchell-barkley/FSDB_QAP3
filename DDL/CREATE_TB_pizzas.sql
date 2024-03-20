CREATE TABLE public.pizzas
(
    pizza_id serial NOT NULL,
    price money NOT NULL,
    pizza_name character varying(32) NOT NULL,
    sauce character varying(32) NOT NULL,
    cheese character varying(32) NOT NULL,
    topping1 character varying(32) NOT NULL,
    topping2 character varying(32) NOT NULL,
    topping3 character varying(32) NOT NULL,
    topping4 character varying(32),
    topping5 character varying(32),
    topping6 character varying(32),
    PRIMARY KEY (pizza_id)
);

ALTER TABLE IF EXISTS public.pizzas
    OWNER to postgres;
