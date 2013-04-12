jQuery TextareaCounter
======================

.. image:: https://travis-ci.org/LeadSift/jquery-textareaCounter.png
   :target: https://travis-ci.org/LeadSift/jquery-textareaCounter

Forked from http://roy-jin.appspot.com/jsp/textareaCounter.jsp 


Config Options
--------------

+-------------------+-----------------------------------------------------------+
| Options           | Description                                               |
+-------------------+-----------------------------------------------------------+ 
| maxCharacterSize  | Define the maximum number of characters. Default is -1.   |
|                   | Limit characters only when maxCharacterSize > 0           |
|                   | default: -1                                               |
+-------------------+-----------------------------------------------------------+ 
| truncate          | Truncate the chars if maxCharachterSize exceeded          |
|                   | default: true                                             |
+-------------------+-----------------------------------------------------------+ 
| originalStyle     | Set original class style                                  |
|                   | default: 'originalTextareaInfo'                           |
+-------------------+-----------------------------------------------------------+ 
| warningStyle      | Set warning class style                                   |
|                   | If number of characters of user input is over the warning |
|                   | default: 'warningTextareaInfo'                            |
+-------------------+-----------------------------------------------------------+ 
| errorStyle        | Set error class style, triggers if truncate is false      |
|                   | and there are more than max chars in the text area        |
|                   | default: 'errorTextareaInfo'                              |
+-------------------+-----------------------------------------------------------+ 
| warningNumber     | char remaining before warningStyle is applied             |
|                   | default: 20                                               |
+-------------------+-----------------------------------------------------------+ 
| displayFormat     | keywords: #input, #max, #left, #words.                    |
|                   |                                                           |
|                   | * #input: current number of input chars                   |
|                   | * #max: represents your predefined max                    |
|                   | * #left: #max - #input                                    |
|                   | * #words: represents your current number of words         |
|                   |                                                           |
|                   | default: '#input characters and #words words', note:      |
|                   | #max and #left does work only when maxCharacterSize > 0   |
+-------------------+-----------------------------------------------------------+ 

Display Callback
----------------

You may pass a callback as follows to display custom information::

    $('#testTextarea3').textareaCount(options3, function(data){   
        var result = 'Characters Input: ' + data.input + '<br />';   
        result += 'Words Input: ' + data.words + '<br />';   
        result += 'Left Characters: ' + data.left + '<br />';   
        result += 'Characters Limitation: ' + data.max + '<br />';   
        $('#textareaCallBack').html(result);   
    });   

You can pass user defined function as an argument after options.  
Function data is an object, which contains four values:  

data.input
    current number of input characters 

data.max
    max character size 

data.left
    how many left characters 

data.words
    current number of input words 
