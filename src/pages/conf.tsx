// import '../styles/conf.css';
import { useState } from 'react';
import styles from '../styles/conf.module.css';

export default function Google() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((p) => !p);

  return (
    <main>
      <h1>GOOGLE 2022 Conf</h1>
      <section>
        <input type="range" className={styles.range} />
      </section>
      <section>
        <button onClick={toggleOpen}>Open dialog</button>
        <dialog open={open}>
          <p>Hello World!</p>
        </dialog>
      </section>
      <section>
        <input type="datetime-local" className="ml-5" />
      </section>
    </main>
  );
}
