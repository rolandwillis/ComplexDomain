---
title: JobSearch_Stream_Main_01
timestamp: 2016-11-23T20:55:34.103785391Z
---
Hi
* greeting

< Before we start, what name do you go by?
* prompt/first_name

[Roland](first_name)
* provide/first_name

< Hello [Roland](first_name), what can I do for you today?
* prompt/open

I'm currently looking for [developer](jobrole) [jobs](item_type) at the moment
* request/item

< Let me try and find something near to you? Where do you live [Roland](first_name)?
* prompt/job_location

I'm staying in [Luton](location) at the moment
* provide/job_location

< Good news! I found some [developer](jobrole) jobs in and around [Luton](location). Take a look [Roland](first_name).
* supply/jobsearch_results

Thanks
* thanks

< My pleasure. Good luck and come back any time :)
* goodbye
