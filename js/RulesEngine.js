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
                    if(window.rulesengine.input.Parameters[rule.parameter]==null) {
                        window.rulesengine.input.Parameters[rule.parameter] = null;
                    }
                    if(rule.element.rules==null) {
                        rule.element.rules = [];
                    }
                    rule.element.isValid = function() {
                        var result = true;
                        window.rulesengine.errorMessage = null;
                        var value = this.getValue();
                        var iRules;
                        for(iRules=0;iRules<this.rules.length;iRules++) {
                            var format = rules[iRules].format;
                            try {
                                if(!value.match(format)) {
                                    result = false;
                                    window.rulesengine.errorMessage = rules[iRules].errorMessage;
                                    break;
                                }
                            }
                            catch(ex) {
                                console.log(ex);
                            }
                        }
                        return result;
                    };
                    window.rulesengine.input.Parameters[rule.parameter+"Valid"] = rule.element.isValid();
                    try {
                        var iRules;
                        var found = false;
                        for(iRules=0;iRules<rules.length;iRules++) {
                            var rule2 = rules[iRules];
                            if(rule2.parameter==rule.parameter && rule2.errorMessage==rule.errorMessage && rule2.format==rule.format && rule2.expression==rule.expression) {
                                found = true;
                                break;
                            }
                        }
                    }
                    catch(ex) {
                    }
                }
                require(["jquery"], function($) {
                    if(window.rulesengine.url==null) {
                        cb(null);
                    }
                    if(window.rulesengine.urlParameters==null) {
                        cb(null);
                    }
                    var params = {};
                    params[window.rulesengine.urlParameters[0]] = JSON.stringify(workflow);
                    params[window.rulesengine.urlParameters[1]] = JSON.stringify(window.rulesengine.input);
                    if(window.rulesengine.url.startsWith("data:")) {
                        params = {};
                    }
                    $.get(window.rulesengine.url, params, function(data, status) {
                        if(data instanceof Array) {
                            if(data.length==0) {
                                cb({"result":"OK","invalidParameter":null,"errorMessage":null});
                                return;
                            }
                            var iData = 0;
                            var data2 = data[iData];
                            for(iData=0;iData<data.length;iData++) {
                                if((window.rulesengine.errorMessage==null && data[iData].IsSuccess==false) || data[iData].Rule.ErrorMessage == window.rulesengine.errorMessage) {
                                    data2 = data[iData];
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
                                        window.rulesengine.input.Parameters[eInput.id] = eInput.value;
                                        window.rulesengine.input.Parameters[eInput.id+"Valid"] = eInput.isValid();
                                        window.rulesengine.run(eSubmit.elements, eSubmit.callback);
                                    });
                                };
                                window.rulesengine.elements = {
                                    "input": eInput,
                                    "feedback":eFeedback,
                                    "submit":eSubmit
                                };
                                cb({
                                    "result":"NOK","invalidParameter":data2.Rule.RuleName,"errorMessage":data2.Rule.ErrorMessage
                                });
                            }
                            else {
                                cb({"result":"OK","invalidParameter":null,"errorMessage":null});
                                return;
                            }
                        }
                        cb({"result":"OK","invalidParameter":null,"errorMessage":null});
                    });
                });
            }
            catch(ex) {
                console.log(ex);
            }
        },
        "getElementsFromResult": function() {
            return window.rulesengine.elements;
        },
        "submit": function() {
            if(window.rulesengine.elements!=null && window.rulesengine.elements.submit !=null) {
                window.rulesengine.elements.submit.onclick();
            }
        }
    };
}
define("RulesEngine", [], function() {
    window.rulesengine.initialize();
    return window.rulesengine;
});

