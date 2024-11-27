# TicketMaster Bot

**Update:** 
The code in this repository is >7 years old and no longer works on the new TicketMaster.
The new ticketmaster uses a 3rd party vendor called QueueIt for its queue system. Normally 15mins before an event sale starts the users are put into a large pool of queueing users. (after completing some background QueueIt challenges)
At the time of the sale, users are then allocated a random position in the queue before being allowed in to purchase tickets.

Any technically minded people that are interested in talking through new projects or ideas can contact me on Telegram @spikersloan
Please don't contact me asking if I have an updated bot, I'm only interested in discussing technical information on the mechanisms for either the Queue or carting functionalties.


**Important:** 
This bot is for educational and personal use.  
Under no circumstances do I recommend buying tickets with the purpose of selling for profit.  
The author of these scripts takes no responsibility for any misuse associated with them.

Note: This bot is designed to only work with Ticketmaster's new website. (i.e. url starts with 'www1.ticketmaster.')
It will attempt to add the default number of lowest price tickets to the cart. You can then finish the purchase as normal.
You can change the number of tickets by modifying the numberOfTickets variable in the script. (Instructions to follow)


**Instructions**

1) You need to install Greasemonkey/Tampermonkey first:
* Chrome: http://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
* Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/?src=ss  

2) After you have installed the extension then simply click this link to install the script.
[![Install TicketMaster Bot](https://github.com/spikeruk/TicketmasterBot/blob/master/resources/install.png)](https://github.com/spikeruk/TicketmasterBot/raw/master/ticketmasterbot.user.js)


3) Navigate to a 'www1.ticketmaster.' ticket page shortly before the tickets are due to go on sale.
The bot will automatically refresh regularly if the tickets aren't yet on sale.  

<br>
Tip: Test it out on a page were tickets are already on sale. <br>
Tip: Run multiple tabs (But be careful!!!, too many requests and you risk getting blocked by Ticketmaster)

