import { Card, CardContent } from "@/components/ui/card";
import businessGrowthImage from "@/assets/business-growth.png";
import visitorsImage from "@/assets/visitors.png";
import fourKScreenImage from "@/assets/4k-screen.png";
import costSavingsImage from "@/assets/cost-savings.png";
import displayFlexibilityImage from "@/assets/display-flexibility.png";
import designSupportImage from "@/assets/design-support.png";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "ബിസിനസ്സ് വളർച്ചാസാധ്യത",
      description: "മറ്റ് റീട്ടെയിൽ സ്ഥാപനങ്ങളെക്കാൾ കൂടുതൽ സമയം ജനങ്ങൾ ചിലവഴിക്കുന്ന ഇടമാണ് ഫൂഡ് കോർട്ടുകൾ. ശരാശരി 30 മിനിറ്റോളം. ഇതിനിടയിൽ സ്ക്രീനിലെ പരസ്യങ്ങൾ കാണുന്നതിനും പരസ്പരം ചർച്ച ചെയ്യുന്നതിനുമുള്ള സാധ്യത ഏറെയാണ്.",
      image: businessGrowthImage
    },
    {
      title: "സന്ദർശകർ",
      description: "മുതിർന്നവരും കുടുംബങ്ങളും യുവപ്രൊഫഷണലുകളും വലിയ അളവിൽ സന്ദർശിക്കുന്ന ഇടമാണ് ഫൂഡ്കോർട്ടുകൾ. ഇതുവഴി താങ്കളുടെ സ്ഥാപനത്തിന്റെ ഓഫറുകളും പ്രൊമോഷനുകളും Target ഗ്രൂപ്പിലേക്ക് എളുപ്പമെത്തുന്നു.",
      image: visitorsImage
    },
    {
      title: "4K TV സ്ക്രീനുകൾ",
      description: "നിങ്ങളുടെ ഓഫറുകളും പ്രൊമോഷനുകളും ഏറ്റവും മികച്ച ദൃശ്യഭംഗിയോടെ ഞങ്ങളുടെ 4K സ്ക്രീനുകളിൽ പ്രദർശിപ്പിക്കാൻ സാധിക്കും.",
      image: fourKScreenImage
    },
    {
      title: "പരസ്യച്ചിലവ്",
      description: "അച്ചടിമാധ്യമങ്ങളിലെ പരസ്യസേവനങ്ങളെക്കാൾ 90 ശതമാനം കുറഞ്ഞ ചിലവ്.",
      image: costSavingsImage
    },
    {
      title: "പ്രദർശനസൗകര്യം",
      description: "നിങ്ങളുടെ ഇഷ്ടാനുസരണം പരസ്യങ്ങൾ എപ്പോൾ വേണമെങ്കിലും മാറ്റാൻ സാധിക്കും. ഉദാഹരണം:- ഓരോ ദിവസവും ഓരോ ഓഫറുകൾ.",
      image: displayFlexibilityImage
    },
    {
      title: "Design Support",
      description: "നിങ്ങൾക്ക് പരസ്യം ഡിസൈൻ ചെയ്യാൻ support ആവശ്യമെങ്കിൽ ഞങ്ങൾ തയ്യാറാണ്.",
      image: designSupportImage
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ഫൂഡ്കോർട്ടുകൾ വഴി പരസ്യം ചെയ്താലുള്ള ഗുണങ്ങൾ
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-justify">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;