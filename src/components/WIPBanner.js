import React from 'react';
import styles from './WIPBanner.module.css';

export default function WIPBanner() {
    return (
        <div className={styles.banner}>
            ⚠️ <strong>Streamer.live is under active development.</strong>
            <p>It is not yet recommended for production use. Expect frequent changes and updates.</p>
        </div>
    );
}
