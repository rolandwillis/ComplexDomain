---
title: Payslip_Stream_01
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

I want to check my [payslip](item_type) please
* request/item

< Ok  [Roland](first_name), let me know your employee number and I'll see what I can do :)
* prompt/employee_number

It is [1233](employee_number)
* provide/employee_number

< Which week do you want the payslip for [Roland](first_name)?
* prompt/payslip_week

[13/07/2006](payslip_week)
* provide/payslip_week

< OK [Roland](first_name). Here is your payslip for Employee number [A34234](employee_number) for weekending [13/07/2006](payslip_week)
* supply/payslip

Thanks
* thanks

< Goodbye
* goodbye/final
