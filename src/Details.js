import { useParams } from "react-router-dom";
import { Component } from "react";
import Carousel from "./Carousel";
import { useContext } from "react";
import ErrorBoundaries from "./ErrorBoundaries";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.pet_id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading ...</h2>;
    }

    const { animal, breed, name, city, state, description, images } =
      this.state;

    // for executing the error boundaries
    if (name == "Luna") {
      throw new error("Luna is ugly");
    }
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button style={{ backgroundColor: this.props.theme }}>
            Adopt {name}
          </button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const { pet_id } = useParams();
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <ErrorBoundaries>
      <Details pet_id={pet_id} theme={theme} />;
    </ErrorBoundaries>
  );
};

export default WrappedDetails;
