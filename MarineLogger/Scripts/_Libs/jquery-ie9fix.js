define(['jquery'],function ($) {
	// add ajax transport method for cross domain requests when using IE9
	if ('XDomainRequest' in window && window.XDomainRequest !== null) {
		$.ajaxTransport("+*", function (options, originalOptions, jqXHR) {
			// verify if we need to do a cross domain request
			// if not return so we don't break same domain requests
			if (typeof options.crossDomain === 'undefined' || !options.crossDomain) {
				return;
			}

			var xdr;

			return {
				send: function (headers, completeCallback) {
					// Use Microsoft XDR
					xdr = new XDomainRequest();
					xdr.open(options.type, options.url); // NOTE: make sure protocols are the same otherwise this will fail silently
					xdr.onload = function () {
						if (this.contentType.match(/\/xml/)) {
							var dom = new ActiveXObject("Microsoft.XMLDOM");
							dom.async = false;
							dom.loadXML(this.responseText);
							completeCallback(200, "success", [dom]);
						} else {
							completeCallback(200, "success", [this.responseText]);
						}
					};

					xdr.onprogress = function () { };

					xdr.ontimeout = function () {
						completeCallback(408, "error", ["The request timed out."]);
					};

					xdr.onerror = function () {
						completeCallback(404, "error", ["The requested resource could not be found."]);
					};

					xdr.send();
				},
				abort: function () {
					if (xdr) xdr.abort();
				}
			};
		});
	}
	
});
