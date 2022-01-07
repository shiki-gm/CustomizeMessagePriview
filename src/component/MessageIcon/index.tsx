import React from 'react';
import classNames from "classnames";
import styles from "./index.less";

export default (props) => {
    const {children, noBg} = props



    return <div className={styles.container}>
        <div className={styles.avator} />
        {!noBg && <div className={styles.trigle}>
            
        </div>}
        <div className={classNames(noBg ? styles.noBg : styles.message)}>
            {children}
        </div>
    </div>
}
