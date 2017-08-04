// ==UserScript==
// @name         TicketMaster
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fast execution of reserving tickets in cart
// @match        https://www1.ticketmaster.*
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// @grant        none
// ==/UserScript==


var refreshIntervalSeconds=1; //Set this to how often you want to check for tickets (Note: Do this too fast and TicketMaster may block your ip address)
var numberOfTickets=2; //Set this to the number of tickets you want

var CheckForFilterPanel = function(){
    
    var skip = getElementByXpath('//button[@class = "modal-dialog__button landing-modal-footer__skip-button"]');
    if(skip)
    {
        try{ skip.click();}catch(ex){}
    }
    
    
    var filterBar = getElementByXpath('//div[@class = "filter-bar__content"]');
    if(filterBar)
    {
        //click first ticket result in list
        ClickElement('(//ul/li[@class = "quick-picks__list-item"])[1]/div/div');
        
        waitForElement('.offer-card', function() {
            var rightPanelCurrentTicketCountElement = getElementByXpath('//div[@class = "qty-picker__number qty-picker__number--lg"]');
            var currentTicketCount = rightPanelCurrentTicketCountElement.innerText;

            var ticketQuantityDifference = numberOfTickets - currentTicketCount;
            if (ticketQuantityDifference > 0)
            {
                var ticketIncrementElement = ClickElement('//button[@class = "qty-picker__button qty-picker__button--increment qty-picker__button--lg"]');
                for (var i = 0; i < ticketQuantityDifference; i++)
                {
                    try{ticketIncrementElement.click();}catch(ex){}
                }
            }
            else if(ticketQuantityDifference < 0)
            {
                ticketQuantityDifference = Math.abs(ticketQuantityDifference);
                var ticketDecrementElement = ClickElement('//button[@class = "qty-picker__button qty-picker__button--decrement qty-picker__button--lg"]');
                for (var i = 0; i < ticketQuantityDifference; i++)
                {
                    try{ticketDecrementElement.click();}catch(ex){}
                }
            }
            
             var getTicketsElement = ClickElement('//button[@id = "offer-card-buy-button"]'); 
        });       
    }
    else
    {
        setTimeout(function(){ 
            reload();
        }, refreshIntervalSeconds * 1000);  
        
    }
};

function reload() {
    window.top.document.location.replace(window.top.document.location.href);
}


$(document).ready(function() {
    CheckForFilterPanel();
});



function ClickElement(path, time) {
    var element = getElementByXpath(path);
        if(element !== null) {
            if (typeof element.click != 'undefined')
            {
                element.click();
                return element;
            }
        }
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var waitForElement = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForElement(selector, callback);
    }, 100);
  }
};



