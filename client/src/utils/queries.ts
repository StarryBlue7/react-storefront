import { gql } from "@apollo/client";

export const QUERY_TAGS = gql`
  query tags {
    tags {
      _id
      name
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query categories {
    categories {
      _id
      name
      subCategories {
        name
        _id
        subCategories {
          _id
          name
          subCategories {
            _id
            name
          }
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query products($tags: [ID], $category: ID) {
    products(tags: $tags, category: $category) {
      _id
      fullName
      shortName
      price
      modelNumber
      imgURL
      description
      popularity
      categories {
        _id
        name
      }
      tags {
        _id
        name
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query product($productId: String!) {
    product(productId: $productId) {
      _id
      fullName
      shortName
      price
      modelNumber
      imgURL
      description
      popularity
      categories {
        _id
        name
      }
      tags {
        _id
        name
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      emailVerified
      orders {
        _id
        orderNum
        createdAt
        shippedAt
        estimatedArrival
        items {
          product {
            fullName
            imgURL
          }
          quantity
        }
        itemCount
      }
      likes {
        name
        _id
      }
      cart {
        product {
          imgURL
          fullName
          shortName
          price
          modelNumber
          description
          _id
        }
        quantity
      }
    }
  }
`;

export const QUERY_CART = gql`
  query cart {
    me {
      _id
      cart {
        product {
          _id
          imgURL
          fullName
          shortName
          price
          modelNumber
          description
        }
        quantity
      }
    }
  }
`;
