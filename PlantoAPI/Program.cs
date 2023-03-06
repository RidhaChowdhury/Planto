using Microsoft.OpenApi.Models;
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

app.Run();