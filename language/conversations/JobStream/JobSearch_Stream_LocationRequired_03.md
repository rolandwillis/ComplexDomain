---
title: JobSearch_Stream_Main_01
timestamp: 2016-11-23T20:55:34.103785391Z
---
Hiya
* greeting

< Before we start, what name do you go by?
* prompt/first_name

[Roland](first_name)
* provide/first_name

< Hello there [Roland](first_name) :) What's up?
* prompt/open

I'm looking for [developer](jobrole) [jobs](item_type) at the moment
* request/item

< Let me try and find something near to you? What area do you live in [Roland](first_name)?
* prompt/job_location

I live in [Hertfordshire](location)
* provide/job_location

< I found some [developer](jobrole) jobs in and around [Luton](location). Take a look [Roland](first_name).
* supply/jobsearch_results

Thanks
* thanks

< My pleasure. Good luck and come back any time :)
* goodbye
