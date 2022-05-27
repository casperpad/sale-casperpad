/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import CustomCard from "./CustomCard";
import CustomCardSeed from "./CustomCardSeed";

import CustomCardNew from "./CustomCardNew";
import CustomCardAdvisory from "./CustomCardAdvisory";
import CustomCardSkyPrivate from "./CustomCardSkyPrivate";
import CustomCardSkyAdvisor from "./CustomCardSkyAdvisor";
import CustomCardSkypublic from "./CustomCardSkypublic";
import CustomCardCASPER from "./CustomCardCASPER";

import { projects, casperProjects } from "../../assets/variables";

import { whitelist } from "../../contract_info/whitelist";
import { whitelist as whitelistSeed } from "../../contract_info/whitelistSeed";
import { whitelist as whitelistAdvisory } from "../../contract_info/whitelistAdvisory";
import { whitelist as whitelistSkyPrivate } from "../../contract_info/whitelistSkyPrivate";
import { whitelist as whitelistSkyAdvisor } from "../../contract_info/whitelistSkyAdvisor";
import { useIsAdmin } from "../../util/interact";

import { useIsAdmin as useIsSkyAdmin } from "../../util/interactSkypublic";

import useNetworkStatus from "../../store/useNetworkStatus";

import { useEthers } from "@usedapp/core";
import { initClient } from "../../xWeb3";
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

export default function ProjectsClosed() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSkyAdmin, setIsSkyAdmin] = useState(false);
  const [verifiedPrivate, setVerifiedPrivate] = useState();
  const [verifiedSeed, setVerifiedSeed] = useState();
  const [verifiedAdvisory, setVerifiedAdvisory] = useState();

  const [verifiedSkyPrivate, setVerifiedSkyPrivate] = useState();
  const [verifiedSkyAdvisor, setVerifiedSkyAdvisor] = useState();

  const { showBinanceProjects, showCasperProjects } = useNetworkStatus();

  const { account } = useEthers();
  let isAdmin_tmp = useIsAdmin(account);
  let isSkyAdmin_tmp = useIsSkyAdmin(account);

  useEffect(() => {
    setIsAdmin(isAdmin_tmp);
  }, [isAdmin_tmp]);

  useEffect(() => {
    setIsSkyAdmin(isSkyAdmin_tmp);
  }, [isSkyAdmin_tmp]);

  useEffect(() => {
    const leaves = whitelist.map((v) => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const _root = tree.getHexRoot();
    const leaf = keccak256(account);
    const _proof = tree.getHexProof(leaf);

    const _verified = tree.verify(_proof, leaf, _root);
    setVerifiedPrivate(_verified);
    console.log("verifiedPrivate", _verified);
  }, [account]);

  useEffect(() => {
    const leaves = whitelistSeed.map((v) => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const _root = tree.getHexRoot();
    const leaf = keccak256(account);
    const _proof = tree.getHexProof(leaf);

    const _verified = tree.verify(_proof, leaf, _root);
    setVerifiedSeed(_verified);
    console.log("verifiedSeed", _verified);
  }, [account]);

  useEffect(() => {
    const leaves = whitelistAdvisory.map((v) => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const _root = tree.getHexRoot();
    const leaf = keccak256(account);
    const _proof = tree.getHexProof(leaf);

    const _verified = tree.verify(_proof, leaf, _root);
    setVerifiedAdvisory(_verified);
    console.log("verifiedAdvisory", _verified);
  }, [account]);

  useEffect(() => {
    const leaves = whitelistSkyPrivate.map((v) => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const _root = tree.getHexRoot();
    const leaf = keccak256(account);
    const _proof = tree.getHexProof(leaf);

    const _verified = tree.verify(_proof, leaf, _root);
    setVerifiedSkyPrivate(_verified);
    console.log("verifiedSkyPrivate", _verified);
  }, [account]);

  useEffect(() => {
    const leaves = whitelistSkyAdvisor.map((v) => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const _root = tree.getHexRoot();
    const leaf = keccak256(account);
    const _proof = tree.getHexProof(leaf);

    const _verified = tree.verify(_proof, leaf, _root);
    setVerifiedSkyAdvisor(_verified);
    console.log("verifiedSkyAdvisor", _verified);
  }, [account]);

  const [csprProjects, setCsprProjects] = useState([]);
  const currentTime = new Date().getTime();

  useEffect(async () => {
    try {
      const casperpadClient = await initClient();

      let promises = casperProjects.map(async (project) => {
        return await casperpadClient.getProjectUrefById(
          project.contractAddress
        );
      });

      const projectUrefs = await Promise.all(promises);

      promises = projectUrefs.map(async (projectUref) => {
        return await casperpadClient.getDataByFieldName(
          projectUref,
          "sale_end_time"
        );
      });

      const saleEndTimes = await Promise.all(promises);

      const projects = casperProjects.filter((project, index) => {
        return currentTime > saleEndTimes[index];
      });
      setCsprProjects(projects);
    } catch (err) {}
  }, []);

  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS CLOSED
      </h1>
      <section className="projects">
        {showBinanceProjects &&
          projects.map((project, index) => {
            return (
              (index === 4 && (verifiedSkyPrivate || isSkyAdmin) && (
                <CustomCardSkyPrivate key={index} project={project} />
              )) ||
              (index === 5 && (verifiedSkyAdvisor || isSkyAdmin) && (
                <CustomCardSkyAdvisor key={index} project={project} />
              )) ||
              (index === 6 && (
                <CustomCardSkypublic key={index} project={project} />
              )) ||
              (project.status === "Closed" &&
                index === 0 &&
                (verifiedPrivate || isAdmin) && (
                  <CustomCard key={index} project={project} />
                )) ||
              (index === 1 && (verifiedSeed || isAdmin) && (
                <CustomCardSeed key={index} project={project} />
              )) ||
              (index === 3 && (verifiedAdvisory || isAdmin) && (
                <CustomCardAdvisory key={index} project={project} />
              )) ||
              (index === 2 && <CustomCardNew key={index} project={project} />)
            );
          })}
        {showCasperProjects &&
          csprProjects.map((project, index) => {
            return (
              <CustomCardCASPER
                key={index}
                project={project}
                status={"Closed"}
              />
            );
          })}
      </section>
    </>
  );
}
