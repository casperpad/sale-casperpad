import React from "react";

import CustomCardCASPER from "./CustomCardCASPER";

export default function ProjectsClosed({ casperProjects = [] }) {
  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS CLOSED
      </h1>
      <section className="projects">
        {casperProjects.map((project, index) => {
          return (
            <CustomCardCASPER
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
