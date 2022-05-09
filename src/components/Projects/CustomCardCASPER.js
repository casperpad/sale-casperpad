/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { initClient } from '../../xWeb3'

export default function CustomCardCASPER({project, status}) {
  const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);

  useEffect(async() => {
      const casperpadClient = await initClient();

      const projectUref = await casperpadClient.getProjectUrefById(project.contractAddress);
      const participants = await casperpadClient.getDataByFieldName(projectUref, "users_length");
      setParticipants(participants.toNumber());
  }, []);

  const handleGoDetail = (projectAddress) => {
    window.location = '/project/casper/' + projectAddress;
  }

  return (
    <section className="custom-card cursor-pointer" onClick={ () => handleGoDetail(project.contractAddress) }>
      <div className="custom-card-header">
          <div className='tokenLogo'>
              <img src={project.picture} alt="project profile"></img>
          </div>
      </div>
      <div className="custom-card-title">
          <div>
              <strong>{project.name + ' (' + project.tier + ' Tiers' + ')'}</strong>
          </div>
          <div>
              {/* <span className="status" style={{ backgroundColor: `${project.status === 'Coming' ? 'rgb(240 185 19 / 26%)' : project.status === 'Open' ? 'rgb(92 184 92 / 26%)' : 'rgb(255 0 0 / 25%)'}`, color: `${project.status === 'Coming' ? '#f1b90c' : project.status === 'Open' ? '#5cb85c' : 'red'}` }}>
                  <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                  {project.status === 'Coming' ? ' Opens in TBA' : project.status === 'Open' ? ' Opened' : ' Closed'}
              </span> &nbsp; */}
              <span className="status" style={{ backgroundColor:'rgb(255 0 0 / 25%)', color:'red' }}>
                  <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                  {status === 'Coming' ? ' Opens in TBA' : status === 'Open' ? ' Opened' : ' Closed'}
              </span> &nbsp;
              <span className="status">BUSD</span> &nbsp;
              <span className="status">USDC</span>
          </div>
      </div>
      <hr className='card-hr'/>
      <div className="custom-card-body">
          {project.message}
      </div>
      <div className="custom-card-footer">
          <div className="information">
              <div>Token Price<br /><span>${project.swap_rate}</span></div>
              <div>Cap<br /><span>{project.cap}</span></div>
              <div>Access<br /><span>{project.access}</span></div>
          </div>
          <div className="custom-progress-bar">
              <div className="progress-title">
                  <span>Progress</span>
                  <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>{participants}</span></span>
              </div>
              <ProgressBar now={progressValue} variant="pro" />
              <div className="progress-title">
                  <span style={{ color: 'white', fontWeight: 'bold' }}>{progressValue}%</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>{ soldAmount + '/' + totalPresaleAmount }</span>
              </div>
          </div>
      </div>
      <div className="custom-card-title">
          <div className="social-links">
              <a href="https://www.the-swappery.io"><SiWebpack className="social-link" /></a>
              <a href="https://twitter.com/TheSwappery"><AiFillTwitterCircle className="social-link" /></a>
              <a href="https://theswappery.medium.com"><AiOutlineMedium className="social-link" /></a>
              <a href=" https://t.me/TheSwapperyAnn "><FaTelegramPlane className="social-link" /></a>
          </div>
      </div>
    </section>
  );
}

CustomCardCASPER.propTypes = {
  project: PropTypes.object.isRequired,
}