//demo application values
var msisdn;
var clientID;
var clientName;
var clientSecret;
var discoveryURL;
var redirectURL;
var xRedirect;
var includeRequestIP;

var apiVersion = '';
var parametersURL = '/api/mobileconnect/get_parameters';
var discoveryUrl = '/api/mobileconnect/start_discovery';
var endpointsURL = '/api/mobileconnect/endpoints';
var authenticationUrl = '/api/mobileconnect/start_authentication';
var authorizationUrl = '/api/mobileconnect/start_authorization';
var userInfoUrl = '/api/mobileconnect/user_info';
var identityUrl = '/api/mobileconnect/identity';
var manualDiscoveryUrl = '/api/mobileconnect/start_manual_discovery';
var noProviderMetadataUrl = '/api/mobileconnect/start_manual_discovery_no_metadata';
var authorizationR1 = '/api/mobileconnect/start_authentication_r1';
var inputval = ''
function openRequestOptionsMenu() {
    if ($('#requestOptionsMore').css('visibility') === 'hidden') {
        $("#requestOptionsMore").css({"visibility": "visible"})
    } else {
        $("#requestOptionsMore").css({"visibility": "hidden"})
    }
}

function openRequestParametersMenu() {
    if ($('#requestParameters').css('visibility') === 'hidden') {
        $('#requestParameters').css({"visibility": "visible"})
    } else {
        $('#requestParameters').css({"visibility": "hidden"})
    }
}

var getRequestParameters = function getRequestParameters() {
    clientID = $("#clientID").val();
    clientName = $("#clientName").val();
    clientSecret = $("#clientSecret").val();
    discoveryURL = $("#discoveryURL").val();
    redirectURL = $("#redirectURL").val();
    xRedirect = $("#xRedirect").val();
    includeRequestIP = $("#includeRequestIP").val();

    var queryString = '?clientID=' + encodeURIComponent(clientID) +
        '&clientSecret=' + encodeURIComponent(clientSecret) +
        '&clientName=' + encodeURIComponent(clientName) +
        '&discoveryURL=' + encodeURIComponent(discoveryURL) +
        '&redirectURL=' + encodeURIComponent(redirectURL) +
        '&xRedirect=' + encodeURIComponent($('input[name=xRedirect]:checked').val() ? 'True' : 'False') +
        '&includeRequestIP=' + encodeURIComponent($('input[name=includeRequestIP]:checked').val() ? 'True' : 'False')  +
        '&scope=' + 'openid mc_' + $('input[name=authType]:checked').val() +
        encodeURIComponent(getPermissionsRequested()) + '&apiVersion=' + apiVersion;

    $.get(parametersURL + queryString, function (data) {
        var input = $('#msisdn');
        var msisdn = '';
        if ($('#msisdn-toogle').is(':checked')) {
            msisdn = input.val();
        }
        else if ($('#msisdnwd-toogle').is(':checked')) {
            msisdn = input.val();
        }
        api.discovery(msisdn);
    });

};

var getRequestParametersWithoutDiscovery = function getRequestParametersWithoutDiscovery() {
    var input = $('#clientName');
    var clientName = '';
    var providerMetadata = false;
    if ($('#metadataURL').is(":visible")) {
        clientName = input.val();
        providerMetadata = true;
    }
    var clientId = $('#clientIDWD').val();
    var clientSecret = $('#clientSecretWD').val();
    var subId = $('#subscriberID').val();

    //endpoints
    var auth = $('#authURL').val();
    var token = $('#tokenURL').val();
    var userInfo = $('#userInfoURL').val();
    var metadata = $('#metadataURL').val();
    var discovery = $("#discoveryURLWD").val();
    var redirect = $("#redirectURLWD").val();

    var queryString = '?';
    queryString += 'authURL=' + auth + '&tokenURL=' + token + '&userInfoURl=' + userInfo +
        '&discoveryURL=' + discovery + '&redirectURL=' + redirect;

    if (providerMetadata) {
        queryString += '&metadata=' + metadata;
    }
    $.get(endpointsURL + queryString, function (data) {
        api.manualDiscovery(subId, clientId, clientName, clientSecret, providerMetadata);
    });

};





function start() {
    refre
    getApiVersion();
    hide('.error')
    show('#redirect-url');
    hide('#logged-in');
    hide('#user-info-button');
    hide('#identity-button');
    hide('#user-info');
    hide('#identity');
    $("#information").hide("slow", function () {
        $("#redirect-url").show("slow");
    });

    getRequestParameters: getRequestParameters();
}

function startAuthz() {
    hide('.error')
    show('#redirect-url');
    hide('#logged-in');
    $("#information").hide("slow");
    $("#information").hide("slow", function () {
        $("#redirect-url").show("slow");
    });

    getRequestParametersWithoutDiscovery: getRequestParametersWithoutDiscovery();
}

var openWindow = function openWindow(url) {
    $('#redirect-url').attr('src', url);
};

var hide = function hide(selector) {
    var el = $(selector);
    el.addClass('hidden');
    return el;
};

var show = function show(selector) {
    var el = $(selector);
    el.removeClass('hidden');
    return el;
};

var setContent = function setContent(selector, content) {
    var el = $(selector);
    el.html(content);
    return el;
};

var generateParams = function generateParams(params) {
    var query = '';
    var first = true;
    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            query = query + (first ? '' : '&') + key + '=' + params[key];
            first = false;
        }
    }

    return query;
};

var getPermissionsRequested = function getPermissionsRequested() {
    var scope = '';
    $('.permissions-check input').each(function (i, el) {
        var $el = $(el);
        if ($el.prop('checked')) {
            scope = scope + ' ' + $el.attr('data-scope');
        }
    });
    return scope;
};



var clearAttempt = function clearAttempt() {
    api.currentAttempt = {};
    closeChildWindow();
};

var closeChildWindow = function closeChildWindow() {
    if (window.child) {
        window.child.close();
    }
};

var hideLogin = function hideLogin() {
    hide('#redirect-url');
    hide('#pre-login');
    show('#logged-in');
    if ($('#value-access-token').text() !== undefined) {
        show('#user-info-button')
        show('#identity-button')
    }
};

var printTokenInfo = function printTokenInfo(token) {
    $('#value-access-token').html(token.access_token);
    $('#value-id-token').html(token.id_token);
    $('#value-time-received').html(token.time_received);
};

var printInfo = function printInfo(response) {
    $('#value-application-name').html(api.currentAttempt.clientName);
    printTokenInfo(response.token);
    if (response.tokenValidated) {
        $('#value-token-validated').html("Token Validated");
    } else {
        $('#value-token-validated').html("Token Not Validated");
    }
    if (response.identity) {
        setContent('#value-identity-prefetched', JSON.stringify(response.identity, null, 2));
    }
};

var printTokenInfo = function printTokenInfo(token) {
    show('#token-table');
    show('#value-access-token');
    show('#value-id-token');
    show('#value-time-received');
    hide('.error');
    $('#value-access-token').html(token.access_token);
    $('#value-id-token').html(token.id_token);
    $('#value-time-received').html(token.time_received);
};

var printInfo = function printInfo(response) {
    show('#value-application-name');
    $('#value-application-name').html(api.currentAttempt.applicationShortName);
    printTokenInfo(response.token);
    if (response.identity) {
        setContent('#value-identity-prefetched', JSON.stringify(response.identity, null, 2));
    }
};
var newSDKSession = "";

window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted ||
        ( typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
        window.location.reload();
    }
});

var api = {
    demoapp: true,
    currentAttempt: {},
    httpCallback: function handleResponse(data) {
        console.log(data);
        if (data["status"] === 'failure') {
            api.error(data);
            $("#redirect-url").hide();
//            $('#information').html(data.description);
            $("#error").show("slow");
//            $("#information").show("slow");
//            $("#information").show("slow", function () {
//                    $("#redirect-url").hide("slow");
//            });

        }
        api[data.action](data);
    },
    httpCallbackTest: function handleResponse(data) {
    },
    urls: function sendUrls(authURL, tokenURL, userInfoURL, metadataURL, discoveryURL, redirectURL, providerMetadata) {
        var queryString = '?';
        queryString += 'authURL=' + authURL + '&tokenURL=' + tokenURL + '&userInfoURl=' + userInfoURL +
            '&discoveryURL=' + discoveryURL + '&redirectURL=' + redirectURL;

        if (providerMetadata) {
            queryString += '&metadata=' + metadataURL;
        }
        $.get(endpointsURL + queryString, api.httpCallback);
    },
    parameters: function sendParameters(clientID, clientSecret, discoveryURL, redirectURL, xRedirect, includeRequestIP) {
        var queryString = '?';
        queryString = 'clientID=' + clientID + '&clientSecret=' + clientSecret + '&discoveryURL=' +
            discoveryURL + '&redirectURL=' + redirectURL + '&xRedirect=' + xRedirect + 'includeRequestIP=' + includeRequestIP;

        $.get(parametersURL + queryString);
    },
    manualDiscovery: function discovery(subId, clientId, clientName, clientSecret, providerMetadata) {
        var queryString = '?';

        if (typeof subId === "string") {
            queryString += ('subId=' + encodeURIComponent(subId) + "&");
        }

        if (typeof clientId === "string") {
            queryString += ('clientId=' + encodeURIComponent(clientId) + "&");
        }

        if (typeof clientName === "string" && providerMetadata) {
            queryString += ('clientName=' + encodeURIComponent(clientName) + "&");
        }

        if (typeof clientSecret === "string") {
            queryString += ('clientSecret=' + encodeURIComponent(clientSecret) + "&");
        }

        if (providerMetadata) {
            $.get(manualDiscoveryUrl + queryString, api.httpCallback);
        }
        else {
            $.get(noProviderMetadataUrl + queryString, api.httpCallback);
        }
    },
    discovery: function discovery(response) {
        var queryString = '';

        if (typeof response === "string") {
            queryString += '?msisdn=' + encodeURIComponent(response);
        }

        $.get(discoveryUrl + queryString, api.httpCallback);
    },

    discovery: function discovery(msisdnIndian, mcc, mnc) {
        var queryString = '';

        if (typeof msisdnIndian !== undefined) {
            queryString += '?msisdn=' + encodeURIComponent(msisdnIndian);

        } else if (mcc !== undefined && mcc !== undefined) {
            queryString += '&mcc=' + encodeURIComponent(mcc);
            queryString += '&mnc=' + encodeURIComponent(mnc);
        }

        $.get(discoveryUrl + queryString, api.httpCallback);
    },


    handle_redirect: function handle_redirect(url) {
        var queryString = '&' + generateParams({
                expectedState: api.currentAttempt.expectedState,
                expectedNonce: api.currentAttempt.expectedNonce,
                sdkSession: newSDKSession
            });

        $.get(url + queryString, api.httpCallback);
    },

    request_user_info: function request_user_info() {
        var queryString = '?' + generateParams({
                sdkSession: newSDKSession,
                accessToken: api.currentAttempt.token.access_token,
            });

        $.get(userInfoUrl + queryString, api.httpCallback);
    },

    request_identity: function request_identity() {
        var queryString = '?' + generateParams({
                sdkSession: newSDKSession,
                accessToken: api.currentAttempt.token.access_token,
            });

        $.get(identityUrl + queryString, api.httpCallback);
    },
    identity: function identity(response) {
        setContent('#value-identity', JSON.stringify(response.identity, null, 2));
        show('#identity');
    },
    error: function error(response) {
            clearAttempt();

            $('.error').html(response.description);
            show('.error');
    }
};


$(document).ready(function ($) {
    $.getJSON("data/defaultData.json", function (data) {
        $('#msisdn').val(data["msisdn"]);


    });

    $.getJSON("data/defaultDataWD.json", function (data) {
        $('#clientIDWD').val(data["clientID"]);
        $('#clientSecretWD').val(data["clientSecret"]);
        $('#subscriberID').val(data["subscriberID"]);
        $('#clientName').val(data["clientName"]);
        $('#authURL').val(data["authorizationURL"]);
        $('#tokenURL').val(data["tokenURL"]);
        $('#userInfoURL').val(data["userInfoURL"]);
        $('#metadataURL').val(data["metadataURL"]);
        $('#discoveryURLWD').val(data["discoveryURL"]);
        $('#redirectURLWD').val(data["redirectURL"]);

    });



    $('#msisdn-toogle').change(function () {
        if ($(this).is(':checked')) {
            $("#msisdn").show('slow');
            $("#mcc").hide('slow');
            $("#mnc").hide('slow');
        } else {
            $("#msisdn").hide('slow');
            $("#msisdn").value = "";
        }
    });

    $('#msisdnwd-toogle').change(function () {
        if ($(this).is(':checked')) {
            $("#msisdnwd").show('slow');
        } else {
            $("#msisdnwd").hide('slow');
            $("#msisdnwd").value = "";
        }
    });

    $('#mcc-mnc-toogle').change(function () {
        if ($(this).is(':checked')) {
            $("#msisdn").hide('slow');
            $("#mcc").show('slow');
            $("#mnc").show('slow');
        } else {
            $("#mcc").hide('slow');
            $("#mnc").hide('slow');
            $("#mcc").value = "";
            $("#mnc").value = "";
        }
    });

    $('#none-toogle').change(function () {
            if ($(this).is(':checked')) {
                    $("#msisdn").hide('slow');
                    $("#mcc").hide('slow');
                    $("#mnc").hide('slow');
                }
            });
    $('#ip-toogle').change(function () {
        if ($(this).is(':checked')) {
            $("#ip").show('slow');
        } else {
            $("#ip").hide('slow');
            $("#ip").value = "";
        }
    });




    $('#with-metadata').change(function () {
        if ($(this).is(':checked')) {
            api.providerMetadata = true;
            $("#clientName").show("slow");
            $("#clientNameText").show("slow");
            $("#textMetadata").show("slow");
            $("#metadataURL").show("slow");
        } else {
            $("#clientName").hide("slow");
            $("#clientNameText").hide("slow");
            $("#metadataURL").hide("slow");
            $("#textMetadata").hide("slow");
        }
    });

    $('#user-info-button').click(function () {
        api.request_user_info();
    });

    $('#identity-button').click(function () {
        api.request_identity();
    });

    $(function () {
        enableUserInfo();
        $(".identity-info").click(enableUserInfo);
    });

    $(function () {
        enableIdentity();
        $(".user-info").click(enableIdentity);
    });



    function enableUserInfo() {
        if (this.checked) {
            $(".user-info").attr("disabled", true);
        } else {
            $(".user-info").removeAttr("disabled");
        }
    }

    function enableIdentity() {
        if (this.checked) {
            $(".identity-info").attr("disabled", true);
        } else {
            $(".identity-info").removeAttr("disabled");
        }
    }
});

function getApiVersion() {
    apiVersion = $('#api').find('option:selected').val();
};