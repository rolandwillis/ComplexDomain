---
title: JobSearch_Stream_Main_01
timestamp: 2016-11-23T20:55:34.103785391Z
---
hi
* greeting

< Before we start, what name do you go by?
* prompt/first_name

[Roland](first_name)
* provide/first_name

< Hi there [Roland](first_name), how can I help you?
* prompt/open

Im after a [job](item_type)
* request/item

< Okeydoke [Roland](first_name), let's see what I can do. To narrow the search down a bit, let's start with your home town and I'll go from there.
* prompt/job_location

I live in [London](location)
* provide/job_location

< What type of job you are looking for [Roland](first_name)?
* prompt/job_role

Im looking ideally for [Engineering](jobrole) jobs
* provide/job_role

< OK. Here are some results for [Engineering](jobrole) jobs in [London](location). Take a look [Roland](first_name)
* supply/jobsearch_results

Thanks
* thanks

< No worries :)
* goodbye
