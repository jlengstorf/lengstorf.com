import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/page.module.css';

const Confirm = () => (
  <Layout title="Please Check Your Email">
    <h1 className={styles.heading}>Please Check Your Email</h1>
    <p className={styles.lede}>
      In a minute or two you’ll receive an email asking you to confirm your
      email address. This is so I can make sure I’m not spamming people.
    </p>
    <p>
      If you don’t see the email, please check your spam folder. You can also
      add <a href="mailto:jason@lengstorf.com">jason@lengstorf.com</a> to your
      address book, which will make sure the messages get through.
    </p>
  </Layout>
);

export default Confirm;
