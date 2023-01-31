import { v4 as uuidv4 } from "uuid";

class Salad {
  static instanceCounter = 0;

  constructor(arg) {
    this.ingredients = {};
    this.id = "salad_" + Salad.instanceCounter++;
    this.uuid = uuidv4();

    if (!arg) return;

    if (typeof arg === "string") {
      const copy = JSON.parse(arg);
      this.uuid = copy.uuid;
      this.ingredients = { ...copy.ingredients };
    } else if (typeof arg === "object") {
      this.ingredients = { ...arg.ingredients };
    }
  }

  // return this object to make it chainable
  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }

  // return this object to make it chainable
  remove(name) {
    delete this.ingredients[name];
    return this;
  }
}

Salad.prototype.getPrice = function () {
  const ingredients = Object.keys(this.ingredients);

  return ingredients.reduce(
    (accumulator, item) => (accumulator += this.ingredients[item].price),
    0
  );
};

Salad.prototype.count = function (property) {
  const ingredients = Object.keys(this.ingredients);

  return ingredients.reduce(
    (accumulator, item) =>
      (accumulator += this.ingredients[item][property] ? 1 : 0),
    0
  );
};

export class GourmetSalad extends Salad {
  add(ingredient, props, size) {
    const prevState = this.ingredients[ingredient];

    if (!size) {
      super.add(ingredient, props);
    } else if (prevState) {
      super.add(ingredient, {
        ...prevState,
        size: prevState.size + size,
        price: prevState.price + size * props.price,
      });
    } else {
      super.add(ingredient, { ...props, size, price: props.price * size });
    }

    return this;
  }
}
