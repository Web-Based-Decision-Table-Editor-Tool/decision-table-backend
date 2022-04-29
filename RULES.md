# Adding a Rule
To add a rule, the following must exist:
1. A decision table
2. Condition(s)
3. Action(s)

# Sample API Request
1. Assuming table with id dt_1 exists

2. Assuming the following conditions exist:

```
  "conditions": [
    {
      "id": "c19a232c-a836-461c-a94c-33513de8c21a",
      "name": "Package",
      "type": "text",
      "valueList": [
        {
          "id": "condition-value-1",
          "value": "Box"
        },
        {
          "id": "condition-value-2",
          "value": "Letter"
        },
        {
          "id": "condition-value-3",
          "value": "Bag"
        }
      ]
    },
    {
      "id": "4e38f0d4-5d8b-4631-b43b-834ab72e623e",
      "name": "Region",
      "type": "text",
      "valueList": [
        {
          "id": "condition-value-1",
          "value": "Domestic"
        },
        {
          "id": "condition-value-2",
          "value": "International"
        }
      ]
    }
  ]
```

3. And the following action exists:

```
"actions": [
    {
      "id": "562dc415-4e73-41f1-9d32-3c517554675f",
      "name": "Shipping",
      "type": "Boolean",
      "valueList": [
        {
          "id": "action-value-1",
          "value": "Ship"
        },
        {
          "id": "action-value-2",
          "value": "No Ship"
        }
      ]
    }
  ]
```

## Adding a Rule
To add a Rule that says:
When condition "Package" is "Box" and Region is "International", Action Shipping has value "Ship"

POST request on /rule route with body:

```
{
    "tableId":"dt_1",
    "conditions": [
        {
            "id": "c19a232c-a836-461c-a94c-33513de8c21a",
            "valueid": "condition-value-1"
        },
        {
            "id": "4e38f0d4-5d8b-4631-b43b-834ab72e623e",
            "valueid": "condition-value-2"
        }
    ],
    "actions": [
        {
            "id" : "562dc415-4e73-41f1-9d32-3c517554675f",
            "valueid": "action-value-1"
        }
    ]
}
```
