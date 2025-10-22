import styles from "./data-section.module.css";
import { LineGraph } from "../lineGraph/line-graph";

export const DataSection = () => {
  return (
    <>
      <section className={styles.container}>
        <LineGraph
          title="Your Account"
          subtitle=""
          showProjected={true}
        ></LineGraph>
      </section>
    </>
  );
};
