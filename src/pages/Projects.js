import React, { useEffect, useState } from "react";
import { utils } from "casper-js-client-helper";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";
import ProjectsOpen from "../components/Projects/ProjectsOpen";
// import ProjectsComing from '../components/Projects/ProjectsComing';
import ProjectsClosed from "../components/Projects/ProjectsClosed";

import { initFactoryClient } from "../xWeb3";

export default function Projects() {
  const [casperProjectsOpened, setCasperProjectsOpened] = useState([]);
  const [casperProjectsComing, setCasperProjectsComing] = useState([]);
  const [casperProjectsClosed, setCasperProjectsClosed] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const project = {
        contractAddress: "aaaaaaaaaaaaaaaaa",
        startTime: Date.now() - 100000,
        endTime: Date.now() - 1000,
      };

      setCasperProjectsOpened([project]);
      setCasperProjectsComing([project]);
      setCasperProjectsClosed([project]);

      const factoryClient = await initFactoryClient();
      const auctions = await factoryClient.queryContract("auctions");

      setCasperProjectsOpened([]);
      setCasperProjectsComing([]);
      setCasperProjectsClosed([]);

      auctions.forEach((auction) => {
        const project = {
          contractAddress: utils.toAccountHashString(auction.data[0].data),
          startTime: auction.data[1].data.toNumber(),
          endTime: auction.data[2].data.toNumber(),
        };

        if (Date.now() < project.startTime) {
          setCasperProjectsComing((prev) => [...prev, project]);
        } else if (Date.now() < project.endTime) {
          setCasperProjectsOpened((prev) => [...prev, project]);
        } else {
          setCasperProjectsClosed((prev) => [...prev, project]);
        }
      });
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Background />
      <ProjectsOpen casperProjects={casperProjectsOpened} />
      {/* <ProjectsComing casperProjects={casperProjectsComing} /> */}
      <ProjectsClosed casperProjects={casperProjectsClosed} />
      {/* {casperProjects.map(project=>{
        if(Date.now()>project.endTime)
        return <ProjectsClosed contracthash={project.contracthash} />;
      })} */}
      <Footer />
    </>
  );
}
