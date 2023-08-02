window.WebApp = {
    "initialize": function() {
    }
};
window.WebApp.NLZipCode = {
    "initialize": function() {
        
    },
    "getUrl": function(zipCode, apiKey) {
        return "https://api.overheid.io/bag?filters[postcode]="+zipCode+"&ovio-api-key="+apiKey;
    },
    "validZipCode": function(zh) {
        var re = new RegExp("[0-9]{4}[A-Z]{2}");
        if(zh.zipCode.match(re)) {
            re = new RegExp("[0-9]+");
            if(zh.houseNo.match(re)) {
                return true;
            }
        }
        return false;
    },
    "getAddressFromZipCodeHouse": function(zh, cb) {
        require(["jquery"], function($){
            var url = window.WebApp.NLZipCode.getUrl(zh.zipCode, zh.apiKey);
            $.get(url, function(data, status) {
                var addresses = data._embedded.adres;
                var i;
                var result = new Array();
                for(i=0;i<addresses.length;i++) {
                    if(addresses[i].huisnummer == zh.houseNo) {
                        if(zh.houseNoExtra!=null && zh.houseNoExtra == addresses[i].huisnummertoevoeging ) {
                            result.push(addresses[i]);
                        }
                        else if(zh.houseNoExtra==null) {
                            result.push(addresses[i]);
                        }
                    }
                }
                cb(result);
            });
        });
    }
};
window.WebApp.GoogleSignOn = {
    "createGoogleSignOn": function(params, cb) {
        require(["googleSignOn"], function() {
            var e = document.createElement("div");
            if(params.id==null) {
                e.id = "GoogleSignOn";
            }
            else {
                e.id = params.id;
            }
            cb(e);
            setTimeout(function() {
                google.accounts.id.initialize({
                  client_id: params.googleClientId,
                  callback: params.handleCredentialResponse
                });
                google.accounts.id.renderButton(e, {theme: params.theme});
                google.accounts.id.prompt();
            }, 1000);
            
        });
    }
};
if(define) {
    define("WebApp", [], function() {
        window.WebApp.initialize();
        return window.WebApp;
    });
}