import React, { useEffect, useState } from "react";

import ProjectsOpen from "../components/Projects/ProjectsOpen";
import ProjectsComing from "../components/Projects/ProjectsComing";
import ProjectsClosed from "../components/Projects/ProjectsClosed";
import binanceProjects, { CHAIN_ID } from "../config/binance";
import { casperProjects, CASPER_CHAIN } from "../config/casper";

export default function Projects() {
  const [casperProjectsComing, setCasperProjectsComing] = useState([]);
  const [casperProjectsOpened, setCasperProjectsOpened] = useState([]);
  const [casperProjectsClosed, setCasperProjectsClosed] = useState([]);

  const [binanceProjectsComing, setBinanceProjectsComing] = useState([]);
  const [binanceProjectsOpened, setBinanceProjectsOpened] = useState([]);
  const [binanceProjectsClosed, setBinanceProjectsClosed] = useState([]);

  useEffect(() => {
    async function fetchCasperData() {
      console.log(CASPER_CHAIN);
      const fetchedProjectsInfo = await Promise.all(
        casperProjects[CASPER_CHAIN].map(async (contractHash) => {
          const res = await fetch(
            `${window.location.origin}/projects/casper/${CASPER_CHAIN}/${contractHash}.json`
          );
          const data = await res.json();
          return {
            contractHash: contractHash,
            ...data.info,
          };
        })
      );

      const comings = fetchedProjectsInfo.filter(
        (project) => Date.now() <= project.startTime
      );
      const opens = fetchedProjectsInfo.filter(
        (project) =>
          Date.now() > project.startTime && Date.now() < project.endTime
      );
      const closeds = fetchedProjectsInfo.filter(
        (project) => Date.now() > project.endTime
      );

      setCasperProjectsComing((prev) => [...prev, ...comings]);
      setCasperProjectsOpened((prev) => [...prev, ...opens]);
      setCasperProjectsClosed((prev) => [...prev, ...closeds]);
    }
    async function fetchBinanceData() {
      try {
        const fetchedProjectsInfo = await Promise.all(
          binanceProjects[CHAIN_ID].map(async (project) => {
            const res = await fetch(
              `projects/ethereum/${CHAIN_ID}/${project.address}.json`
            );
            const data = await res.json();
            return {
              address: project.address,
              isBuyOnly: project.isBuyOnly,
              ...data.info,
            };
          })
        );
        const comings = fetchedProjectsInfo.filter(
          (project) => Date.now() <= project.startTime
        );
        const opens = fetchedProjectsInfo.filter(
          (project) =>
            Date.now() > project.startTime && Date.now() < project.endTime
        );
        const closeds = fetchedProjectsInfo.filter(
          (project) => Date.now() > project.endTime
        );
        setBinanceProjectsComing((prev) => [...prev, ...comings]);
        setBinanceProjectsOpened((prev) => [...prev, ...opens]);
        setBinanceProjectsClosed((prev) => [...prev, ...closeds]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBinanceData();
    fetchCasperData();
  }, []);

  return (
    <>
      <ProjectsOpen
        casperProjects={casperProjectsOpened}
        binanceProjects={binanceProjectsOpened}
      />
      <ProjectsComing
        casperProjects={casperProjectsComing}
        binanceProjects={binanceProjectsComing}
      />
      <ProjectsClosed
        casperProjects={casperProjectsClosed}
        binanceProjects={binanceProjectsClosed}
      />
    </>
  );
}
