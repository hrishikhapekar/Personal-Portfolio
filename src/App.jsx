import { useEffect, useRef, useState } from "react";

import Sidebar from "./components/SideBar";
import CursorGlow from "./components/CursorGlow";
import Spotlight from "./components/Spotlight";
import AnimatedBlobs from "./components/AnimatedBlobs";
import DashboardSkeleton from "./components/DashboardSkeleton";
import ContactSection from "./components/ContactSection";
import CodingPlatforms from "./components/CodingPlatforms";
import AboutStats from "./components/AboutStats";
import TechStackBox from "./components/TechStackBox";



import TopBar from "./components/TopBar";
import HeroCard from "./components/HeroCard";
import ProjectsTable from "./components/ProjectsTable";
import StatCards from "./components/StatCards";
import PremiumCard from "./components/PremiumCard";
import DeveloperActivity from "./components/DeveloperActivity";
import GithubProjects from "./components/GithubProjects";
import TechnicalCapabilities from "./components/TechnicalCapabilities";
import ExperienceCertifications from "./components/ExperienceCertifications";


import useActiveSection from "./hooks/useActiveSection";

export default function App() {
  const scrollRef = useRef(null);

  const sectionIds = ["home", "about", "experience", "projects", "github", "coding", "contact"];
  const { activeId, lockActive } = useActiveSection(sectionIds, scrollRef);

  const [snapEnabled, setSnapEnabled] = useState(true);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#07070a] flex relative overflow-hidden">
      <CursorGlow />
      <AnimatedBlobs />

      <div className="flex w-full relative z-10">
        {/* LEFT STRIP */}
        <div className="w-[120px] relative shrink-0">
          <div className="absolute inset-0 bg-black/35 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 opacity-70" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-white/3" />
          <div className="absolute -left-10 top-20 w-[160px] h-[300px] bg-purple-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <Sidebar
              activeId={activeId}
              lockActive={lockActive}
              setSnapEnabled={setSnapEnabled}
            />
          </div>
        </div>

        {/* MAIN */}
        <main
          ref={scrollRef}
          className={[
            "flex-1 h-screen overflow-y-auto relative scroll-smooth",
            snapEnabled ? "snap-y snap-proximity" : "snap-none",
          ].join(" ")}
        >
          <Spotlight />

          {/* Sticky TopBar */}
          <div className="sticky top-0 z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent backdrop-blur-xl" />
              <div className="relative px-4 md:px-6 py-4 md:py-5 max-w-6xl mx-auto">
                <TopBar />
              </div>
            </div>
          </div>

          {/* Page */}
          <div className="relative z-10 px-4 md:px-6 pb-10 max-w-6xl mx-auto">
            <div className="mt-6">
              {loading ? (
                <DashboardSkeleton />
              ) : (
                <>
                  {/* HOME */}
                  <section
                    id="home"
                    className="space-y-6 snap-start scroll-mt-28"
                  >
                    <HeroCard />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <div className="md:col-span-1 space-y-4">
                        <StatCards />
                        <TechStackBox />
                      </div>
                      <div className="md:col-span-2">
                        <DeveloperActivity />
                      </div>
                    </div>
                  </section>

                  {/* ABOUT */}
                  <section
                    id="about"
                    className="mt-10 snap-start scroll-mt-28 min-h-[90vh] flex items-start"
                  >
                    <div className="w-full">
                      <PremiumCard glowPreset="cyan">
                        <h2 className="text-white/90 font-semibold text-lg">About Me</h2>

                        <div className="mt-4 space-y-6">
                          <p className="text-white/80 text-base md:text-lg leading-relaxed">
                            A motivated{" "}
                            <span className="text-sky-300 font-semibold">
                              Computer Science Student
                            </span>{" "}
                            with a strong foundation in full-stack web development, UI engineering, and scalable system design.
                            I develop reliable, user-focused applications with clean architecture, modern UI patterns, and real-world deployment readiness.
                          </p>

                          <p className="text-white/70 text-base md:text-lg leading-relaxed">
                            My interests also extend to{" "}
                            <span className="text-white/85 font-semibold">
                              Game Development (Unity)
                            </span>
                            ,{" "}
                            <span className="text-white/85 font-semibold">
                              Cisco Networking (Packet Tracer)
                            </span>
                            ,{" "}
                            <span className="text-white/85 font-semibold">Figma Designing</span>, and{" "}
                            <span className="text-white/85 font-semibold">Video Editing</span> — which
                            strengthens my creativity, product design sense, and technical
                            understanding beyond just coding.
                          </p>

                          {/* ✅ Stats */}
                          <AboutStats />
                        </div>
                      </PremiumCard>


                      {/* ✅ Technical Capabilities section */}
                      <TechnicalCapabilities />
                    </div>
                  </section>

                  {/* ✅ EXPERIENCE + CERTIFICATIONS */}
                  <section
                    id="experience"
                    className="mt-10 snap-start scroll-mt-28 min-h-[90vh]"
                  >
                    <ExperienceCertifications />
                  </section>



                  {/* PROJECTS */}
                  <section
                    id="projects"
                    className="mt-10 space-y-6 snap-start scroll-mt-28 min-h-[90vh]"
                  >
                    <ProjectsTable />
                  </section>

                  {/* ✅ GITHUB PROJECTS */}
                  <section
                    id="github"
                    className="mt-10 snap-start scroll-mt-28 min-h-[90vh]"
                  >
                    <GithubProjects />
                  </section>

                  {/* ✅ CODING PLATFORMS */}
                  <section
                    id="coding"
                    className="mt-10 snap-start scroll-mt-28 min-h-[90vh]"
                  >
                    <CodingPlatforms />
                  </section>


                  {/* CONTACT */}
                  <section
                    id="contact"
                    className="mt-10 mb-16 snap-start scroll-mt-28 min-h-[90vh]"
                  >
                    <ContactSection />
                  </section>

                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
