var ObjectID = require('bson-objectid');

module.exports = {
  "localhost": {
    "databases": {
      "kpos-test": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              },
              {
                "name": "products"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": [
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "kpos-test.products",
                "name": "_id_",
                "unique": true
              }
            ]
          },
          {
            "name": "products",
            "documents": [
              {
                "_id": 1,
                "name": "product 1",
                "price": 100
              },
              {
                "_id": 2,
                "name": "product 2",
                "price": 200
              },
              {
                "_id": 3,
                "name": "product 3",
                "price": 300
              },
              {
                "_id": 4,
                "name": "product 4",
                "price": 400
              },
              {
                "_id": 5,
                "name": "product 5",
                "price": 500
              }
            ]
          }
        ]
      }
    }
  }
}