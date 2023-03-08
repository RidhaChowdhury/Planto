using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Models;
using PlantoAPI;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
    
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Planto API", Description = "Making the Plants you love", Version = "v1" });
});
    
var app = builder.Build();
    
app.UseSwagger();

app.UseSwaggerUI(c =>
{
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "Planto API V1");
});

app.MapGet("/test", async context => {
    var response = new { message = "Hello from Planto API!" };
    var jsonResponse = JsonSerializer.Serialize(response);
    context.Response.Headers.Add("Content-Type", "application/json");
    await context.Response.WriteAsync(jsonResponse);
});


app.MapGet("/getPlants", async context => {
    try {
        SqlConnectionStringBuilder builder = SqlConnectionProvider.GetSqlConnectionString();

        using (SqlConnection connection = new SqlConnection(builder.ConnectionString)) {
            await connection.OpenAsync();
            var sql = "SELECT * FROM Plant";
            var plants = await connection.QueryAsync<Plant>(sql);

            var response = new { plants = plants };
            string jsonResponse = JsonSerializer.Serialize(response);
            context.Response.Headers.Add("Content-Type", "application/json");
            await context.Response.WriteAsync(jsonResponse);
        }
    }
    catch (Exception ex) {
        // Log the exception and return an error response
        // to the client if something goes wrong
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync(ex.Message);
    }
});




app.Run();