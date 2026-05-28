import React from 'react'
import styles from "./footer.module.css"
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className={styles.footer} >
            <div className={styles.footerIcons} >
                <FaFacebookSquare className='social-media-icon' size={30} />
                <FaInstagram className='social-media-icon' size={30} />
                <FaTwitter className='social-media-icon' size={30} />
                <FaLinkedin className='social-media-icon' size={30} />
            </div>
            <p>Copyright ©2020 All rights reserved </p>
        </footer>
    )
}

export default Footer