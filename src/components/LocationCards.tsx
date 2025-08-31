import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LocationCards = () => {
  const locations = [
    {
      name: "Calicut",
      slug: "calicut",
      description: "Experience premium indoor advertising in Calicut's busiest food courts"
    },
    {
      name: "Ernakulam", 
      slug: "ernakulam",
      description: "Reach your target audience in Ernakulam's commercial hubs"
    },
    {
      name: "Trivandrum",
      slug: "trivandrum", 
      description: "Connect with customers in Trivandrum's popular dining destinations"
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            PixelPost Locations
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose your preferred location to start your indoor advertising campaign
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Card key={location.slug} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {location.name}
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {location.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Explore {location.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationCards;