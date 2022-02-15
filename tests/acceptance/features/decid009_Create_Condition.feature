@CreateConditionFeature
Feature: Create Condition Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to create a new condition in a decision table
So that I can add conditions to my decision table accordingly

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Create a condition (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I create a condition in table identified as <dec_tag> named <con_name> with type <con_type> and values <con_vals>
Then a condition with a non-null id is created
And the condition named <con_name> with type <con_type> and values <con_vals> is created
And I receive an error code as <con_response_code> for condition creation

Examples:

| dec_name       | dec_note          | dec_tag | con_name   | con_type   | con_vals                         | con_response_code | Comment             |
| "RobSab01"     | "NoteRS01"        | "dt_1"  | "Region"   | "text"     | "Domestic,International"         | 200               | valid condition     |
| "RobSab02"     | "NoteRS01"        | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       | 200               | valid condition     |
| "RobSab03"     | "NoteRS01"        | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          | 200               | valid condition     |

Scenario Outline: Invalid attributes for condition (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I create a condition in table identified as <dec_tag> named <con_name> with type <con_type> and values <con_vals>
Then I receive an error code as <con_response_code> for condition creation
And I receive an error message as <err_msg> for condition creation

Examples:

| dec_name       | dec_note          | dec_tag | con_name   | con_type      | con_vals                         |  err_msg                                                | con_response_code | Comment |
| "RobSab01"     | "NoteRS01"        | "dt_4"  | "Region"   | "random"      | "Domestic,International"         |  "Inavlid type. Must be one of: boolean, text, numeric" | 404               | invalid type |
| "RobSab01"     | "NoteRS01"        | "dt_5"  | "Region"   | "boolean"     | "Domestic,International,Local"   |  "Invalid values for specified type"                    | 404               | incorrect number of values for type boolean |

Scenario Outline: Create a condition when no table exists (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
When I create a condition in table identified as <dec_tag> named <con_name> with type <con_type> and values <con_vals>
Then I receive an error code as <con_response_code> for condition creation
And I receive an error message as <err_msg> for condition creation

Examples:

| dec_name       | dec_note          | dec_tag | con_name   | con_type   | con_vals                         | err_msg                                                       | con_response_code | Comment |
| "RobSab01"     | "NoteRS01"        | "dt_X"  | "Region"   | "text"     | "Domestic,International"         |  "No table with matching Id exists, adding condition failed"  | 404               | creating a condition in a non-existent table  |
