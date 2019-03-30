import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import Button from "../Button";

describe("Button", () => {
  const onClick = () => {};

  it("renders", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Button onClick={onClick}>Button</Button>, div);
  });

  test("snapshots", () => {
    const component = renderer.create(
      <Button onClick={onClick}>Button</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
