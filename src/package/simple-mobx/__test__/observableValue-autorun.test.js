import { autorun } from "../autorun";
import { observableValue } from "../ObservableValue";
import { expectListenerWasUpdated } from "./utils";

describe("observableValue autorun", () => {
  it("observableValue should be defined", function () {
    expect(observableValue).toBeDefined();
  });

  it("autorun must be defined", function () {
    expect(autorun).toBeDefined();
  });

  it("listener must be called", function () {
    const value = observableValue("hello world");
    const listener = jest.fn(() => value.get());

    autorun(listener);

    value.set("newValue");

    expectListenerWasUpdated(listener);
  });

  it("listener must not be called before dispose autorun", function () {
    const value = observableValue("hello world");
    const listener = jest.fn(() => value.get());

    const dispose = autorun(listener);

    value.set("newValue1");

    const expectListenerIsNoWastUpdated = expectListenerWasUpdated(listener);

    dispose();

    value.set("newValue1");
    value.set("newValue2");
    value.set("newValue3");

    expectListenerIsNoWastUpdated();
  });
});
