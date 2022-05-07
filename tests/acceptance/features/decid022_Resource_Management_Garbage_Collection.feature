Feature: Resource Management Performs Garbage Collection Story

As a user who uses the Decision_Table_Editor_Cloud_Services
I want the Resource Manager to perform Garbage Collection
So that oldest modified tables can be removed

Acceptance Tests

Scenario Outline: Constraint Max Number of Decision Tables (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
When I create Decision Tables in excess of 10 over the specified number in the configuration file
Then the number of tables created do not exceed the specified number in the configuration file
