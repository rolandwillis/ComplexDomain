---
title: JobSearch_Stream_Main_01
timestamp: 2016-11-23T20:55:34.103785391Z
---
hello
* greeting

< Before we start, what name do you go by?
* prompt/first_name

[Roland](first_name)
* provide/first_name

< Well hello there [Roland](first_name), how can I help?
* prompt/open

I am looking for a [job](item_type)
* request/item

< Okeydoke [Roland](first_name), to narrow it down a bit, can you tell me where you live?
* prompt/job_location

[Luton](location)
* provide/job_location

< What type of role you are interested in [Roland](first_name)?
* prompt/job_role

I am currently a [senior java dev](jobrole)
* provide/job_role

< OK [Roland](first_name), Here are some results for [senior java dev](jobrole) roles in and around [Luton](location) 
* supply/jobsearch_results

Thanks
* thanks

< No worries :)
* goodbye
