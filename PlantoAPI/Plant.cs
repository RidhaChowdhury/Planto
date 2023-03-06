namespace PlantoAPI
{
    public class Plant
    {
        public Guid Id { get; set; }
        public string? PlantName { get; set; }
        public DateTime LastWatered { get; set; }
    }
}
