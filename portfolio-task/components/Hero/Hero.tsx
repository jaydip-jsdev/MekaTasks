import Image from 'next/image'
import React from 'react'
import styles from "./hero.module.css"

const Hero = () => {
    return (
        <div className={styles.hero} >
            <div>
                <h1 className={styles.heading} >Hi, I am John,
                    Creative Technologist</h1>
                <p className={styles.desc} >
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                </p>
                <button className={styles.download} >
                    Download Resume
                </button>
            </div>
            <div>
                <Image
                    alt='john doe'
                    src={"/hero.png"}
                    height={243}
                    width={243}
                    className={styles.heroImg}
                />
            </div>
        </div>
    )
}

export default Hero