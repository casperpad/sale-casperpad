import React, { useEffect, useState } from "react";
import { utils } from "casper-js-client-helper";

import ProjectsOpen from "../components/Projects/ProjectsOpen";
import ProjectsComing from "../components/Projects/ProjectsComing";
import ProjectsClosed from "../components/Projects/ProjectsClosed";
import binanceProjects, { CHAIN_ID } from "../config/binance";
import { initFactoryClient } from "../xWeb3";

export default function Projects() {
  const [casperProjectsOpened, setCasperProjectsOpened] = useState([]);
  const [casperProjectsComing, setCasperProjectsComing] = useState([]);
  const [casperProjectsClosed, setCasperProjectsClosed] = useState([]);

  const [binanceProjectsOpened, setBinanceProjectsOpened] = useState([]);
  const [binanceProjectsComing, setBinanceProjectsComing] = useState([]);
  const [binanceProjectsClosed, setBinanceProjectsClosed] = useState([]);

  useEffect(() => {
    async function fetchCasperData() {
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
    async function fetchBinanceData() {
      try {
        const fetchedProjectsInfo = await Promise.all(
          binanceProjects[CHAIN_ID].map(async (project) => {
            const res = await fetch(
              `tiers/${CHAIN_ID}/${project.address}.json`
            );
            const data = await res.json();
            return {
              address: project.address,
              isBuyOnly: project.isBuyOnly,
              token: data.info.token,
              payToken: data.info.payToken,
              links: data.info.links,
              name: data.info.name,
              description: data.info.description,
              startTime: data.info.startTime,
              endTime: data.info.endTime,
            };
          })
        );
        const comings = fetchedProjectsInfo.filter(
          (project) => Date.now() <= project.startTime
        );
        const openeds = fetchedProjectsInfo.filter(
          (project) =>
            Date.now() > project.startTime && Date.now() < project.endTime
        );
        const closeds = fetchedProjectsInfo.filter(
          (project) => Date.now() > project.endTime
        );
        setBinanceProjectsComing((prev) => [...prev, ...comings]);
        setBinanceProjectsOpened((prev) => [...prev, ...openeds]);
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
