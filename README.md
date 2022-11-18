# React + Stripe Storefront ![MIT License](https://img.shields.io/badge/MIT-License-3DA639?logo=OpenSourceInitiative)

![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=react)
![Material UI](https://img.shields.io/badge/Material_UI-v5.10.6-dodgerblue?logo=mui)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.8.3-blue?logo=typescript&logoColor=blue)
![Stripe](https://img.shields.io/badge/Stripe-v16.6.0-royalblue?logo=stripe&logoColor=royalblue)
![GraphQL](https://img.shields.io/badge/GraphQL-v16.6.0-E10098?logo=graphql&logoColor=E10098)
![Mongoose](https://img.shields.io/badge/Mongoose-v6.6.0-darkred?logo=monster&logoColor=darkred)
![MongoDB](https://img.shields.io/badge/MongoDB-v5.0.3-forestgreen?logo=mongodb)
![Node](https://img.shields.io/badge/Node-v14.18.0-green?logo=node.js&logoColor=green)
![Express](https://img.shields.io/badge/Express-v4.18.1-gold?logo=express&logoColor=gold)

An online shop React webapp where customers can browse products by category and filter by tags, then checkout securely via Stripe payment.

<div style="display: flex; flex-flow: row wrap; gap: 10px; width: 100%">
  <img alt="Desktop Site" src="./demo/desktop.PNG" style="flex: 1 1 auto; height: 450px; min-width: 150px; object-fit: cover;  object-position: 100% 0" />
  <img alt="Mobile Site" src="./demo/mobile.PNG" style="flex: 1 1 auto; height: 450px; min-width: 150px; object-fit: cover;  object-position: 100% 0" />
  <img alt="Tablet Site" src="./demo/tablet.PNG" style="flex: 1 1 auto; height: 450px; min-width: 150px; object-fit: cover;  object-position: 100% 0" />
</div>

See live demo site [here](https://react-stripe-storefront.herokuapp.com/).

---

# Features

## Promo Banner

An autoscrolling carousel banner allows for display of promotional images.

![Promo banner](./demo/promoCarousel.gif)

## Product Browsing by Category

![Breadcrumbs](./demo/breadcrumbs.PNG)

## Product Filtering by Tags

Products can be filtered by any number of tags selected from the tag bar on the homepage or any single category page.

![Filter by tags](./demo/tags.PNG)

## Product Recommendations

On a single product page, similar products are recommended by tags in common with the product being viewed.

![Product recommendations](./demo/recommendations.PNG)

## Pagination

Data queries are paginated on the back-end to reduce data sizes potentially sent over mobile data. The `pagination` attribute contains the current `page`, quantity of results `perPage`, and a total `count` of database results.

```json
{
  "data": {
    "products": {
      "pagination": {
        "page": 2,
        "perPage": 8,
        "count": 18
      },
      "results": [
        ...
```

If `page` number and `perPage` quantity are not given in query variables, the complete result set is returned.

## Cart

The cart sidebar allows for adjusting quantities, removing items, proceeding to the cart page, or proceeding to checkout.

![Cart](./demo/cart.gif)

## Stripe Checkout

Secure credit card checkout via Stripe API.

![Stripe checkout](./demo/checkout.PNG)

---

## Tech Stack

![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=react)

![GraphQL](https://img.shields.io/badge/GraphQL-v16.6.0-E10098?logo=graphql&logoColor=E10098)

![Express](https://img.shields.io/badge/Express-v4.18.1-gold?logo=express&logoColor=gold)

![Node](https://img.shields.io/badge/Node-v14.18.0-green?logo=node.js&logoColor=green)

![MongoDB](https://img.shields.io/badge/MongoDB-v5.0.3-forestgreen?logo=mongodb)

## Author

<!-- <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 20px">
  <div style="display: flex; flex-flow: column; align-items: center">
    <img alt="Vince Lee" src="https://avatars.githubusercontent.com/u/81829523?s=40&v=4" />
    Vince Lee
  </div>
  <a href="https://github.com/StarryBlue7">
    <img alt="GitHub" src="./demo/github.svg" height=24 />
  </a>
  <a href="https://www.linkedin.com/in/vince-lee/">
    <img alt="LinkedIn" src="./demo/linkedin.svg" height=24 />
  </a>
  <a href="https://starryblue7.github.io/portfolio-iv/" style="font-weight: bold">Portfolio</a>
</div> -->

<div><!-- .element: style="display: flex; gap: 15px; align-items: center; margin-bottom: 20px" -->
  <div><!-- .element: style="display: flex; flex-flow: column; align-items: center" -->
    <img alt="Vince Lee" src="https://avatars.githubusercontent.com/u/81829523?s=40&v=4" />
    Vince Lee
  </div>
  <a href="https://github.com/StarryBlue7">
    <img alt="GitHub" src="./demo/github.svg" height=24 />
  </a>
  <a href="https://www.linkedin.com/in/vince-lee/">
    <img alt="LinkedIn" src="./demo/linkedin.svg" height=24 />
  </a>
  <a href="https://starryblue7.github.io/portfolio-iv/" style="font-weight: bold">Portfolio</a>
</div>


## License

[![MIT License](https://img.shields.io/badge/MIT-License-3DA639?logo=OpenSourceInitiative)](https://vince-lee.mit-license.org/)

## Acknowledgements

- Swipeable carousel via [Swiper](https://swiperjs.com/).
- Toast notifications via [React-Toastify](https://fkhadra.github.io/react-toastify/introduction).
- Stock product images provided by [Foter](https://foter.com/).
