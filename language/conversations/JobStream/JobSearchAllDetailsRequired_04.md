---
title: JobSearchAllDetailsRequired_04
timestamp: 2016-11-24T20:25:30.183069772Z
---

hi
* greeting

< Before we start, what name do you go by?
* prompt/first_name

[Roland](first_name)
* provide/first_name

< How can I be of assistance today [Roland](first_name)?
* prompt/open

im looking for a [job](item_type)
* request/item

< Ok, to start with I will need your current location.
* prompt/job_location

[London](location)
* provide/job_location

< That's great. Now I need to know what type of job you are looking for?
* prompt/job_role

i want an [senior developer](jobrole) [role](item_type)
* provide/job_role

< OK. Here are some results in [London](location) for [senior](jobrole) jobs
* supply/jobsearch_results

thanks
* thanks

< Goodbye
* goodbye/final
