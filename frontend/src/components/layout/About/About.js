import React from "react";
import "./About.css";
import logo from '../../../images/333.jpg'
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/prem_kansagra/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={logo}
              alt="Founder"
            />
            <Typography>Prem Kansagra</Typography>
            <Button onClick={visitInstagram} color="primary">
                Instagram
            </Button>
            <span>
              Loved Creating This Website And Always Hoping to Learn Something New.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Profile Links</Typography>
            <a
              href="https://github.com/PKING1501"
              target="blank"
            >
              <GitHubIcon className="SvgIcon" />
            </a>

            <a href="https://instagram.com/prem_kansagra/" target="blank">
              <InstagramIcon className="SvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/prem-kansagra-05909b274/" target="blank">
              <LinkedInIcon className="SvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;