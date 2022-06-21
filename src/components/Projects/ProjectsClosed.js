import React from "react";
import CasperCard from "@components/CasperCard";
import BuyOnlyProjectCard from "@components/BuyOnlyProjectCard";
import ProjectCard from "@components/ProjectCard";

export default function ProjectsClosed({
  casperProjects = [],
  binanceProjects = [],
}) {
  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS CLOSED
      </h1>
      <section className="projects">
        {binanceProjects.map((project) => {
          if (project.isBuyOnly)
            return (
              <BuyOnlyProjectCard
                key={project.address}
                project={project}
                status={"Closed"}
              />
            );
          return (
            <ProjectCard
              key={project.address}
              project={project}
              status={"Closed"}
            />
          );
        })}
        {casperProjects.map((project, index) => {
          return (
            <CasperCard
              key={`casperclosed_${index}`}
              project={project}
              status={"Closed"}
            />
          );
        })}
      </section>
    </>
  );
}
