/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { casperProjects } from "../../assets/variables";

import CustomCardCASPER from "./CustomCardCASPER";

import { initClient } from "../../xWeb3";
import useNetworkStatus from "../../store/useNetworkStatus";
// const keccak256 = require('keccak256');
// const { MerkleTree } = require('merkletreejs');

export default function ProjectsOpen() {
  // const {account} = useEthers();

  // useEffect( () => {
  //     const leaves = whitelist.map((v) => keccak256(v));
  //     const tree = new MerkleTree(leaves, keccak256, { sort: true });
  //     const _root = tree.getHexRoot();
  //     const leaf = keccak256(account);
  //     const _proof = tree.getHexProof(leaf);

  //     const _verified = tree.verify(_proof, leaf, _root);
  //     setVerifiedPrivate(_verified);
  //     console.log('verifiedPrivate', _verified);

  // }, [account]);

  // useEffect( () => {
  //     const leaves = whitelistSeed.map((v) => keccak256(v));
  //     const tree = new MerkleTree(leaves, keccak256, { sort: true });
  //     const _root = tree.getHexRoot();
  //     const leaf = keccak256(account);
  //     const _proof = tree.getHexProof(leaf);

  //     const _verified = tree.verify(_proof, leaf, _root);
  //     setVerifiedSeed(_verified);
  //     console.log('verifiedSeed', _verified);

  // }, [account]);

  // useEffect( () => {
  //     const leaves = whitelistAdvisory.map((v) => keccak256(v));
  //     const tree = new MerkleTree(leaves, keccak256, { sort: true });
  //     const _root = tree.getHexRoot();
  //     const leaf = keccak256(account);
  //     const _proof = tree.getHexProof(leaf);

  //     const _verified = tree.verify(_proof, leaf, _root);
  //     setVerifiedAdvisory(_verified);
  //     console.log('verifiedAdvisory', _verified);

  // }, [account]);

  // For skyBridger sale

  // useEffect( () => {
  //     const leaves = whitelistSkyPrivate.map((v) => keccak256(v));
  //     const tree = new MerkleTree(leaves, keccak256, { sort: true });
  //     const _root = tree.getHexRoot();
  //     const leaf = keccak256(account);
  //     const _proof = tree.getHexProof(leaf);

  //     const _verified = tree.verify(_proof, leaf, _root);
  //     setVerifiedSkyPrivate(_verified);
  //     console.log('verifiedSkyPrivate', _verified);

  // }, [account]);

  // useEffect( () => {
  //     const leaves = whitelistSkyAdvisor.map((v) => keccak256(v));
  //     const tree = new MerkleTree(leaves, keccak256, { sort: true });
  //     const _root = tree.getHexRoot();
  //     const leaf = keccak256(account);
  //     const _proof = tree.getHexProof(leaf);

  //     const _verified = tree.verify(_proof, leaf, _root);
  //     setVerifiedSkyAdvisor(_verified);
  //     console.log('verifiedSkyAdvisor', _verified);

  // }, [account]);

  const { showCasperProjects } = useNetworkStatus();

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
          "sale_start_time"
        );
      });

      const saleStartTimes = await Promise.all(promises);

      promises = projectUrefs.map(async (projectUref) => {
        return await casperpadClient.getDataByFieldName(
          projectUref,
          "sale_end_time"
        );
      });

      const saleEndTimes = await Promise.all(promises);

      saleEndTimes.forEach((saleEndTime, index) => {
        if (currentTime > saleStartTimes[index] && currentTime < saleEndTime)
          setCsprProjects([...csprProjects, casperProjects[index]]);
      });
    } catch (err) {}
  }, []);

  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS OPEN NOW
      </h1>
      <section className="projects mx-auto">
        {showCasperProjects &&
          csprProjects.map((project, index) => {
            return (
              <CustomCardCASPER
                key={index}
                project={project}
                status={"Opened"}
              />
            );
          })}
      </section>
    </>
  );
}
