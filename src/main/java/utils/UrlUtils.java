package utils;


import models.Subscriber;
import org.apache.http.client.utils.URIBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URISyntaxException;

public class UrlUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(UrlUtils.class);

    public static String getUrl(String url, Subscriber subscriber) {
        try {
            URIBuilder uriBuilder = new URIBuilder(url);
            return addParameters(uriBuilder, subscriber).build().toString();
        } catch (URISyntaxException e) {
            LOGGER.info(e.getMessage());
            return "";
        }
    }

    private static URIBuilder addParameters(URIBuilder uri, Subscriber subscriber) {
        addParameter(uri,"msisdn", subscriber.getMsisdn());
        addParameter(uri,"mcc", subscriber.getMcc());
        addParameter(uri,"mnc", subscriber.getMnc());
        addParameter(uri,"X-Source-Ip", subscriber.getIp());
        return uri;
    }

    private static URIBuilder addParameter(URIBuilder uri, String name, String value) {
        if (value != null && !value.isEmpty()) {
            return uri.addParameter(name, value);
        }
        else {
            return uri;
        }
    }
}
