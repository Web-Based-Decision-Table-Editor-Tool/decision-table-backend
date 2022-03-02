@ChangeActionFeature
 Feature: Change Action in Decision Table Story

 As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
 I want to change an action in a decision table
 So that I can modify existing action within decision tables

 Acceptance Tests

 ##
 ## Note:
 ##
 ## The Step definitions are expected to manage a look up table 
 ## which associates the string dec_tag with a decision table identifier from the
 ## Decision_Table_Cloud_Sevices 
 ##

 Scenario Outline: Change an action within a decision table (Normal Flow)

 Given I am connected to the Decision_Table_Editor_Cloud_Services
 And I have created decision table named <dec_name> identified as <dec_tag>
 And I have added an action of type <old_action_type> named <old_action_name> with <old_value_list> to decision table with id <dec_tag> 
 When I change an action of type <old_action_type> to type <new_action_type> with <new_value_list>
 And I change an action of name <old_action_name> to name <new_action_name> 
 Then I receive new name matching <new_action_name>
 And I recieve new type matching <new_action_type>
 And I recieve new value list matching <new_value_list>
 And I receive a success code <action_response_code>

 Examples:
 | dec_name   | dec_tag |  old_action_type |  old_value_list    | old_action_name    | new_action_type   | new_value_list | new_action_name    |  action_response_code |
 | "RobSab01" | "dt_1"  |      "boolean"   |  "A,B"             | "boolean_action_1" |      text         |  "string_value"| "text_action_1"    |          200          |
 | "RobSab02" | "dt_2"  |      "text"      |  "old_string_val"  | "text_action_2"    |     boolean       |   ["A", "B"]   | "boolean_action_2" |          200          | 

