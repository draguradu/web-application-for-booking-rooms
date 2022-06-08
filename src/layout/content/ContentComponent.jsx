import React from 'react';
import styles from "./Content.module.scss";
import { Switch } from 'react-router-dom';
import routes from '../../content.routes';

function ContentComponent() {
    return (
        <body className={styles.body}>
            <div className={styles.content} >
                <Switch>{routes}</Switch>
            </div>
        </body>
        )
}

export default ContentComponent;
