import LeadForm from "@/components/forms/lead-forms";
import UpdateIndicatorBanner from "@/components/update-indicator-banner";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center flex-col">
      <UpdateIndicatorBanner />
      <div className="mb-16">
        <svg height="40" width="250" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="30" fill="white" font-size="36">
            Go to
            <tspan fill="none" stroke="white">
              MERE 🚀
            </tspan>
          </text>
        </svg>
      </div>
      <LeadForm />
    </main>
  );
}
