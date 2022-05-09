import React from 'react';
import { useParams } from 'react-router-dom'

import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../components/Background';
import TokenDetail from '../components/Project/TokenDetail';
import ProjectDetail from '../components/Project/ProjectDetail';
import TokenDetailNew from '../components/Project/TokenDetailNew';
import ProjectDetailNew from '../components/Project/ProjectDetailNew';
import TokenDetailSeed from '../components/Project/TokenDetailSeed';
import ProjectDetailSeed from '../components/Project/ProjectDetailSeed';
import TokenDetailAdvisory from '../components/Project/TokenDetailAdvisory';
import ProjectDetailAdvisory from '../components/Project/ProjectDetailAdvisory';

import TokenDetailSkyPrivate from '../components/Project/TokenDetailSkyPrivate';
import ProjectDetailSkyPrivate from '../components/Project/ProjectDetailSkyPrivate'; 

import TokenDetailSkyAdvisor from '../components/Project/TokenDetailSkyAdvisor';
import ProjectDetailSkyAdvisor from '../components/Project/ProjectDetailSkyAdvisor'; 

import TokenDetailSkypublic from '../components/Project/TokenDetailSkypublic';
import ProjectDetailSkypublic from '../components/Project/ProjectDetailSkypublic'; 

import TokenDetailCASPER from '../components/Project/TokenDetailCASPER';
import ProjectDetailCASPER from '../components/Project/ProjectDetailCASPER';


export default function Projects() {
    const option = useParams().address;
    const network = useParams().network;
    return (
        <>
            <Header />
            <Background />
            {
                ((option === 'swappery-private-sale') && (
                    <>
                        <TokenDetail />
                        <ProjectDetail />
                    </>
                )) || ((option === 'swappery-public-sale') && (
                    <>
                        <TokenDetailNew  />
                        <ProjectDetailNew  />
                    </>
                )) || ((option === 'swappery-seed-round') && (
                    <>
                        <TokenDetailSeed  />
                        <ProjectDetailSeed  />
                    </>
                )) || ((option === 'swappery-advisory-round') && (
                    <>
                        <TokenDetailAdvisory  />
                        <ProjectDetailAdvisory  />
                    </>
                )) || ((option === 'skybridger-private-sale') && (
                    <>
                        <TokenDetailSkyPrivate />
                        <ProjectDetailSkyPrivate />
                    </>

                )) || ((option === 'skybridger-advisor-sale') && (
                    <>
                        <TokenDetailSkyAdvisor />
                        <ProjectDetailSkyAdvisor />
                    </>
                )) || ((option === 'skybridger-public-sale') && (
                    <>
                        <TokenDetailSkypublic />
                        <ProjectDetailSkypublic />
                    </>
                )) || ((network === 'casper') && (
                    <>
                        <TokenDetailCASPER address={option} />
                        <ProjectDetailCASPER address={option} />
                    </>
                ))
            }
            <Footer />
        </>
    )
}