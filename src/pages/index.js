// Libraries
import Head from 'next/head';
import firebase from '../lib/firebase';
const firestore = firebase.firestore();

// Components
import Select from 'react-select';

// Hooks
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useFood from '../hooks/use-food';

// Styles
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    const init = async () => {
      const querySnapshot = await firestore.collection('categories').get();
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
      //const doc = await firestore.collection('categories').doc('Dairy').get();
      //console.log(doc.get('almond-milk').unit.id);
    };
    init();
  });
  const router = useRouter();
  const foodQuery = useFood();

  const findItem = (option) => {
    foodQuery.data.forEach((category, i) =>
      category.options.forEach((item, j) => {
        if (item.id === option.id) {
          router.push(`/item/${option.id}?category=${i}&option=${j}`);
        }
      })
    );

    return null;
  };

  const getOptionLabel = (option) => {
    let label = `${option.name}, `;
    if (option.quantity === 0) {
      label += '❌';
    } else {
      label += `${option.quantity} ${option.unit ? option.unit : ''}`;
    }
    return label;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Refri</h1>

        <p className={styles.description}>Food available</p>
        <button type="button" onClick={() => router.push('/add-item')}>
          Add
        </button>
        <Select
          placeholder="Check what's available"
          options={foodQuery.data}
          getOptionLabel={getOptionLabel}
          getOptionValue={(option) => option.name}
          formatGroupLabel={(group) => group.category}
          noOptionsMessage={() => 'Not found'}
          onChange={findItem}
        />

        <pre>{JSON.stringify(foodQuery.data, null, 2)}</pre>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by&nbsp;<b>BP</b>
        </a>
      </footer>
    </div>
  );
}
