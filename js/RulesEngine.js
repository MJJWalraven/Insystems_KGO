if(window.rulesengine==null) {
    window.rulesengine = {
        "url": null,
        "urlParameters": null,
        "initialize": function() {
            window.guidSegment = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
        },
        "generateRulesFromElements": function(elements) {
            var rules = [];
            var iElements;
            for(iElements=0;iElements<elements.length;iElements++) {
                var rulesToAdd = elements[iElements].rules;
                var iRulesToAdd;
                for(iRulesToAdd=0;iRulesToAdd<rulesToAdd.length;iRulesToAdd++) {
                    rulesToAdd[iRulesToAdd].element = elements[iElements];
                    rulesToAdd[iRulesToAdd].parameter = elements[iElements].id;
                    rules.push(rulesToAdd[iRulesToAdd]);
                }
            }
            return rules;
        },
        "input": {
                 "InputRuleName": "Input1",
                    "Parameters": {}
                 },
        "elements":[],
        "generate_guid": function() {
            var guid = (guidSegment() + guidSegment() + "-" + guidSegment() + "-4" + guidSegment().substr(0,3) + "-" + guidSegment() + "-" + guidSegment() + guidSegment() + guidSegment()).toLowerCase();
            return guid;
        },
        "run": function(elements, cb) {
            try {
                var rules = window.rulesengine.generateRulesFromElements(elements);
                var inputArray = rules;
                var i;
                var workflow = {
                    "WorkflowName": "Example1",
                    "Rules": []
                };
                var sequence = [];
                for(iArray=0;iArray<inputArray.length;iArray++) {
                    var rule = inputArray[iArray];
                    var guid = window.rulesengine.generate_guid();
                    var builtExpression = "Input1."+rule.parameter+"Valid";
                    if(rule.expression!=null) {
                          builtExpression += " AND "+rule.expression;
                    }
                    if(sequence[rule.parameter]==null) {
                        sequence[rule.parameter] = 10;
                    }
                    workflow.Rules.push({
                        "RuleName": rule.parameter+"-"+guid,
                        "ErrorMessage": rule.errorMessage,
                        "ErrorType": "Error",
                        "SuccessEvent": ""+sequence[rule.parameter],
                        "Expression": builtExpression
                    });
                    sequence[rule.parameter] = sequence[rule.parameter] + 10;
                    window.rulesengine.input.Parameters[rule.parameter] = rule.element.getValue();
                    if(rule.element.rules==null) {
                        rule.element.rules = [];
                    }
                    rule.element.isValid = function() {
                        var result = true;
                        this.errorMessages = [];
                        var value = this.getValue();
                        var iRules;
                        for(iRules=0;iRules<this.rules.length;iRules++) {
                            var format = this.rules[iRules].format;
                            try {
                                if(value==null && !"".match(format)) {
                                    result = false;
                                    this.errorMessages.push(this.rules[iRules].errorMessage);
                                }
                                if(!value.match(format)) {
                                    result = false;
                                    this.errorMessages.push(this.rules[iRules].errorMessage);
                                }
                            }
                            catch(ex) {
                                console.log(ex);
                            }
                        }
                        return result;
                    };
                    window.rulesengine.input.Parameters[rule.parameter+"Valid"] = rule.element.isValid();
                }
                require(["jquery"], function($) {
                    if(window.rulesengine.url==null) {
                        cb(null);
                    }
                    if(window.rulesengine.urlParameters==null) {
                        cb(null);
                    }
                    var params = {};
                    params = JSON.stringify([JSON.stringify(workflow), JSON.stringify(window.rulesengine.input)]);
                    if(window.rulesengine.url.startsWith("data:")) {
                        params = {};
                    }
                    window.rulesengine.elements = elements;
                    $.post(window.rulesengine.url, params, function(data, status) {
                        if(data instanceof Array) {
                            if(data.length==0) {
                                cb({"result":"OK","invalidParameter":null,"errorMessage":null});
                                return;
                            }
                            var iData = 0;
                            var data2 = data[iData];
                            for(iData=0;iData<data.length;iData++) {
                                if(data[iData].IsSuccess==false) {
                                    data2 = data[iData];
                                    var errorMessage = data[iData].Rule.ErrorMessage;
                                    var iElement;
                                    for(iElement=0;iElement<window.rulesengine.elements.length;iElement++) {
                                        var element = window.rulesengine.elements[iElement];
                                        var iErrorMessage;
                                        for(iErrorMessage=0;iErrorMessage<element.errorMessages.length;iErrorMessage++) {
                                            if(element.errorMessages[iErrorMessage]==errorMessage) {
                                                data2 = data[iData];
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    break;
                                }
                            }
                            if(data2.IsSuccess==false) {
                                var key = data2.Rule.RuleName;
                                key = key.substring(0, key.length-37);
                                var eInput = null;
                                var iElement;
                                for(iElement=0;iElement<elements.length;iElement++) {
                                    if(elements[iElement].id == key) {
                                        eInput = elements[iElement];
                                        break;
                                    }
                                }
                                var eFeedback = document.createElement("span");
                                eFeedback.id = key+"Feedback";
                                eFeedback.style="color:red";
                                eFeedback.innerText = data2.Rule.ErrorMessage;
                                if(eInput.errorMessages!=null && eInput.errorMessages.length>0) {
                                    eFeedback.innerText = eInput.errorMessages[0];
                                }
                                var eSubmit = document.createElement("input");
                                eSubmit.type = "button";
                                eSubmit.value = "Submit";
                                eSubmit.id = key+"Submit";
                                eSubmit.callback = cb;
                                eSubmit.elements = elements;
                                eSubmit.onclick = function() {
                                    var eSubmit = this;
                                    require(["jquery"], function($) {
                                        var eInput = $("#"+eSubmit.id.replace("Submit", ""))[0];
                                        window.rulesengine.input.Parameters[eInput.id] = eInput.getValue();
                                        window.rulesengine.input.Parameters[eInput.id+"Valid"] = eInput.isValid();
                                        window.rulesengine.run(eSubmit.elements, eSubmit.callback);
                                    });
                                };
                                window.rulesengine.elementsResponse = {
                                    "input": eInput,
                                    "feedback":eFeedback,
                                    "submit":eSubmit
                                };
                                cb({
                                    "result":"NOK","invalidParameter":data2.Rule.RuleName,"errorMessage":data2.Rule.ErrorMessage
                                });
                                return;
                            }
                            else {
                                cb({"result":"OK","invalidParameter":null,"errorMessage":null});
                                return;
                            }
                        }
                        cb({"result":"OK","invalidParameter":null,"errorMessage":null});
                        return;
                    });
                });
            }
            catch(ex) {
                console.log(ex);
            }
        },
        "getElementsFromResult": function() {
            return window.rulesengine.elementsResponse;
        },
        "submit": function() {
            if(window.rulesengine.elementsResponse!=null && window.rulesengine.elementsResponse.submit !=null) {
                window.rulesengine.elementsResponse.submit.onclick();
            }
        }
    };
}
define("RulesEngine", [], function() {
    window.rulesengine.initialize();
    return window.rulesengine;
});