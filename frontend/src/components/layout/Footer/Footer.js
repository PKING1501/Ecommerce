import React from 'react'
import playStore from '../../../images/Playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer id="footer">

        <div className ="leftFooter">
            <h4>Download Our App</h4>
            {/* <p>Download For Android and Apple Users</p> */}
            <img src={playStore} alt='PlayStore' />
            <img src={appStore} alt='AppStore' />
        </div>

        <div className ="midFooter">
            <h1>PKING</h1>
            <p>High Quality Is What We Believe In</p>
            <p>Copyright 2023 &copy; Prem Kansagra</p>
        </div>

        <div className ="rightFooter">
            <h4>Follow Us</h4>
            <a href='https://www.instagram.com/prem_kansagra/'>Instagram</a>
            <a href='https://www.linkedin.com/in/prem-kansagra-05909b274/'>LinkedIn</a>
            <a href='https://github.com/PKING1501'>Github</a>
        </div>

    </footer>
  )
}

export default Footer