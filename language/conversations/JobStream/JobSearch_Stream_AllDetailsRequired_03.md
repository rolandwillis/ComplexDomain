---
title: JobSearch_Stream_Main_01
timestamp: 2016-11-23T20:55:34.103785391Z
---
Is anyone there?
* greeting

< Hi there, what can I do for you?
* prompt/open

I want a [job](item_type)
* request/item

< Okeydoke, to narrow it down a bit, can you tell me where you live?
* prompt/job_location

I'm living in [Luton](location) at the moment
* provide/job_location

< What type of role you are interested in?
* prompt/job_role

I want a [senior java dev](jobrole) job.
* provide/job_role

< OK. i found some [senior java dev](jobrole) jobs in and around [Luton](location) 
* supply/jobsearch_results

Thanks
* thanks

< No worries. Good luck and come back any time :)
* goodbye
