Feature: Change Decision Table Name Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to change the name of an existing decision table
So that I can better reflect their content

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Change a decision table (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for updating
When I change the name of Decision Table to <new_dec_name>
Then I receive the new name matching <new_dec_name>
And I receive an error code as <dec_response_code> for name change

Examples:

| dec_name       | new_dec_name      | dec_tag | dec_response_code | Comment             |
| "RobSab01"       | "NewRobSab01"       | "dt_1"   | 201               | valid new name      |
| "RobSab02"       |       ""        | "dt_2"   | 400               | empty new name      |
| "决定05."         | "New决定05"         | "dt_3"   | 201               | simplified Chinese   |         
| "décider08"      | "Notedécider08"     | "dt_4"   | 201               | French              |
| "قرر06"          | "Noteقرر06"         | "dt_5"   | 201               | Arabic              |
| "تصميم گرفتن07" | "Noteتصميم گرفتن07"| "dt_6"     | 201               | Farsi               |
| "решить09"       | "Noteрешить09"      | "dt_7"   | 201               | Russian             |
| "αποφασίζω10"    | "Noteαποφασίζω10"   | "dt_8"   | 201               | Greek               |
| "döntsd el11"    | "Notedöntsd el11"   | "dt_9"   | 201               | Hungarian           |
| "निर्णय करना12"      | "Noteनिर्णय करना12"   |    "dt_10"| 201               | Hindi               |
| "決定する13"       | "Note決定する13"     | "dt_11"   | 201               | Japanese           |