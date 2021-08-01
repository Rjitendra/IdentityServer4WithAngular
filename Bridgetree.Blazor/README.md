# BlazorServerApp

## Machine setup for Blazor development
Install .NET Core SDK 3.1 or later https://dotnet.microsoft.com/download/
To verify the list of .NET Core SDKs installed in your machine, run the following command from the command line.
     dotnet --list-sdks
You can build blazor applications using Visual Studio 2019, Visual Studio Code or the .NET Core CLI. 
You can download Visual Studio 2019 from the following URL
https://visualstudio.microsoft.com/downloads/

# How Run Application
Double click on the solution file - Bridgetree.Blazor.Api.sln file. You will find this file in the Bridgetree.Blazor folder.

Once you have the solution open. Execute the following command from Package Manager Console. Make sure Bridgetree.Blazor.Server.Web project is set as the Default project.

Update-Database
This will create the required asp.net core identity database tables.

Execute the Update-Database one more time. This time set Bridgetree.Blazor.Models as the Default project. This migration creates the "BridgetreeTraining" database and the required tables.

Then set start up project as Bridgetree.Blazor.Api and Bridgetree.Blazor.Server.Web.


Thanks
Jitendra


