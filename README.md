# Hey Anna

I created a UML diagram to illustrate how I structured the solution and planned to solve the problem step by step. Please send me your GitHub username so I can add you to the repository. I want to ensure transparency regarding the timing and that everything was done within the given threshold. The backend framework is SpringBoot and a dependency called Lombok, Lombok is a dependency that helps to reduce boilerplate codes, such as getters/setters, no argument constructors, and argument constructors and has a lot more different annotations to reduce boilerplate code.

The code is structured in a straightforward manner:
- **Models**: Hold the data 
- **Service**: Contains the business logic, including validation.
- **Custom Exception**: Handles errors by sending objects, and I used the **Builder design pattern** to implement these exception. We could discuss more about the different design patterns in the interview.
- **Controller**: Handles the  HTTP Request and Responses

Everything has been tested using **Postman**. The URL for testing is:
**localhost:8080/api/validate**

The POST-request should include a JSON body containing **MeasurementData** and a nested object called **RawSensordata**, there is an example file in the root directory to find an example of what to send in, file is called [sampleJSON.json](https://github.com/RaymondSWE/ServiceJSONData/blob/main/SampleJSON.json)



Best regards,
Raman

