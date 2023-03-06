using System.Data.SqlClient;
using Microsoft.OpenApi.Models;
using System.Data.SqlClient;
using System.Text.Json;
using Dapper;

namespace PlantoAPI
{
    public class PlantDB
    {
        public  static List<Plant> GetPlants() {
            SqlConnectionStringBuilder builder = SqlConnectionProvider.GetSqlConnectionString();

            using (SqlConnection connection = new SqlConnection(builder.ConnectionString)) {
                connection.Open();
                var sql = "SELECT PlantName, id, LastWatered FROM Plant";
                var plants = connection.Query<Plant>(sql);
                return plants.AsList<Plant>();
            }
        }
    }
}
