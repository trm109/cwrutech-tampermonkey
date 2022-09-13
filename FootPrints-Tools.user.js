// ==UserScript==
// @name         Tool for automating FootPrints workflow.
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Adds automation features for CWRU UTech Receiptionists.
// @author       trm109
// @match        https://cdi-its-servicedesk.com/MRcgi/MRTicketPage.pl*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require file:///home/saik/Documents/Repos/FootPrints-TamperMonkey/FootPrints-Tools.user.js
// ==/UserScript==



debug = true;

(
    function() {
        'use strict';
        //Options should be:
        //Dropoff
        //Pickup
        //IB
        //Leave alone.
        alert('TamperMonkey instance runnning!')

        var getTicketStatusOptions = function() {
            var status = document.querySelectorAll(
                'select#status[class="ticketField"]'
            )[0];
            var output = status.options;
            if(debug){console.log(output);}
            return output;
        }
        var getTicketStatus = function() {
            var status = document.querySelectorAll(
                'select#status[class="ticketField"]'
            )[0];
            var output = status.selectedIndex;
            if(debug){console.log(output);}
            return output;
        }
        //Usage; setTicketStatus(3);
        var setTicketStatus = function(statusId) {
            var x = statusId
            //0 = assigned
            //1 = acknowledged
            //2 = pending customer
            //3 = customer responded
            //4 = pending vendor
            //5 = pending approval
            //6 = resolved.
            var status = document.querySelectorAll(
                'select#status[class="ticketField"]'
            )[0].selectedIndex = x;
        }
        //




        //List all workspaces
        var getWorkspaces = function() {
            var workspaces = document.querySelectorAll(
                'select#pmember'
            )[0];
            var output = workspaces
            if(debug){console.log(output)}
            return output;
            
        }
        //assigneeWidgets[0].setField(0) means add selected workspace.
        //assigneeWidgets[0].setField(1) means remove selected workspace
        var setWorkspace = function() {
            var x = "UTech__bCARE__bCenter"
            var workspaces = document.querySelectorAll(
                'select#pmember'    
            )[0];
            
        }
        var getSelectedWorkspace = function() {

            var options = assigneeWidgets[0].box1.options;
            console.log("[DEBUG] Finding selected options...")
            for(var i =0; i < options.length; i++){
                if(options[i].selected == true){
                    console.log(options[i])
                }
            }
            
        }
        //adds workspace to assignees.
        var addWorkspace = function(assigneeName) {
            console.log("[DEBUG] Attempting to add workspace...")
            var options = assigneeWidgets[0].box1.options;
            //Clear already selected options
            for( var i = 0; i < options.length; i++){
                if(options[i].selected == true){
                    options[i].selected = false
                }
            }
            options = assigneeWidgets[0].box1.options;
            //Find the correct box and expand
            for(var i = 0; i < options.length; i++){
                if((options[i].value == assigneeName)){
                    //console.log("[DEBUG] 1 Found option that matches")
                    options[i].selected = true
                    assigneeWidgets[0].collapseExpand()
                    break;
                }
            }
            setTimeout(() => {
                
            }, 1000);
            console.log("[DEBUG] options length: " + options.length)
            //Then set new options.
            options = assigneeWidgets[0].box1.options;
            for(var j = 0; j < options.length; j++){
                if(options[j].value == assigneeName){
                    //console.log("[DEBUG] 2 Option has same assigneeName");
                    if((options[j].className == "member") ){
                        console.log("[DEBUG] 3 Option has valid className");
                        options[j].selected = true;
                        break;
                    }else{
                        //console.log("[DEBUG] 3 Option has className: " + options[j].className + ", which is not equal to member");
                    }
                    //console.log("01")
                }else{
                    //console.log("[DEBUG] " + j + " Option value: " + options[j].value + ", which is not equal to " + assigneeName)
                }
                //console.log("02")
            }
            //console.log("03")
            //then apply the seleced workspaces.
            assigneeWidgets[0].setField(0);
        }
        var removeWorkspaces = function() {
            var options = assigneeWidgets[0].box2.options;
            //setTimeout(() => {}, 1000)
            for (var k = 0; k < options.length; k++){
                console.log("index: " + k)
                assigneeWidgets[0].box2.options.selectedIndex = k
                //setTimeout(() => {}, 1000)
                assigneeWidgets[0].setField(1)
            }
            //assigneeWidgets[0].setField(1)
        }
        var run = function() {
            var currentStatus = getTicketStatus();
            console.log("[DEBUG] Using status: " + currentStatus)
            console.log("[DEBUG] Options: " + getTicketStatusOptions())
            console.log("[DEBUG] Changing status to 1")
            setTicketStatus(6);
            getWorkspaces()
            //setWorkspace()
            //setTimeout(() => {}, 1000)
            removeWorkspaces()
            //setTimeout(() => {}, 2000)
            //addWorkspace("ACTU")
            //getSelectedWorkspace()
            addWorkspace("UTech__bCARE__bCenter")
            console.log("[DEBUG] completed running.")
        }
        
        setTimeout(run,3000);
    }
)();