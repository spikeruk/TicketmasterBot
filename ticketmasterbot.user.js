// ==UserScript==
// @name         TicketMaster
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Fast execution of reserving tickets in cart
// @match        https://www1.ticketmaster.co.uk/*
// @match        https://www1.ticketmaster.com/*
// @match        https://www1.ticketmaster.ie/*
// @match        https://www1.ticketmaster.com.au/*
// @match        https://www.ticketmaster.com.au/*
// @match        https://ticketmaster.com.au/*
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// @grant        none
// ==/UserScript==


var refreshIntervalSeconds=5; //Set this to how often you want to check for tickets (Note: Do this too fast and TicketMaster may block your ip address)
var numberOfTickets=4; //Set this to the number of tickets you want

function SkipPopup()
{
    var popupPresent = getElementByXpath('//button[@class = "modal-dialog__button landing-modal-footer__skip-button"]');
    if(popupPresent)
    {
        try{ popupPresent.click();}catch(ex){}
    }
}

function CheckForFilterPanel(){
    var filterBar = getElementByXpath('//div[@class = "filter-bar__content"]');
    return filterBar;  
}

function ProcessFilterPanel(filterBar){
    //Click first ticket result in list
    ClickElement('(//ul/li[@class = "quick-picks__list-item"])[1]/div/div');
    
    //Change ticket quantity (if applicable)
    waitForElement('.offer-card', function() {
        
        //Change the number of tickets (if applicable);
        ChangeTicketQuantity();
        
        //Click the button to Buy the tickets (right hand panel)
        var getTicketsElement = ClickElement('//button[@id = "offer-card-buy-button"]'); 

        //Sometimes a dialog comes up if someone else beat us to the tickets.
        //This dialog gives a recommendation for a new seat selection.
        //If this occurs, we choose to accept the new seats.
        waitForElement('.button-aux, .modal-dialog__button', function() {
          var sectionChangeBuyButton = getElementByXpath('//button[@class = "button-aux modal-dialog__button"]');
          sectionChangeBuyButton.click();
        });
        

    });
}

function ChangeTicketQuantity()
{
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
}

function CheckForGeneralAdmission()
{
    var BuyButton = getElementByXpath('//button[@id = "offer-card-buy-button"]');
    return BuyButton;
}
    
function ProcessGeneralAdmission(generalAdmissionBuyButton)
{
    ChangeTicketQuantity();
    generalAdmissionBuyButton.click();  
}

function reload() {
    window.top.document.location.replace(window.top.document.location.href);
}


function ClickElement(path, time) 
{
    var element = getElementByXpath(path);
    if(element !== null) {
        if (typeof element.click != 'undefined')
        {
            element.click();
            return element;
        }
    }
}

function getElementByXpath(path) 
{
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var waitForElement = function(selector, callback) 
{
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForElement(selector, callback);
    }, 100);
  }
};

$(document).ready(function() 
{   
    var success=false;
    //This popup dialog seems to happen in the US ticketmaster website
    //We just close it down and continue as normal
    SkipPopup();
    
    //Ticket type 1
    //This occurs in the majority of ticket sales when there is a selection of ticket types
    if(!success)
    {
        var filterBar = CheckForFilterPanel();
        if(filterBar)
        {
            console.log('These tickets have a filter bar');
            success=true;
            ProcessFilterPanel(filterBar);
        }
    }
    
    //Ticket type 2
    //These tickets are General Admission and do not have assigned seating (i.e. no filter bar)
    if(!success)
    {
        var generalAdmissionBuyButton = CheckForGeneralAdmission();
        if(generalAdmissionBuyButton)
        {
            console.log('These tickets are General Admission');
            success=true;
            ProcessGeneralAdmission(generalAdmissionBuyButton);
        }
    }
    
    //TODO: Add more ticket types if found

    if(!success)
    {
        //refresh the page after an interval (Tickets weren't yet on sale)
        setTimeout(function(){reload();}, refreshIntervalSeconds * 1000); 
    }
});




