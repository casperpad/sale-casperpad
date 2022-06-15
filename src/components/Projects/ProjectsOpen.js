/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import CustomCardCASPER from "./CustomCardCASPER";
import BuyOnlyProjectCard from "../../componentsv2/BuyOnlyProjectCard";
import ProjectCard from "../../componentsv2/ProjectCard";

export default function ProjectsOpen({
  casperProjects = [],
  binanceProjects = [],
}) {
  console.log(binanceProjects);
  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS OPEN NOW
      </h1>
      <section className="projects mx-auto">
        {/* {binanceProjects.map((project, index) => {
          return (
            <>
              {project.isBuyOnly ? (
                <BuyOnlyProjectCard
                  key={index}
                  project={project}
                  status={"Opened"}
                />
              ) : (
                <ProjectCard key={index} project={project} status={"Opened"} />
              )}
            </>
          );
        })} */}
        {casperProjects.map((project, index) => {
          return (
            <CustomCardCASPER
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
