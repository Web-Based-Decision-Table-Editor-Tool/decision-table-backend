Feature: Change Condition Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to change the conditions of an existing decision table
So that I can update rules I need to alter.

Acceptance Tests


Scenario Outline: Change a condition (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
And I have created a condition named <con_name> with type <con_type> and values <con_vals> for this table
When I change the condition <con_name> with id <con_id> to condition <new_con_name> with type <new_con_type> and values <new_con_vals> 
Then I receive the new name matching <new_con_name> 
And I receive an error code as <con_response_code> for condition change

Examples:

| dec_name       | dec_note          | dec_tag |con_id   | con_name   | con_type   | con_vals                         | new_con_name   | new _con_type   | new_con_vals                         | con_response_code | Comment             |
| "RobSab01"     | "NoteRS01"        | "dt_1"  |"cn_1"   | "Region"   | "text"     | "Domestic,International"         | "Region"	   |"text"	         |"International"			            | 200               | same name, same type|
| "RobSab01"     | "NoteRS01"        | "dt_1"  |"cn_2"   | "Ship"     | "boolean"  | "Go,No Go"                       | "Shipping"     |"boolean"        |"ship, no ship"			            | 200               | same type		      |
| "RobSab03"     | "NoteRS01"        | "dt_3"  |"cn_3"   | "Weight"   | "numeric"  | "<0,2>"                          | "Weight"       | "numeric"       | "<0,2>"                      	    | 200               | no change           |

Scenario Outline: Invalid attributes for condition (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
And I have created a condition named <con_name> with type <con_type> and values <con_vals> for this table
When I change the condition <con_name> with type <con_type> and values <con_vals> to condition <new_con_name> with type <new_con_type> and values <new_con_vals> 
Then I receive the new name matching <new_con_name> 
And I receive an error code as <con_response_code> and a message <dec_msg> for condition change

Examples:

| dec_name       | dec_note          | dec_tag | con_name   | con_type   | con_vals                         | new_con_name   | new_con_type   | new_con_vals                         | con_response_code | <dec_msg>             			    	                 |
| "RobSab01"     | "NoteRS01"        | "dt_1"  | "Region"   | "text"	 | "Domestic,International"         | "Region"	     |"random"	       |"International"			              | 404 		      | "Inavlid type. Must be one of: boolean, text, numeric"   |
| "RobSab01"     | "NoteRS01"        | "dt_1"  | "Ship"     | "boolean"  | "Go,No Go"                       | "Ship"         |"boolean"        |"ship, no ship, maybe ship"	          | 200               | "Invalid values for specified type"	 	    	         |

