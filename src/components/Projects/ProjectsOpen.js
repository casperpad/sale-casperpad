/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import BuyOnlyProjectCard from "../../componentsv2/BuyOnlyProjectCard";
import ProjectCard from "../../componentsv2/ProjectCard";
import CasperCard from "../../componentsv2/CasperCard";

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
          return (
            <>
              {project.isBuyOnly ? (
                <BuyOnlyProjectCard
                  key={project.address}
                  project={project}
                  status={"Opened"}
                />
              ) : (
                <ProjectCard
                  key={project.address}
                  project={project}
                  status={"Opened"}
                />
              )}
            </>
          );
        })}
        {casperProjects.map((project, index) => {
          return (
            <CasperCard
              key={`casperopened_${index}`}
              project={project}
              status={"Opened"}
            />
          );
        })}
      </section>
    </>
  );
}
