

This project only has bower dependencies so in order to get this project going locally you only have 3 steps. 

1. run  'bower install'
2. run  'bower install -g http-server'
3. run  'http-server -p 8080 -c-1 -o --cors'


The file does upload properly but the upload call and the call to get the video doesn't seem to return a promise to let me konw when the video is finished converting. 

Maybe it does but I couldn't find it.

When the code tries to load the video and if the video is not done converting, an html is returned saying 'it would be ready shortly'. I could possibly use that to set a flag and ping the endpoint on an interval till the video is ready but for now I'm just setting a timeout length based on the size of the video and hoping the conversion is done. 

When Wistia's traffic is low it's fine but with my account being a trial account with the least prioity, my converions go in to a queue when the traffic is high so the current process is not very accurate. 

In any case I think I satisfied the requirements and I hope you like it. 
