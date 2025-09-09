import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LocationCards = () => {
  const navigate = useNavigate();

  const locations = [
    {
      name: "Pathanamthitta",
      slug: "Pathanamthitta",
      description: "Experience premium indoor advertising in Pathanamthitta's busiest food courts",
      place: ["New Jhons", "Aramana Resturant"]
    },
    {
      name: "Kottayam", 
      slug: "Kottayam",
      description: "Reach your target audience in Kottayam's commercial hubs",
      place: ["Saravana Hotel(Thengana)","Saravana Hotel(Changanassery)","Yemeni Mandhi"]
    },
    {
      name: "Alappuzha",
      slug: "Alappuzha", 
      description: "Connect with customers in Alappuzha's popular dining destinations",
      place: ["Coming Soon..."]
    }
  ];

  const handleRedirect = (locationSlug: string, place: string) => {
    if (place === "Coming Soon...") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      navigate(`/locations/${locationSlug}/${place.replace(/\s+/g, "-").toLowerCase()}`);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <section id="locations" className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Adbite Locations
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose your preferred location to start your advertising campaign
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
                <div className="flex flex-col gap-3">
                  {location.place.map((place) => (
                    <Button
                      key={place}
                      variant="outline"
                      className="w-full transition-colors hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleRedirect(location.slug, place)}
                    >
                      {place}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default LocationCards;
