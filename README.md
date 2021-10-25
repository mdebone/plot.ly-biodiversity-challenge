# plot.ly-biodiversity-challenge

Okay after 12 hours of coding and going back through the zoom videos, I got the dashboard mostly working. However, the bar chart isn't populating with data, which is weird, because the buble chart is and I thought that that would be the one which didn't work.
Also, I have the dropdown menu of all of the id's, but it doesn't switch from the default 940 when any of the others are selected. I think I need another clear function.
Also, for whatever reason, I had not noticed that the plots.js was nested inside static, which I got right, but I hadn't noticed that it was inside a 'JS' folder, but thats why the HTML didn't have the right src and I was getting 404's all afternoon.

So all that is resolved, I have an uncaught reference error that the 'optionChanged' is not defined at HTML select element on change. I didn't think that I need to change it, but I guess I clearly do.
And I have no idea why I would have an unchecked runtime error, butit says it all the same, index.html.1

Made a copy of everything that was sort of working before trying to fix everything, added that and a plotly gauge template that I will try to get working as a seperate app.js