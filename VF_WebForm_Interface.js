<script type="text/javascript" runat="server">
  Platform.Load("core", "1.1.1");
  
  
  // This cusom Object will be sent back to client as JSON.
  var Result = { now: Date.now(), error: "", message: "" };
  

  if (Platform.Request.Method == "GET") {
    // Redirect GET requests to another website
    // Platform.Response.Redirect("http://www.vfc.com/");
  }

  else if (Platform.Request.Method == "POST") {
    // set allowed origin header here:
    // Documentation: https://help.marketingcloud.com/en/documentation/exacttarget/content/server_side_javascript/server_side_javascript_syntax_guide/platform_server_side_javascript_functions/interacting_with_the_client_browser_using_the_response_object/
    Platform.Response.SetResponseHeader("Access-Control-Allow-Origin","*");
    Platform.Response.SetResponseHeader("Content-Type","application/json");
    
    
    // Retrieve Form Fields from POST request
    // Documentation: https://help.marketingcloud.com/en/documentation/exacttarget/content/server_side_javascript/server_side_javascript_syntax_guide/platform_server_side_javascript_functions/retrieving_http_properties_using_the_request_object/
    var emailAddr = Platform.Request.GetFormField("emailAddr");
    var firstName = Platform.Request.GetFormField("firstName");
    var lastName = 	Platform.Request.GetFormField("lastName");
    var phone = 	Platform.Request.GetFormField("phone");
    var age = 		Platform.Request.GetFormField("age");
    var optIn = 	Platform.Request.GetFormField("optIn");
    var dob = 		Platform.Request.GetFormField("dateOfBirth");
    var clientIP = 	Platform.Request.ClientIP;

    
    // validate email adress:
    if(Platform.Function.IsEmailAddress(emailAddr) == false) {
      // Handle Invalid Email Address here.
      Result.error = "Invalid Email Address";
    } else {
      // Upsert data into data extension
      // Documentation: https://help.marketingcloud.com/en/documentation/exacttarget/content/server_side_javascript/server_side_javascript_syntax_guide/platform_server_side_javascript_functions/interacting_with_data_extensions_using_the_function_object/
      Result.rows = Platform.Function.UpsertData("Webform_DataExt",["email"],[emailAddr],["firstName","lastName","age","phone","optin","birthdate","clientIP","locale","upsert"],[firstName, lastName, age, phone, optIn, dob, clientIP, "ch", Now()]);
      Result.message = "Upsert Successfull";
    }
    
    // output Result as JSON
    Write(Platform.Function.Stringify(Result));
  }
</script>