We need to implement discount logic, and the pattern to be used is chain of responsibilities
or 'cadena de responsabilidades'.

check it here: https://es.wikipedia.org/wiki/Chain_of_Responsibility_(patr%C3%B3n_de_dise%C3%B1o)

and here is the js version: http://www.joezimjs.com/javascript/javascript-design-patterns-chain-of-responsibility/

Why we need to implement this pattern?

Cause we need different discounts react to special cases and be chained, for instance our discounts
could be:

- Generic discounts: something that the store is offering for all users <- this should be moved away
from this chain cause is pretty much optional a generic discount
- Discount to specific users: some users (the ones in a category) can get special discounts
- Discounts that work together with products: some discounts applies only to a specific product
- Discounts for products next to be expired: some items could face an expiration and they need to
  be sold ASAP.
- Name your own discount here.


