@ChangeDecisionTableNameFeature
Feature: Change Decision Table Note Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to change the note associated with an existing decision table
So that I can better reflect it's contents

Acceptance Tests

Scenario Outline: Change a decision table note (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I change the note of Decision Table <dec_tag> to <new_dec_note>
Then I receive the new note matching <new_dec_note>
And I receive an error code as <dec_response_code> for note change

Examples:

| dec_name       | dec_tag | new_dec_note | dec_response_code | Comment             |
| "RobSab01"     |"dt_1"   | "new_dec_note01" | 201               | valid new name      |
| "决定05."       |"dt_3"   | "new_dec_note定05" | 201               | simplified Chinese   |         
| "décider08"    | "dt_4"   | "new_dec_notééé" | 201               | French              |
| "قرر06"        |"dt_5"   | "new_dec_note" | 201               | Arabic              |
| "تصميم گرفتن07"| "dt_6"     | "new_dec_تصميمnote" | 201               | Farsi               |
| "решить09"      |"dt_7"   | "new_dec_noteши" | 201               | Russian             |
| "αποφασίζω10"   |"dt_8"   | "new_dec_noteοφασί" | 201               | Greek               |
| "döntsd el11"   |"dt_9"   | "new_dec_notedönt" | 201               | Hungarian           |
| "निर्णय करना12"   | "dt_10"| "new_dec_noteनिर्णय करना" | 201               | Hindi               |
| "決定する13"     | "dt_11"   | "new_dec_note決定" | 201               | Japanese           |