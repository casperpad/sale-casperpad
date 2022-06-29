import React from "react";
import CasperCard from "@components/CasperCard";
import CasperCardPublic from "@components/CasperCardPublic";
import BuyOnlyProjectCard from "@components/BuyOnlyProjectCard";
import BuyOnlyProjectCardPublic from "@components/BuyOnlyProjectCardPublic";
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
          if (project.isBuyOnly) {
            if (project.isPublic)
              return (
                <BuyOnlyProjectCardPublic
                  key={project.address + "public"}
                  project={project}
                  status={"Closed"}
                />
              );
            else
              return (
                <BuyOnlyProjectCard
                  key={project.address + "private"}
                  project={project}
                  status={"Closed"}
                />
              );
          }
          return (
            <ProjectCard
              key={project.address}
              project={project}
              status={"Closed"}
            />
          );
        })}
        {casperProjects.map((project, index) => {
          return project.isPublic ? (
            <CasperCardPublic
              key={project.contractHash + "public"}
              project={project}
              status={"Closed"}
            />
          ) : (
            <CasperCard
              key={project.contractHash + "private"}
              project={project}
              status={"Closed"}
            />
          );
        })}
      </section>
    </>
  );
}
