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

I'm looking for [jobs](item_type) near [Luton](location)
* request/item

< Ok. What kind of job role are you looking for [Roland](first_name)?
* prompt/job_role

[developer](jobrole) jobs preferably
* provide/job_role

< I found some [developer](jobrole) jobs in and around [Luton](location). Take a look [Roland](first_name).
* supply/jobsearch_results

Thanks
* thanks

< My pleasure. Good luck and come back any time :)
* goodbye
