# Server and vmWare vm info displayer
Once upon a time on university in the visualization lab we had the unusual problem of having more displays than stuff to put on them. And that was the trial by fire that resulted in this project.
Because this application is probably going to run on those displays to the end of time stability is key. So i chose python not because it is a good choice but because i felt like it.
Anyways this is probably where i should put a little rainbow on nondescript banners for people to ignore, and loads of gifs and images. The thing is i sort of cant be bothered. And given the primary purpos of this is displaying named and ip's like 90% of the image wold be blurred anyway. 

------------------

If someone by some bizarre reason are in the situation of having a list of 8+ servers to ping and ~100 or so vcenter vms to cheek the status on AND has no more or less than 2 displays they need to fill, well, this is your day. The config is pretty simple python 3 is used. The node querying and the one displaying vm status and ping status are started separatly. This is for ease of use when launching from a console session. I think i started the query node in a screen session and launched the displays from a Konsole profile to get the scaling right.  I use som shady tmp file setup to comunicate between nodes so killing them off is propably a non issue mabye. If everything looks out of line it is because the width of the nodes is not a factor of the window width. there is a variable named width somwhere in the display scripts that can be tweeked to fix this along with scaling.

Althog this may not be a super serious project it has at the time of writing (dec 2020) run for about 2 years 24/7 and it is still going strong.  
