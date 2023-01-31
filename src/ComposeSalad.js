import { useMemo, useState } from "react";
import OptionsComponent from "./OptionsComponent";
import { GourmetSalad } from "./Salad";

const ComposeSalad = ({ inventory, setOrder }) => {
  const foundations = useMemo(
    () => Object.keys(inventory).filter((name) => inventory[name].foundation),
    [inventory]
  );

  const proteins = useMemo(
    () => Object.keys(inventory).filter((name) => inventory[name].protein),
    [inventory]
  );

  const extras = useMemo(
    () => Object.keys(inventory).filter((name) => inventory[name].extra),
    [inventory]
  );

  const dressings = useMemo(
    () => Object.keys(inventory).filter((name) => inventory[name].dressing),
    [inventory]
  );

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extra, setExtra] = useState([]);

  const handleSelectChange = (e) => {
    if (e.target.name === "foundation") {
      setFoundation(e.target.value);
    }

    if (e.target.name === "protein") {
      setProtein(e.target.value);
    }

    if (e.target.name === "dressing") {
      setDressing(e.target.value);
    }
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setExtra((oldState) => [...oldState, e.target.value]);
      return;
    }

    setExtra((oldState) => oldState.filter((name) => name !== e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedExtras = extra.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue]: inventory[currentValue],
      }),
      {}
    );

    if (!foundation || !dressing || !protein) {
      alert("Select all parts!");
      return;
    }

    setOrder((oldState) => [
      ...oldState,
      new GourmetSalad({
        ingredients: {
          [foundation]: inventory[foundation],
          [protein]: inventory[protein],
          [dressing]: inventory[dressing],
          ...formattedExtras,
        },
      }),
    ]);

    setFoundation("");
    setProtein("");
    setDressing("");
    setExtra([]);
  };

  const handleCompose = (e) => {
    e.preventDefault();
    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtra(["Krutonger", "Fetaost"]);
  };

  return (
    <div className="container col-12">
      <form
        onSubmit={handleSubmit}
        className="row h-200 p-5 bg-light border rounded-3"
      >
        <div className="col-12">
          <h2>Välj innehållet i din sallad</h2>
        </div>
        <OptionsComponent
          options={foundations}
          name="foundation"
          onChange={handleSelectChange}
          current={foundation}
        />

        <OptionsComponent
          options={proteins}
          name="protein"
          onChange={handleSelectChange}
          current={protein}
        />

        <OptionsComponent
          options={extras}
          name="extra"
          onChange={handleCheckboxChange}
          current={extra}
          checkbox
        />
        <OptionsComponent
          options={dressings}
          name="dressing"
          onChange={handleSelectChange}
          current={dressing}
        />
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Beställ
          </button>
          <button onClick={handleCompose} className="btn btn-secondary mx-3">
            Caesarsallad
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeSalad;
