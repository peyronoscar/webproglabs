import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SaladSelect from "./SaladSelect";
import SaladCheckbox from "./SaladCheckbox";

const ComposeSalad = ({ inventory, addToOrder, setShowToast }) => {
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
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    e.target.parentElement.classList.add("was-validated");

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

  const handleSubmit = async (e) => {
    setFormError(false);
    e.preventDefault();
    e.target.classList.add("was-validated");

    if (e.target.checkValidity() === false) return;

    if (extra.length < 3 || extra.length > 9) return setFormError(true);

    const formattedExtras = extra.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue]: inventory[currentValue],
      }),
      {}
    );

    addToOrder({ foundation, protein, dressing, extras: formattedExtras });

    setFoundation("");
    setProtein("");
    setDressing("");
    setExtra([]);

    setShowToast(true);
    navigate("/view-order");
  };

  const handleCompose = (e) => {
    e.preventDefault();
    setFoundation("Sallad");
    setProtein("Kycklingfil??");
    setDressing("Ceasardressing");
    setExtra(["Krutonger", "Fetaost", "Tomat"]);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="col-12">
        <h1>V??lj inneh??llet i din sallad</h1>
      </div>
      <SaladSelect
        options={foundations}
        name="foundation"
        onChange={handleSelectChange}
        current={foundation}
        required
      />
      <SaladSelect
        options={proteins}
        name="protein"
        onChange={handleSelectChange}
        current={protein}
        required
      />
      <SaladCheckbox
        options={extras}
        name="extra"
        onChange={handleCheckboxChange}
        current={extra}
        error={formError}
        checkbox
      />
      <SaladSelect
        options={dressings}
        name="dressing"
        onChange={handleSelectChange}
        current={dressing}
        required
      />
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Best??ll
        </button>
        <button onClick={handleCompose} className="btn btn-dark mx-3">
          Caesarsallad
        </button>
      </div>
    </form>
  );
};

export default ComposeSalad;
