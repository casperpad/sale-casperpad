import React from "react";

import BuyOnlyProjectCard from "@components/BuyOnlyProjectCard";
import BuyOnlyProjectCardPublic from "@components/BuyOnlyProjectCardPublic";
import ProjectCard from "@components/ProjectCard";
import CasperCard from "@components/CasperCard";
import CasperCardPublic from "@components/CasperCardPublic";

export default function ProjectsOpen({
  casperProjects = [],
  binanceProjects = [],
}) {
  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS OPEN NOW
      </h1>
      <section className="projects mx-auto">
        {binanceProjects.map((project) => {
          if (project.isBuyOnly) {
            if (project.isPublic)
              return (
                <BuyOnlyProjectCardPublic
                  key={project.address + "public"}
                  project={project}
                  status={"Opened"}
                />
              );
            else
              return (
                <BuyOnlyProjectCard
                  key={project.address + "private"}
                  project={project}
                  status={"Opened"}
                />
              );
          }
          return (
            <ProjectCard
              key={project.address}
              project={project}
              status={"Opened"}
            />
          );
        })}
        {casperProjects.map((project) => {
          return project.isPublic ? (
            <CasperCardPublic
              key={project.contractHash + "public"}
              project={project}
              status={"Opened"}
            />
          ) : (
            <CasperCard
              key={project.contractHash + "private"}
              project={project}
              status={"Opened"}
            />
          );
        })}
      </section>
    </>
  );
}
