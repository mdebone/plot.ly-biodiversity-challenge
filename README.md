# plot.ly-biodiversity-challenge

Okay after 12 hours of coding and going back through the zoom videos, I got the dashboard mostly working. However, the bar chart isn't populating with data, which is weird, because the buble chart is and I thought that that would be the one which didn't work.
Also, I have the dropdown menu of all of the id's, but it doesn't switch from the default 940 when any of the others are selected. I think I need another clear function.
Also, for whatever reason, I had not noticed that the plots.js was nested inside static, which I got right, but I hadn't noticed that it was inside a 'JS' folder, but thats why the HTML didn't have the right src and I was getting 404's all afternoon.

So all that is resolved, I have an uncaught reference error that the 'optionChanged' is not defined at HTML select element on change. I didn't think that I need to change it, but I guess I clearly do.
And I have no idea why I would have an unchecked runtime error, butit says it all the same, index.html.1

Made a copy of everything that was sort of working before trying to fix everything, added that and a plotly gauge template that I will try to get working as a seperate app.js.

I don't know whats going on with the bar chart, tried different permutations with doing it straight rather than reversed, tried not the top ten but any just to get it to populate something.
Tried just loading the default, which the bubble chart is more than happy to do, but the bar chart just wont.
Nor can I get the event listener to work for the onchange event whenever a drop down item is selected. I did manage to get the gauge chart to populate a default, the different stages of washing frequency.
But I can't get the indicator to work, Ive read the w3 documentation, Ive google'd Ive gone thru youtube videos on poltly but while I get what is going on in those I can't seem to replicate it in my own.
I want to change the onchange event in the html but I am not sure if that is allowed, it makes more sense to have an on click listener, but ehh I'm sort of frustrated with this.
Need some space and to let the new info settle and I will revisit.