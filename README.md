GSMA MobileConnect Java Server Side Library
==============================================================================================================

Mobile Connect is a mobile identity service based on the OpenID Connect & OAuth2 where end users can authenticate themselves using their mobile phone via Mobile Connect. This allows them access to websites and applications without the need to remember passwords and usernames. It’s safe, secure and no personal information is shared without their permission.

Note: if you operate in the EU then you should use EU Discovery Service domain in discovery URL: eu.discover.mobileconnect.io

## Quick Start

1. Deploy any Server Side Application.

2. Clone java_client_demo_app.

3. Put urls that are associated with "with/without discovery" modes in deployed Server Side SDK in file \local-path\java_client_demo_app\src\main\resources\config\config.properties as config.url.

4. Open console from demo_app directory and execute following commands:

```posh
mvn clean install
cd target
java -jar .\server_side_demo-app-0.1.0.war
```

5. Navigate to http://localhost:8083 in your browser.

## Support

If you encounter any issues which are not resolved by consulting the resources below then [send us a message](https://developer.mobileconnect.io/content/contact-us)

## Resources

- [MobileConnect Java Server Side Library](https://developer.mobileconnect.io/content/java-server-side-library)
- [MobileConnect Android Client Side Library](https://developer.mobileconnect.io/content/android-client-side-library)
- [MobileConnect iOS Client Side Library](https://integration.developer.mobileconnect.io/mobile-connect-library-for-ios)

- [MobileConnect Discovery API Information](https://developer.mobileconnect.io/discovery-api)
- [MobileConnect Authentication API Information](https://developer.mobileconnect.io/mobile-connect-api)
- [MobileConnect Authentication API (v2.0) Information](https://developer.mobileconnect.io/mobile-connect-profile-v2-0)
