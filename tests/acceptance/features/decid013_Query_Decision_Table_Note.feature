@ChangeDecisionTableNameFeature
Feature: Query Note of a Decision Table

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the note associated with an existing decision table
So that I can properly display it in my applications

Acceptance Tests

Scenario Outline: Query a decision table note Normal Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> with note <dec_note>
When I query the note of the Decision Table
Then the returned note should match <dec_note>
And I receive an error code as <dec_response_code> for querying a note

Examples:

| dec_name       | dec_note           | dec_response_code | Comment             |
| "RobSab01"       | "NoteRS01"       | 200               | valid name and note |
| "RobSab02"       | "NoteRS02"       | 200               | valid name and note |
| "RobSab03"       | ""               | 200               | empty note          |
| "决定05"         | "Note决定05"      | 200               | simplified Chinese  |
| "décider08"      | "Notedécider08"     | 200               | French              |
| "решить09"       | "Noteрешить09"      | 200               | Russian             |
| "αποφασίζω10"    | "Noteαποφασίζω10"   | 200               | Greek               |
| "döntsd el11"    | "Notedöntsd el11"   | 200               | Hungarian           |
| "निर्णय करना12"     |   "Noteनिर्णय करना12 "  | 200               | Hindi               |
| "決定する13"      | "Note決定する13"      | 200               | Japanese           |
