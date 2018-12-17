1. Clone repository
2. Put url of deployed server side in file “demo_app\src\main\resources\config\config.properties” as config.url
3. Open console from demo_app directory and execute command mvn clean install
4. Open console from demo_app/target directory and execute command java -jar .\server_side_demo-app-0.1.0.war
5. Open “http://localhost:8083/connect” in your browser
   
   
   You can send the requests:
1. Using subscriber MSISDN;
2. Using Mobile Country Code and Mobile Network Code (MCC/MNC);
3. Without any parameters (default option).
   Also you can pass IP address of the end-user's device as extra parameter.
   
   Examples:
   Mobile connect with MSISDN
   
   Check request mode “Using MSISDN”, input MSISDN in textfield and click “Mobile Connect” button.
   
   Also you can send request with extra parameter IP. Check extra mode “With IP” and input IP in textfield before clicking “Mobile Connect” button.
   
   
