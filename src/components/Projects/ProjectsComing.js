import React from "react";
import CasperCard from "@components/CasperCard";
import CasperCardPublic from "@components/CasperCardPublic";
import BuyOnlyProjectCard from "@components/BuyOnlyProjectCard";
import BuyOnlyProjectCardPublic from "@components/BuyOnlyProjectCardPublic";
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
          if (project.isBuyOnly) {
            if (project.isPublic)
              return (
                <BuyOnlyProjectCardPublic
                  key={project.address + "public"}
                  project={project}
                  status={"Coming"}
                />
              );
            else
              return (
                <BuyOnlyProjectCard
                  key={project.address + "private"}
                  project={project}
                  status={"Coming"}
                />
              );
          }
          return (
            <ProjectCard
              key={project.address}
              project={project}
              status={"Coming"}
            />
          );
        })}
        {casperProjects.map((project, index) => {
          return project.isPublic ? (
            <CasperCardPublic
              key={project.contractHash + "public"}
              project={project}
              status={"Coming"}
            />
          ) : (
            <CasperCard
              key={project.contractHash + "private"}
              project={project}
              status={"Coming"}
            />
          );
        })}
      </section>
    </>
  );
}
