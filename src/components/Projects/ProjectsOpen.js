import React, { Component, useEffect, useState } from 'react';

// For skyBridger Sale

import CustomCardSkyPrivate from './CustomCardSkyPrivate';
import CustomCardSkyAdvisor from './CustomCardSkyAdvisor';
import CustomCardSkypublic from './CustomCardSkypublic';


import { projects } from '../../assets/variables';
import { 
    useIsAdmin
} from '../../util/interactSkypublic';
import { useEthers, useTokenBalance } from "@usedapp/core";

import {whitelist} from '../../contract_info/whitelist';
import {whitelist as whitelistSeed} from '../../contract_info/whitelistSeed';
import {whitelist as whitelistAdvisory} from '../../contract_info/whitelistAdvisory';

// For skyBridger Sale

import {whitelist as whitelistSkyPrivate} from '../../contract_info/whitelistSkyPrivate';
import {whitelist as whitelistSkyAdvisor} from '../../contract_info/whitelistSkyAdvisor';


const { toChecksumAddress } = require('ethereum-checksum-address');
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');

export default function ProjectsOpen() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [verifiedPrivate, setVerifiedPrivate] = useState();
    const [verifiedSeed, setVerifiedSeed] = useState();
    const [verifiedAdvisory, setVerifiedAdvisory] = useState();
    const [verifiedSkyPrivate, setVerifiedSkyPrivate] = useState();
    const [verifiedSkyAdvisor, setVerifiedSkyAdvisor] = useState();
    const {account} = useEthers();
    let isAdmin_tmp = useIsAdmin(account);

    useEffect( () => {
        setIsAdmin(isAdmin_tmp);
    }, [isAdmin_tmp]);

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
    
    useEffect( () => {
        const leaves = whitelistSkyPrivate.map((v) => keccak256(v));
        const tree = new MerkleTree(leaves, keccak256, { sort: true });
        const _root = tree.getHexRoot();
        const leaf = keccak256(account);
        const _proof = tree.getHexProof(leaf);
        
        const _verified = tree.verify(_proof, leaf, _root);
        setVerifiedSkyPrivate(_verified);
        console.log('verifiedSkyPrivate', _verified);

    }, [account]);

    useEffect( () => {
        const leaves = whitelistSkyAdvisor.map((v) => keccak256(v));
        const tree = new MerkleTree(leaves, keccak256, { sort: true });
        const _root = tree.getHexRoot();
        const leaf = keccak256(account);
        const _proof = tree.getHexProof(leaf);
        
        const _verified = tree.verify(_proof, leaf, _root);
        setVerifiedSkyAdvisor(_verified);
        console.log('verifiedSkyAdvisor', _verified);

    }, [account]);

    return (
        <>
            <h1 className="text-center font-weight-bold text-white project-title">PROJECTS OPEN NOW</h1>
            <section className="projects mx-auto">
                {/* {
                    projects.map((project, index) => {
                        return (
                          <></>
                        );
                    })
                } */}
            </section>
        </>
    );
}