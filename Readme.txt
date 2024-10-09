Add EF Core Packages
You will use Entity Framework Core to interact with the database. Install the necessary packages:
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools

add-migration crudtickets
update-database
