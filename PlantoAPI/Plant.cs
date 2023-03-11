namespace PlantoAPI
{
    public class Plant
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public DateTime? LastWatered { get; set; }
        public string? DevelopmentStage { get; set; }
    }
}
