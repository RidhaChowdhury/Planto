using Dapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using PlantoAPI;
using System;
using System.Data.SqlClient;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Planto API", Description = "Making the Plants you love", Version = "v1" });
});

// Enable CORS
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder => {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Planto API V1");
});

// Use CORS
app.UseCors();

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

app.MapPost("/addPlant", async (HttpContext context, Plant newPlant) => {
    try {
        SqlConnectionStringBuilder builder = SqlConnectionProvider.GetSqlConnectionString();

        using (SqlConnection connection = new SqlConnection(builder.ConnectionString)) {
            await connection.OpenAsync();

            // Attempt to insert the new row
            var sql = "INSERT INTO Plant (id, Name, DevelopmentStage) VALUES (@Id, @Name, @DevelopmentStage)";
            var parameters = new { Id = newPlant.Id, Name = newPlant.Name , DevelopmentStage = newPlant.DevelopmentStage};
            var status = await connection.ExecuteAsync(sql, parameters);

            // Send back wether the plant was added successfully
            context.Response.Headers.Add("Content-Type", "application/json");
            context.Response.StatusCode = 200;
            await context.Response.WriteAsync(JsonSerializer.Serialize(new { status = status }));
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