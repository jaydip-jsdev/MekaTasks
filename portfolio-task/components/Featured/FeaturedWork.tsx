import React from 'react'
import Styles from "./featured.module.css"
import Image from 'next/image'

import { data } from "./featuresData"

const FeaturedWork = () => {
    return (
        <div className={Styles.container} >
            <span className={Styles.featured} >Featured Works</span>
            <div >
                {data.map((d, idx) => {
                    return <div className={Styles.card} key={idx} >
                        <Image
                            alt="random image"
                            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
                            width={400}
                            height={300}
                        />
                        <div>
                            <h1 className={Styles.cardHeading} >{d.heading}</h1>
                            <div className={Styles.menu} >
                                <span className={Styles.year}>{d.year}</span>
                                <span>{d.name}</span>
                            </div>
                            <p className={Styles.cardDesc} >
                                {d.desc}
                            </p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default FeaturedWork