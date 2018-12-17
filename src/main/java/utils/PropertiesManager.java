package utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

public class PropertiesManager {
    private Properties prop = new Properties();
    private static final Logger LOGGER = LoggerFactory.getLogger(UrlUtils.class);
    private static final String fileName = "config/config.properties";


    public PropertiesManager() {
        try {
            InputStream inputStream = new FileInputStream(parsePropertyPath(fileName));
            prop.load(inputStream);
            inputStream.close();
        } catch (Exception e) {
            LOGGER.info(e.getMessage());
        }
    }

    public String getUrl() {
        return prop.getProperty("config.url");
    }

    private String parsePropertyPath(String file) {
        URL url = Thread.currentThread().getContextClassLoader().getResource(file);
        if (url == null) {
            try {
                throw new Exception(String.format("%s not found in classpath", file));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String propsPath = url.getPath();
        propsPath = propsPath.replace("file:/", "");
        propsPath = propsPath.replace("!", "");
        propsPath = propsPath.replace(".war", "");
        return propsPath;
    }
}
