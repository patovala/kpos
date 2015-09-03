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
                "name": "clients"
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
                "ns": "kpos-test.clients",
                "name": "_id_",
                "unique": true
              },
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
            "name": "clients",
            "documents": [
              {
                "_id": 1,
                "session_id": 100,
                "name": "client 1"
              },
              {
                "_id": 2,
                "session_id": 200,
                "name": "client 2"
              },
              {
                "_id": 3,
                "session_id": 300,
                "name": "client 3"
              },
              {
                "_id": 4,
                "session_id": 400,
                "name": "client 4"
              },
              {
                "_id": 5,
                "session_id": 500,
                "name": "client 5"
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