class RegExp1 extends RegExp {
  [Symbol.match](str) {
    const result = RegExp.prototype[Symbol.match].call(this, str);
    if (result) {
      return result;
    }
    return [""];
  }
}
var WebAppLibs = new Object();
WebAppLibs.initialize = function() {
    var stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://cdn.jsdelivr.net/gh/MJJWalraven/Insystems_KGO@r10/css/oj-redwood-dark.css";
    document.head.appendChild(stylesheet);
    var stylesheet2 = document.createElement("link");
    stylesheet2.rel = "stylesheet";
    stylesheet2.href = "https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css";
    document.head.appendChild(stylesheet2);
    var stylesheet3 = document.createElement("link");
    stylesheet3.rel = "stylesheet";
    stylesheet3.href = "https://static.oracle.com/cdn/fnd/gallery/2210.1.0/images/iconfont/ojuxIconFont.min.css";
    document.head.appendChild(stylesheet3);
    window.guidSegment = (function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    });
    WebAppLibs.Utils = new Object();
    WebAppLibs.Utils.guid = (function() {
        var guid = "id"+(guidSegment() + guidSegment() + "-" + guidSegment() + "-4" + guidSegment().substr(0,3) + "-" + guidSegment() + "-" + guidSegment() + guidSegment() + guidSegment()).toLowerCase();
        return guid.replaceAll("-", "");
    });
    WebAppLibs.Model = new Object();
    WebAppLibs.render = function(e) {
        require(["knockout"], function(ko) {
            ko.cleanNode(e);
            var model = WebAppLibs.Model[e.guid];
            ko.applyBindings(model, e);
        });
    };
    WebAppLibs.Factory = new Object();
    WebAppLibs.Factory.createAttribute = function(n, v) {
        var a = document.createAttribute(n);
        a.value = v;
        return a;
    };
    WebAppLibs.Factory.onMutate = function(l) {
       var i;
       for(i=0;i<l.length;i++) {
         var nl = l[i].addedNodes;
         var i2;
         for(i2=0;i2<nl.length;i2++) {
            var n = nl[i2];
            if(n!=null && n.outerHTML!=null && n.outerHTML.indexOf("#f9f9f9")>-1) {
                n.outerHTML = n.outerHTML.replaceAll("#f9f9f9", "transparent");
            }
            if(n.afterAdd!=null) {
                n.afterAdd();
            }
         }
         nl = l[i].removedNodes;
         for(i2=0;i2<nl.length;i2++) {
            var n = nl[i2];
            if(n.afterRemove!=null) {
                n.afterRemove();
            }
         }
       }
    };
    WebAppLibs.md5Hash = function(str, cb) {
        require(["crypto-js"], function (CryptoJS) {
            var h = CryptoJS.MD5(str, {}).toString();
            cb(h);
        });
    };
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    WebAppLibs.mutationObserver = new MutationObserver(WebAppLibs.Factory.onMutate);
    WebAppLibs.mutationObserver.observe(document.body, { childList:true, subtree:true });
    WebAppLibs.Factory.createRichTextEditor = function(templateHTML, cb) {
        require(["ckeditor"], function(CKSource) {
            var e = document.createElement("DIV");
            e.innerHTML = templateHTML;
            var guid = WebAppLibs.Utils.guid();
            e.guid = guid;
            window.watchdog = new Object();
            window.watchdog[guid] = new CKSource.Watchdog();
            window.watchdog[guid].setCreator( ( element, config ) => {
                return CKSource.Editor
                    .create( element, config )
                    .then( editor => {
                            return editor;
                    } )
            });
            window.watchdog[guid].setDestructor( editor => {
                return editor.destroy();
            });
            window.watchdog[guid].handleError = function ( error ) {
                    console.error( 'Oops, something gone wrong!' );
                    console.error( 'Please, report the following error in the https://github.com/ckeditor/ckeditor5 with the build id and the error stack trace:' );
                    console.warn( 'Build id: cl1rxz2w7kdu-cffm3xxqgmw1' );
                    console.error( error );
            };
            window.watchdog[guid].on( 'error', window.watchdog[guid].handleError );
            e.afterAdd = function() {
                window.watchdog[guid].create( this, {
                    toolbar: {
                                    items: [
                                        '|',
                                        'heading',
                                        'fontFamily',
                                        'fontSize',
                                        'bold',
                                        'underline',
                                        'italic',
                                        'link',
                                        'bulletedList',
                                        'numberedList',
                                        'alignment',
                                        'fontColor',
                                        'subscript',
                                        'superscript',
                                        '|',
                                        'indent',
                                        'outdent',
                                        '|',
                                        'horizontalLine',
                                        'specialCharacters',
                                        'imageUpload',
                                        'blockQuote',
                                        'insertTable',
                                        'mediaEmbed',
                                        'undo',
                                        'redo',
                                        'fontBackgroundColor',
                                        'strikethrough'
                                    ]
                                },
                                language: 'en',
                                image: {
                                    toolbar: [
                                        'imageTextAlternative',
                                        'imageStyle:full',
                                        'imageStyle:side'
                                    ]
                                },
                                table: {
                                    contentToolbar: [
                                        'tableColumn',
                                        'tableRow',
                                        'mergeTableCells',
                                        'tableCellProperties',
                                        'tableProperties'
                                    ]
                                },
                                licenseKey: '',
                            } )
                            .catch( window.watchdog[guid].handleError );
            };
            cb(e);
       });
    };
    WebAppLibs.Factory.createFileUpload = function(cb) {
        var e = document.createElement('DIV');
        var fpo = document.createElement('OJ-FILE-PICKER');
        fpo.className = "oj-filepicker oj-complete";
        var guid = WebAppLibs.Utils.guid();
        WebAppLibs.Model[guid] = new Object();
        WebAppLibs.Model[guid].selectListener = function() {};
        WebAppLibs.Model[guid].invalidListener = function() {};
        WebAppLibs.Model[guid].beforeSelectListener = function() {};
        e.guid = guid;
        fpo.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("on-oj-select", "[[selectListener]]"));
        fpo.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("on-oj-invalid-select", "[[invalidListener]]"));
        fpo.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("on-oj-before-select", "[[beforeSelectListener]]"));
        fpo.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("selection-mode", "single"));
        e.appendChild(fpo);
        e.className = "oj-sm-padding-1x";
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "ojs/ojknockout", "ojs/ojfilepicker", "ojs/ojinputtext", "ojs/ojlabel", "ojs/ojcheckboxset"], function() {
                WebAppLibs.render(e);
            });
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createTree = function(renderscript, menufactory, cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.menufactory = menufactory;
        e.guid = guid;
        var tv = document.createElement("oj-tree-view");
        tv.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
        tv.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data", "[[dataProvider]]"));
        tv.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("selection-mode", "single"));
        tv.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("item.renderer", "[[KnockoutTemplateUtils.getRenderer('item_template', true);]]"));
        var tvit = document.createElement("script");
        tvit.type = "text/html";
        tvit.id = "item_template";
        tvit.innerText = renderscript.outerHTML;
        e.appendChild(tvit);
        e.loadData = function(json, keyAtts) {
            var guid = this.guid;
            var data = JSON.parse(json);
            if(WebAppLibs.Model[this.guid].data==null) {
                setTimeout(function(){e.loadData(json, keyAtts);}, 500);
            }
            else {
                require(["knockout"], function(ko) {
                    var oa = WebAppLibs.Model[guid].data;
                    oa.removeAll();
                    var i;
                    for(i=0;i<data.length;i++) {
                        WebAppLibs.Model[guid].data.push(data[i]);
                    }
                    ko.cleanNode(e);
                    ko.applyBindings(WebAppLibs.Model[guid], e);
                });
            }
        };
        
        var contextMenu = document.createElement("oj-menu");
        contextMenu.id = e.guid+"_Menu";
        contextMenu.slot = "contextMenu";
        contextMenu.className = "oj-component-initnode oj-complete oj-menu oj-component oj-menu-text-only oj-menu-dropdown oj-subtree-hidden";
        contextMenu.style = "touch-action: pan-x; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); max-height: 66px; overflow-y: scroll; top: auto; left: auto; display: none; bottom: auto; right: auto;";
        contextMenu.role = "menu";
        contextMenu.setAttribute("open-options.launcher", e.guid);
        contextMenu.setAttribute("aria-label", "Edit");
        contextMenu.setAttribute("on-oj-menu-action", "[[menuAction]]");
        contextMenu.setAttribute("on-oj-before-open", "[[menuBeforeOpen]]");
        tv.appendChild(contextMenu);
        
        e.appendChild(tv);
        WebAppLibs.Model[guid] = new Object();
        e.guid = guid;
        e.afterAdd = function() {
            require(["jquery", "knockout", "ojs/ojarraytreedataprovider", "ojs/ojknockouttemplateutils", "ojs/ojarraydataprovider", "ojs/ojbootstrap", "ojs/ojknockout", "ojs/ojtreeview", "ojs/ojmenu", "ojs/ojoption", "ojs/ojinputtext", "ojs/ojlabel", "ojs/ojcheckboxset"], function($, ko, ArrayTreeDataProvider, KnockoutTemplateUtils) {
                var itemTemplate = $("#item_template")[0];
                var Renderer = KnockoutTemplateUtils.getRenderer('item_template', true);
                WebAppLibs.Model[guid].KnockoutTemplateUtils = KnockoutTemplateUtils;
                WebAppLibs.Model[guid].renderer = Renderer;
                WebAppLibs.Model[guid].data = ko.observableArray([]);
                WebAppLibs.Model[guid].refresh = function() {
                    WebAppLibs.Model[guid].data.valueHasMutated();
                };
                var dp = new ArrayTreeDataProvider(WebAppLibs.Model[guid].data, {keyAttributes: "id"});
                WebAppLibs.Model[guid].dataProvider = dp;
                
                WebAppLibs.Model[guid].menuAction = function(event) {
                    var menu = WebAppLibs.Model[guid].menuInstance;
                    var a = event.srcElement.firstElementChild.firstElementChild;
                    var index = a.attributes["index"].value;
                    var menuOption = menu.options[index];
                    menuOption.action(event.detail.originalEvent);
                };
                WebAppLibs.Model[guid].menuBeforeOpen = function(event) {
                    var tv = event.target.parentElement;
                    var menu = event.target;
                    menu.innerHTML = "";
                    var menuInstance = e.menufactory(event.detail.originalEvent);
                    var menuOptions = menuInstance.getOptions();
                    var i;
                    for(i=0;i<menuOptions.length;i++) {
                        var menuOption = menuOptions[i];
                        var opt = document.createElement("oj-option");
                        opt.className = "oj-complete oj-menu-item";
                        opt.setAttribute("value", menuOption.name);
                        var lnk = document.createElement("a");
                        lnk.setAttribute("href", "#");
                        lnk.setAttribute("ojmenu", "opt");
                        lnk.setAttribute("role", "menuitem");
                        lnk.setAttribute("index", i);
                        var optText = document.createTextNode(menuOption.description);
                        lnk.appendChild(optText);
                        opt.appendChild(lnk);
                        menu.appendChild(opt);
                    }
                    menu.guid = e.guid;
                    WebAppLibs.render(menu);
                    WebAppLibs.Model[guid].menuInstance = menuInstance;
                };
                
                WebAppLibs.render(e);
            });
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createXmlBlock = function(cb) {
        var e = document.createElement("div");
        e.style.overflow = "scroll";
        e.style.height = "103%";
        e.style.width = "102%";
        var guid = WebAppLibs.Utils.guid();
        WebAppLibs.Model[guid] = new Object();
        e.guid = guid;
        e.afterAdd = function() {
            require(["vkbeautify", "prism"], function(hljs, vkbeautify) {
            });
        };
        e.loadXml = function(xml) {
            var code = document.createElement("CODE");
            code.className = "language-xml";
            e.innerHTML = "";
            e.appendChild(code);
            require(["vkbeautify", "prism"], function() {
                var v = new vkbeautify();
                xml = v.xml(xml);
                code.innerText = xml;
                code.style["white-space"] = "pre-wrap";
                Prism.hooks.add("before-highlight", function (env) {
                    env.code = xml;
                });
                Prism.highlightElement(code);
            });
        };
        cb(e);
    };
    WebAppLibs.Factory.createCarrousel = function(cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.guid = guid;
        WebAppLibs.Model[guid] = new Object();
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "knockout", "ojs/ojarraydataprovider", "ojs/ojpagingdataproviderview", "ojs/ojcontext", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojlistview", "ojs/ojlabel", "ojs/ojlabelvalue", "ojs/ojoption", "ojs/ojfilmstrip", "ojs/ojpagingcontrol"], function(Bootstrap, ko, ArrayDataProvider, PagingDataProviderView, Context) {
                WebAppLibs.Model[guid].pageOptions = ko.observable({"type":"dots"});
                WebAppLibs.Model[guid].pageSize = ko.observable(0);
                WebAppLibs.Model[guid].dataObjects = ko.observableArray([]);
                WebAppLibs.Model[guid].dataProvider = ko.observable(new ArrayDataProvider(WebAppLibs.Model[guid].dataObjects, {"keyAttributes": "pageId"}));
                WebAppLibs.Model[guid].pagingProvider = ko.observable(null);
                WebAppLibs.Model[guid].orientation = ko.observable("horizontal");
                WebAppLibs.Model[guid].arrowVisibility = ko.observable("auto");
                WebAppLibs.Model[guid].arrowPlacement = ko.observable("adjacent");
                WebAppLibs.Model[guid].maxItemsPerPage = ko.observable(1);
                WebAppLibs.Model[guid].pageSize = ko.observable(1);

                var fs = document.createElement("oj-film-strip");
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_FilmStrip"));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("aria-label", "[[label]]"));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("arrow-placement", "[[arrowPlacement]]"));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("arrow-visibility", "[[arrowVisibility]]"));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("orientation", "[[orientation]]"));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("max-items-per-page", "[[maxItemsPerPage]]"));
                fs.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data-oj-context", null));
                var fe = document.createElement("oj-bind-for-each");
                fe.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data", "[[dataProvider]]"));
                fe.innerHTML = atob("PHRlbXBsYXRlPjxkaXYgY2xhc3M9Im9qLXBhbmVsIG9qLXNtLW1hcmdpbi0yeCBvai1oZWxwZXItdGV4dC1hbGlnbi1jZW50ZXIgb2otdHlwb2dyYXBoeS1ib2xkIG9qLXRleHQtY29sb3ItcHJpbWFyeSI+PC9kaXY+PC90ZW1wbGF0ZT4");
                fs.appendChild(fe);
                e.appendChild(fs);
                
                var fsp = document.createElement("oj-paging-control");
                fsp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
                fsp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_PagingControl"));
                fsp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data", "[[pagingProvider]]"));
                fsp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("page-size", "[[pageSize]]"));
                fsp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("page-options", "[[pageOptions]]"));
                fsp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("page", "[[pageEvent]]"));
                e.appendChild(fsp);
                
                WebAppLibs.render(e);
            });
        };
        e.setContents = function(a, cb2) {
            if(WebAppLibs.Model[this.guid].dataObjects==null) {
                setTimeout(function(){e.setContents(a, cb2);}, 500);
            }
            else {
                WebAppLibs.Model[guid].dataObjects(a);
                e.getModel(function(carrouselModel) {
                    require(["jquery"], function($) {
                        var panels = $(".oj-panel");
                        var i;
                        var index = 0;
                        var done = false;
                        for(i=0;i<panels.length&&!done;i++) {
                            var panel = panels[i];
                            var parentElement = panel.parentElement;
                            while(parentElement!=null && parentElement.tagName!="OJ-FILM-STRIP") {
                                parentElement = parentElement.parentElement;
                            }
                            if(guid == parentElement.attributes["guid"].nodeValue) {
                                panel.innerHTML = a[index].outerHTML;
                                index++;
                            }
                        }
                        carrouselModel.pagingProvider(e.childNodes[0].getPagingModel());
                        cb2();
                    });
                });
            }
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                try {
                    cb2(WebAppLibs.Model[guid]);
                }
                catch(ex) {
                    setTimeout(function(){e.getModel(cb2);}, 500);
                }
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500);
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createTimeline = function(itemBubbleContentTemplateCode, tooltipTemplateCode, menuFactoryTimeline, cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.guid = guid;
        var tl = document.createElement("oj-timeline");
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_TimeLine"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("aria-label", "[[label]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("minor-axis.scale", "[[minorAxisScale]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("minor-axis.zoom-order", "[[minorAxisZoomOrder]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("major-axis.scale", "[[majorAxisScale]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("start", "[[startDate]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("end", "[[endDate]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("selection", "{{selectionValue}}"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("selection-mode", "[[selectionMode]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("orientation", "[[orientation]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("overview.rendered", "[[overviewRendered]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("viewport-start", "[[viewPortStart]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("viewport-end", "[[viewPortEnd]]"));
        tl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data", "[[dataProvider]]"));
        var tmp = document.createElement("template");
        tmp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "seriesTemplate"));
        tmp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data-oj-as", "series"));
        var tls = document.createElement("oj-timeline-series");
        tls.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("label","[[series.id]]"));
        tls.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("empty-text","[[emptyText]]"));
        tmp.innerHTML = (tls.outerHTML);
        var tmp2 = document.createElement("template");
        tmp2.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "itemTemplate"));
        tmp2.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data-oj-as", "item"));
        var tli = document.createElement("oj-timeline-item");
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("item-type","[[itemType]]"));
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("duration-fill-color","[[item.data.fillColor]]"));
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("series-id","[[item.data.series]]"));
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("start","[[item.data.start]]"));
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("end","[[item.data.end]]"));
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("label","[[item.data.label]]"));
        tli.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("description","[[item.data.description]]"));
        tmp2.innerHTML = (tli.outerHTML);
        var tmp3 = document.createElement("template");
        tmp3.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "itemBubbleContentTemplate"));
        tmp3.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data-oj-as", "item"));
        tmp3.innerHTML = (itemBubbleContentTemplateCode.outerHTML);
        var tmp4 = document.createElement("template");
        tmp4.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "tooltipTemplate"));
        tmp4.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data-oj-as", "item"));
        tmp4.innerHTML = (tooltipTemplateCode.outerHTML);
        tl.appendChild(tmp);
        tl.appendChild(tmp2);
        tl.appendChild(tmp3);
        tl.appendChild(tmp4);
        e.appendChild(tl);
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "knockout", "ojs/ojarraydataprovider", "ojs/ojknockout", "ojs/ojtimeline"], function(Bootstrap, ko, ArrayDataProvider) {
                WebAppLibs.Model[guid] = new Object();
                WebAppLibs.Model[guid].label = ko.observable(null);
                WebAppLibs.Model[guid].minorAxisScale = ko.observable("days");
                WebAppLibs.Model[guid].minorAxisZoomOrder = ko.observableArray(['weeks','days']);
                WebAppLibs.Model[guid].majorAxisScale = ko.observable("days");
                WebAppLibs.Model[guid].startDate = ko.observable(new Date("Jan 1, 2000").toISOString());
                WebAppLibs.Model[guid].endDate = ko.observable(new Date("Mar 1, 2000").toISOString());
                WebAppLibs.Model[guid].selectionMode = ko.observable("single");
                WebAppLibs.Model[guid].selectionValue = ko.observableArray([]);
                WebAppLibs.Model[guid].orientation = ko.observable("horizontal");
                WebAppLibs.Model[guid].overviewRendered = ko.observable("on");
                WebAppLibs.Model[guid].viewPortStart = ko.observable(new Date("Jan 15, 2000").toISOString());
                WebAppLibs.Model[guid].viewPortEnd = ko.observable(new Date("Feb 15, 2000").toISOString());
                WebAppLibs.Model[guid].itemType = ko.observable("auto");
                WebAppLibs.Model[guid].emptyText = ko.observable("No data");
                WebAppLibs.Model[guid].data = ko.observableArray([]);
                WebAppLibs.Model[guid].dataProvider = new ArrayDataProvider(WebAppLibs.Model[guid].data);
                WebAppLibs.render(e);
            });
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        e.loadIcs = function(ics, keyAtts, series, params, cb ) {
            ics = ics.replaceAll("\r", "");
            var lines = ics.split("\n");
            var o2 = null;
            var objectType = null;
            var objects = new Array();
            var i;
            for(i=0;i<lines.length;i++) {
                if(lines[i].indexOf("BEGIN")==0) {
                    objectType = lines[i].split(":")[1];
                    o2 = new Object();
                }
                else if(lines[i].indexOf("END")==0) {
                    var oNew = new Object();
                    oNew[objectType] = o2;
                    if(oNew[objectType]["RRULE"]==null) {
                        if(params==null || params.ignorePast==null || params.ignorePast==false) {
                            objects.push(oNew);
                        }
                        else if(params!=null && params.ignorePast!=null && params.ignorePast==true && oNew[objectType]["DTSTART"] > new Date()) {
                            objects.push(oNew);
                        }
                    }
                    else {
                        var events = [];
                        var startDate = oNew[objectType]["DTSTART"];
                        var freq = oNew[objectType]["RRULE"].match(new RegExp1('FREQ\=[A-Z]+'))[0].split("=")[1];
                        var endDateSeries = oNew[objectType]["RRULE"].match(new RegExp1('UNTIL\=[0-9]+T[0-9]+'))[0].split("=")[1];
                        var endDate = oNew[objectType]["DTEND"];
                        if(endDateSeries!=null && endDateSeries!="") {
                            endDateSeries = endDateSeries.substring(0,4)+"-"+endDateSeries.substring(4,6)+"-"+endDateSeries.substring(6,8)+endDateSeries.substring(8,11)+":"+endDateSeries.substring(11,13)+":"+endDateSeries.substring(13,15)+"Z";
                            endDateSeries = new Date(endDateSeries);
                        }
                        var interval = parseInt(oNew[objectType]["RRULE"].match(new RegExp1('INTERVAL\=[0-9]+'))[0].split("=")[1]);
                        var dayIndex = [
                            "SU",
                            "MO",
                            "TU",
                            "WE",
                            "TH",
                            "FR"
                        ];
                        var byMinute = null;
                        try {
                            byMinute = oNew[objectType]["RRULE"].match(new RegExp1('BYMINUTE\=[0-9]+'))[0].split("=")[1].split(",");
                        }
                        catch(ex) {
                        }
                        if(byMinute==null) {
                            if(startDate!=null) {
                                byMinute = [startDate.getMinutes()];
                            }
                            else {
                                byMinute = [0];
                            }
                        }
                        var byHour = null;
                        try {
                            byHour = oNew[objectType]["RRULE"].match(new RegExp1('BYHOUR\=[0-9]+'))[0].split("=")[1].split(",");
                        }
                        catch(ex) {
                        }
                        if(byHour==null) {
                            if(startDate!=null) {
                                byHour = [startDate.getHours()];
                            }
                            else {
                                byHour = [0];
                            }
                        }
                        var byDay = null;
                        try {
                            byDay = oNew[objectType]["RRULE"].match(new RegExp1('BYDAY\=([\-]?[0-9]{0,2}[A-Z]+[,]?)+'))[0].split("=")[1].split(",");
                        }
                        catch(ex) {
                        }
                        if(byDay==null) {
                            if(startDate!=null) {
                                byDay = [dayIndex[startDate.getDay()]];
                            }
                            else {
                                byDay = ["SU"];
                            }
                        }
                        var i2;
                        for(i2=0;i2<byDay.length;i2++) {
                            if(byDay[i2].length>2) {
                                byDay[i2] = byDay[i2].substring(byDay[i2].length-2, byDay[i2].length);
                            }
                        }
                        var byMonth = null;
                        try {
                            byMonth = oNew[objectType]["RRULE"].match(new RegExp1('BYMONTH\=[0-9]+'))[0].split("=")[1].split(",");
                        }
                        catch(ex) {
                        }
                        if(byMonth==null) {
                            if(startDate!=null) {
                                byMonth = [startDate.getMonth()];
                            }
                            else {
                                byMonth = [0];
                            }
                        }
                        for(i2=0;i2<byDay.length;i2++) {
                            var i3;
                            for(i3=0;i3<dayIndex.length;i3++) {
                                if(dayIndex[i3]==byDay[i2]) {
                                    break;
                                }
                            }
                            byDay[i2] = i3;
                        }
                        var occurance = new Array(512);
                        for(i2=0;i2<occurance.length;i2++) {
                            occurance[i2] = 0;
                        }
                        for(i2=0;i2<(365*24*60*4)&&startDate!=null&&endDate!=null;i2++) {
                            var currDate = new Date(startDate);
                            var currEndDate = new Date(endDate);
                            var frq = currDate.getMinutes();
                            if(freq=="DAILY") {
                                frq = currDate.getHours();
                            }
                            else if(freq=="WEEKLY") {
                                frq = currDate.getDay();
                            }
                            currDate.setMinutes(startDate.getMinutes()+i2);
                            currEndDate.setMinutes(endDate.getMinutes()+i2);
                            if(currDate > endDateSeries) {
                                break;
                            }
                            
                            if(byDay.includes(currDate.getDay()) && byHour.includes(currDate.getHours()) && byMinute.includes(currDate.getMinutes())) {
                                if(occurance[frq]%interval==0) {
                                    var oNewCopy = JSON.parse(JSON.stringify(oNew));
                                    oNewCopy[objectType]["DTSTART"] = currDate;
                                    oNewCopy[objectType]["DTEND"] = currEndDate;
                                    oNewCopy[objectType]["RRULE"] = null;
                                    oNewCopy[objectType]["DEBUG"] = "GENERATED";
                                    if(params==null || params.ignorePast==null || params.ignorePast==false) {
                                        events.push(oNewCopy);
                                    }
                                    else if(params!=null && params.ignorePast!=null && params.ignorePast==true && oNewCopy[objectType]["DTSTART"] > new Date()) {
                                        events.push(oNewCopy);
                                    }
                                }
                                occurance[frq]++;
                            }
                        }
                        for(i2=0;i2<events.length;i2++) {
                            objects.push(events[i2]);
                        }
                    }
                }
                else {
                    var attrName = lines[i].split(":")[0];
                    var attr2Name = null;
                    try {
                        attr2Name = attrName.split(";")[1].split("=")[0];
                    }
                    catch(ex) {}
                    var attr2Value = null;
                    try {
                        attr2Value = attrName.split(";")[1].split("=")[1];
                    }
                    catch(ex) {}
                    attrName = attrName.split(";")[0];
                    if(attr2Name!=null && attr2Value!=null) {
                        o2[attrName+"."+attr2Name] = attr2Value;
                    }
                    var attrValue = lines[i].split(":")[1];
                    o2[attrName] = attrValue;
                    if(attrValue!=null) {
                        try {
                            o2[attrName] = new Date(attrValue);
                            if(isNaN(o2[attrName])||"Invalid Date"==o2[attrName].toString()) {
                                o2[attrName] = new Date(attrValue.substring(0,4)+"-"+attrValue.substring(4,6)+"-"+attrValue.substring(6,8)+attrValue.substring(8,11)+":"+attrValue.substring(11,13)+":"+attrValue.substring(13,15));
                                if(isNaN(o2[attrName])||"Invalid Date"==o2[attrName].toString()) {
                                    o2[attrName] = attrValue;
                                }
                            }
                        }
                        catch(ex) {
                            o2[attrName] = newDate(attrValue.substring(0,4)+"-"+attrValue.substring(4,6)+"-"+attrValue.substring(6,8)+attrValue.substring(8,11)+":"+attrValue.substring(11,13)+":"+attrValue.substring(13,15));
                            if(isNaN(o2[attrName])||"Invalid Date"==o2[attrName].toString()) {
                                o2[attrName] = attrValue;
                            }
                        }
                        try {
                            if(o2[attrName] instanceof String) {
                                o2[attrName] = parseFloat(attrValue);
                                if(isNaN(o2[attrName])) {
                                    o2[attrName] = attrValue;
                                }
                            }
                        }
                        catch(ex) {
                        }
                        try {
                            if(o2[attrName] instanceof String) {
                                o2[attrName] = parseInt(attrValue);
                                if(isNaN(o2[attrName])) {
                                    o2[attrName] = attrValue;
                                }
                            }
                        }
                        catch(ex) {
                        }
                    }
                }
            }
            var events = [];
            for(i=0;i<objects.length;i++) {
                try {
                    var object = objects[i];
                    if(object["VEVENT"]!=null) {
                        var eventObject = JSON.parse(JSON.stringify(object["VEVENT"]));
                        eventObject.start = eventObject["DTSTART"];
                        eventObject.end = eventObject["DTEND"];
                        eventObject.series = series;
                        eventObject.label = eventObject["SUMMARY"];
                        eventObject.description = eventObject["SUMMARY"];
                        eventObject.fillColor = "MediumAquaMarine";
                        try {
                            if(eventObject["DEBUG"]!=null) {
                                var dateStart = new Date(eventObject["DTSTART"]);
                            }
                        }
                        catch(ex) {
                        }
                        events.push(eventObject);
                    }
                }
                catch(ex) {
                    console.log(ex);
                    console.log(JSON.stringify(object));
                }
            }
            cb(events);
        };
        e.loadData = function(json, keyAtts) {
            var guid = this.guid;
            var data = JSON.parse(json);
            if(WebAppLibs.Model[this.guid].data==null) {
                setTimeout(function(){e.loadData(json, keyAtts);}, 500);
            }
            else {
                var oa = WebAppLibs.Model[guid].data;
                oa.removeAll();
                var i;
                for(i=0;i<data.length;i++) {
                    WebAppLibs.Model[guid].data.push(data[i]);
                }
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createDropdown = function(keyAttributes, cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.guid = guid;
        var dd = document.createElement("oj-select-single");
        dd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
        dd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_Dropdown"));
        dd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("label-hint", "[[labelHint]]"));
        dd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("label-edge", "[[labelEdge]]"));
        dd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("value", "{{value}}"));
        dd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data", "[[dataProvider]]"));
        e.appendChild(dd);
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "knockout","ojs/ojarraydataprovider", "ojs/ojlabelvalue", "ojs/ojoption", "ojs/ojselectsingle"], function(Bootstrap, ko, ArrayDataProvider){
                WebAppLibs.Model[guid] = new Object();
                WebAppLibs.Model[guid].labelHint = ko.observable("hint");
                WebAppLibs.Model[guid].labelEdge = ko.observable("inside");
                WebAppLibs.Model[guid].value = ko.observable("John Doe");
                WebAppLibs.Model[guid].data = ko.observableArray([{"name":"John Doe","value":"John Doe","label":"John Doe"},{"name":"Jane Doe","value":"Jane Doe","label":"Jane Doe"}]);
                WebAppLibs.Model[guid].dataProvider = new ArrayDataProvider(WebAppLibs.Model[guid].data, {
                    "keyAttributes": keyAttributes
                });
                WebAppLibs.render(e);
            });
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createDrawer = function(cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.guid = guid;
        var dl = document.createElement("oj-drawer-layout");
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_Drawer"));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("bottom-display", "{{bottomDisplay}}"));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("bottom-opened", "{{bottomOpened}}"));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("end-display", "{{endDisplay}}"));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("end-opened", "{{endOpened}}"));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("start-display", "{{startDisplay}}"));
        dl.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("start-opened", "{{startOpened}}"));
        var dlBottom = document.createElement("div");
        dlBottom.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "bottom"));
        dlBottom.innerHTML = "<div id=\""+guid+"_DrawerBottom\"><h2>BottomDrawer</h2></div>";
        var dlEnd = document.createElement("div");
        dlEnd.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "end"));
        dlEnd.innerHTML = "<div id=\""+guid+"_DrawerEnd\"><h2>EndDrawer</h2></div>";
        var dlStart = document.createElement("div");
        dlStart.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "start"));
        dlStart.innerHTML = "<div id=\""+guid+"_DrawerStart\"><h2>StartDrawer</h2></div>";
        var dlMain = document.createElement("div");
        dlMain.innerHTML = "<div id=\""+guid+"_DrawerControls\"><oj-button display={{toggleStartDisplay}} onclick=\"return false;\" >Toggle Start</oj-button><oj-button display={{toggleEndDisplay}} onclick=\"return false;\">Toggle End</oj-button><oj-button display={{toggleBottomDisplay}} onclick=\"return false;\">Toggle Bottom</oj-button></div><div id=\""+guid+"_DrawerMainContent\"><h2>MainContents</h2></div>";
        dl.appendChild(dlMain);
        dl.appendChild(dlBottom);
        dl.appendChild(dlEnd);
        dl.appendChild(dlStart);
        e.appendChild(dl);
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "knockout","ojs/ojformlayout","ojs/ojdrawerlayout", "ojs/ojnavigationlist", "ojs/ojbutton"], function(Bootstrap, ko){
                WebAppLibs.Model[guid] = new Object();
                WebAppLibs.Model[guid].startToggle = function() {
                    var currentState = WebAppLibs.Model[guid].startOpened();
                    WebAppLibs.Model[guid].startOpened(!currentState);
                };
                WebAppLibs.Model[guid].bottomToggle = function() {
                    var currentState = WebAppLibs.Model[guid].bottomOpened();
                    WebAppLibs.Model[guid].bottomOpened(!currentState);
                };
                WebAppLibs.Model[guid].endToggle = function() {
                    var currentState = WebAppLibs.Model[guid].endOpened();
                    WebAppLibs.Model[guid].endOpened(!currentState);
                };
                WebAppLibs.Model[guid].bottomDisplay = ko.observable("auto");
                WebAppLibs.Model[guid].endDisplay = ko.observable("auto");
                WebAppLibs.Model[guid].startDisplay = ko.observable("auto");
                WebAppLibs.Model[guid].bottomOpened = ko.observable(true);
                WebAppLibs.Model[guid].endOpened = ko.observable(true);
                WebAppLibs.Model[guid].startOpened = ko.observable(true);
                WebAppLibs.Model[guid].toggleBottomDisplay = ko.observable("all");
                WebAppLibs.Model[guid].toggleEndDisplay = ko.observable("all");
                WebAppLibs.Model[guid].toggleStartDisplay = ko.observable("all");
                document.getElementById(guid+"_DrawerControls").childNodes[2].addEventListener("ojAction", WebAppLibs.Model[guid].bottomToggle);
                document.getElementById(guid+"_DrawerControls").childNodes[1].addEventListener("ojAction", WebAppLibs.Model[guid].endToggle);
                document.getElementById(guid+"_DrawerControls").childNodes[0].addEventListener("ojAction", WebAppLibs.Model[guid].startToggle);
                
                WebAppLibs.render(e);
            });
            WebAppLibs.render(e);
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createDatePicker = function(cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.guid = guid;
        var dp = document.createElement("oj-date-picker");
        dp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
        dp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_Drawer"));
        dp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("date-picker", "[[datePicker]]"));
        e.appendChild(dp);
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "knockout","ojs/ojdatetimepicker"], function(Bootstrap, ko){
                WebAppLibs.Model[guid] = new Object();
                WebAppLibs.Model[guid].datePicker = ko.observable({"weekDisplay":"number"});
                WebAppLibs.Model[guid].value = ko.observable(null);
                WebAppLibs.render(e);
            });
            WebAppLibs.render(e);
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        cb(e);
    };
    WebAppLibs.Factory.createChart = function(tooltipTemplateCode, menuFactoryChart, cb) {
        var guid = WebAppLibs.Utils.guid();
        var e = document.createElement("div");
        e.guid = guid;
        var ch = document.createElement("oj-chart");
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("guid", guid));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("id", guid+"_Drawer"));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("type", "[[type]]"));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data", "[[dataProvider]]"));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("animation-on-display", "auto"));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("animation-on-data-chage", "auto"));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("orientation", "[[orientation]]"));
        ch.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("hover-behavior", "dim"));
        var tmp = document.createElement("template");
        tmp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("slot", "itemTemplate"));
        tmp.attributes.setNamedItem(WebAppLibs.Factory.createAttribute("data-oj-as", "item"));
        tmp.innerHTML = atob("PG9qLWNoYXJ0LWl0ZW0gdmFsdWU9IltbaXRlbS5kYXRhLnlWYWx1ZV1dIiBncm91cC1pZD0iW1sgW2l0ZW0uZGF0YS54VmFsdWVdIF1dIiBzZXJpZXMtaWQ9IltbaXRlbS5kYXRhLnNlcmllc11dIj48L29qLWNoYXJ0LWl0ZW0+");
        ch.appendChild(tmp);
        e.appendChild(ch);
        e.afterAdd = function() {
            require(["ojs/ojbootstrap", "knockout", "ojs/ojarraydataprovider", "ojs/ojchart"], function(Bootstrap, ko, ArrayDataProvider){
                WebAppLibs.Model[guid] = new Object();
                WebAppLibs.Model[guid].data = ko.observableArray([]);
                WebAppLibs.Model[guid].dataProvider = new ArrayDataProvider(WebAppLibs.Model[guid].data);
                WebAppLibs.Model[guid].type = ko.observable("line");
                WebAppLibs.Model[guid].orientation = ko.observable("vertical");
                WebAppLibs.Model[guid].value = ko.observable(null);
                WebAppLibs.render(e);
            });
            WebAppLibs.render(e);
        };
        e.getModel = function(cb2) {
            if(WebAppLibs.Model[guid]!=null) {
                cb2(WebAppLibs.Model[guid]);
            }
            else {
                setTimeout(function(){e.getModel(cb2);}, 500)
            }
        };
        cb(e);
    };
};
if(define) {
    define("WebAppLibs", [], function() {
      WebAppLibs.initialize();
      return WebAppLibs;
    });
}
