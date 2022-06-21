import React from "react";
import CasperCard from "@components/CasperCard";
import BuyOnlyProjectCard from "@components/BuyOnlyProjectCard";
import ProjectCard from "@components/ProjectCard";

export default function ProjectsComing({
  casperProjects = [],
  binanceProjects = [],
}) {
  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS COMING
      </h1>
      <section className="projects">
        {binanceProjects.map((project) => {
          if (project.isBuyOnly)
            return (
              <BuyOnlyProjectCard
                key={project.address}
                project={project}
                status={"Coming"}
              />
            );
          return (
            <ProjectCard
              key={project.address}
              project={project}
              status={"Coming"}
            />
          );
        })}
        {casperProjects.map((project, index) => {
          return (
            <CasperCard
              key={`caspercomings_${index}`}
              project={project}
              status={"Coming"}
            />
          );
        })}
      </section>
    </>
  );
}
