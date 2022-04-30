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
 And I have created decision table named <dec_name> for updating action
 And I have added an action of type <old_action_type> named <old_action_name> with <old_value_list> to decision table
 When I change the action named <old_action_name> to type <new_action_type> with <new_value_list> in decision table
 And I change an action of name <old_action_name> to name <new_action_name> for action with type <new_action_type> and values <new_value_list> in decision table
 Then I receive new name matching <new_action_name>
 And I recieve new type matching <new_action_type>
 And I receive a success code <action_response_code> for change action

 Examples:
 | dec_name   | dec_tag |  old_action_type |  old_value_list    | old_action_name    | new_action_type   | new_value_list | new_action_name    |  action_response_code | Comment                       |
 | "RobSab01" | "dt_1"  |      "boolean"   |  "A!,!B"           | "boolean_action_1" |      "text"       |  "string_value"| "text_action_1"    |          200          | change boolean to text + name |
 | "RobSab02" | "dt_2"  |      "text"      |  "old_string_val"  | "text_action_2"    |     "boolean"     |   "A!,!B"      | "boolean_action_2" |          200          | change text to boolean + name |
 | "RobSab03" | "dt_3"  |      "numeric"   |       "50"         | "num_action_3"     |     "boolean"     |   "A!,!B"      | "boolean_action_3" |          200          | change num to boolean + name  |
 | "RobSab04" | "dt_4"  |      "numeric"   |       "50"         | "num_action_4"     |     "text"         |   "text_value" | "text_action_2"   |          200          | change num to text + name     |
 | "RobSab05" | "dt_5"  |      "numeric"   |       "50"         | "num_action_4"     |     "numeric"      |   "50"         | "new_name"        |          200          | changing just the name        |
 | "RobSab06" | "dt_6"  |      "numeric"   |       "50"         | "num_action_4"     |     "numeric"      |   "50"         | "决定05"           |          200          | change name to Chinese        |
 | "RobSab07" | "dt_7"  |      "numeric"   |       "50"         | "num_action_4"     |     "text"      |   "决定05"      | "决定105"         |          200          | change action val to Chinese  |
 | "RobSab08" | "dt_8"  |      "boolean"   |    "A!,!B"         | "bool_act_8"       |     "boolean"     |   "C!,!D"       | "bool_act_8"      |          200          | change just bool action val   |




