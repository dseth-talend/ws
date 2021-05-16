Question 1
From: marissa@startup.com
Subject: Bad design
Hello,
Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.
Thanks,
Marissa

Hello Marissa,
Thank you for reaching out to me. I am sorry to hear that the new dashboard design is not providing you easy steps to clearing and deleting the indexes. Every feedback that we hear from you is valuable to us to help us improve our user experience.

Have you looked into our documentation that describes how to delete indices via API? Here is the link for your reference:
https://www.algolia.com/doc/api-reference/api-methods/delete-index/

Additionally, I will be glad to get on a call with you to understand your use case in detail so that I can offer a solution for you. Please let me know your available time slots for this week.

Best regards,
Durga



Question 2:
From: carrie@coffee.com
Subject: URGENT ISSUE WITH PRODUCTION!!!!
Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".
Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?
Please advise on how to fix this. Thanks.
Hi Carrie,
I am sorry to hear that you are going thru this issue.

Since the issue started showing up since 9:15 am, a large record must have been submitted just around that time. The quick solution is to delete that large record. You can use the following set of instructions to identify and delete the large record.

1.	Run a query that fetches records loaded between 9:00 and 9:15 am today. The timestamp shown is in unix timestamp.

index.search('query', {
  filters: 'date_timestamp: 1620828000 TO 1620828900'
}).then(({ hits }) => {
  console.log(hits);
});
Reference Link: https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/how-to/filter-by-date/#applying-a-date-filter

2.	Get the object id of the large record by investigating the result set.

3.	Delete the large record following the sample code below:
index.deleteObject('myID').then(() => {
  // done
});
Reference Link: https://www.algolia.com/doc/api-reference/api-methods/delete-objects/


Once you have performed and deleted the large record, please follow our guidelines for best practices on structuring your data as provided in this article below:
https://www.algolia.com/doc/faq/basics/is-there-a-size-limit-for-my-index-records/

Please keep in mind that Each record should contain enough information to be discoverable on its own. You don’t have to follow relational database principles, such as enriching your records with non-searchable metadata.

If anything is not clear, then please reach out to me and I will be glad to get on a call with you to resolve the issue.
Best,
Durga


Question 3:
From: marc@hotmail.com
Subject: Error on website
Hi, my website is not working and here's the error:
 
Can you fix it please?

Hi Marc,

Thanks for your email. 
The “referenceError” is caused when you call something that’s not defined in JavaScript.
One of the small mistakes that could cause the error is that you haven’t defined the function properly. You need to define the function using the function keyword:
function searchkit() {
  // your function code here
}
If you are calling the function from HTML page and you have defined the function in index.js then you need to call the function below the <script src="index.js"></script> call:
<head>
  
  <script src="index.js"></script>
  <script type="text/javascript">
    searchkit();
  </script>
</head>

If this still does not resolve the problem, then please send me the code snippets and I will be happy to take a look at it.

Best,
Durga

