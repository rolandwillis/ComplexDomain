---
title: Payslip_Stream_01
timestamp: 2016-11-23T20:55:34.103785391Z
---

hi
* greeting

< Hi there, what can I do for you?
* prompt/open

I need a [payslip](item_type)
* request/item

< i'll need your employee number please.
* prompt/employee_number

It is [1233](employee_number) I think
* provide/employee_number

< Which week do you want the payslip for?
* prompt/payslip_week

[13/07/2006](payslip_week)
* provide/payslip_week

< OK. Here is your payslip for Employee number [A34234](employee_number) for weekending [13/07/2006](payslip_week)
* supply/payslip

Thanks
* thanks

< Goodbye
* goodbye/final
