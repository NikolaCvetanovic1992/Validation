import classes from "./StartingPageContent.module.css";
import { Link } from "react-router-dom";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <Link to="/auth">
        <h1>Welcome on Board!</h1>
      </Link>
    </section>
  );
};

export default StartingPageContent;
