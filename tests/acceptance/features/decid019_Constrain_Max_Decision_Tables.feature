Feature: Constraint Max Number of Decision Tables Story

As a administrator who administers the Decision_Table_Editor_Cloud_Services
I want to constraint the maximum number of decision tables that can be created
So that I can manage the decision tables

Acceptance Tests

Scenario Outline: Constraint Max Number of Decision Tables (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
When I create Decision Tables over the specified number in the configuration file
Then the total number of tables created do not exceed the specified number in the configuration file
