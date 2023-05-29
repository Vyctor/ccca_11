import FreightCalculator from "../../src/domain/entity/FreightCalculator";

test("Deve calcular o frete", function () {
  const freight = FreightCalculator.calculate({
    distance: 1000,
    volume: 0.03,
    density: 100,
  });
  expect(freight).toBe(30);
});

test("Deve calcular o frete com frete mínimo", function () {
  const freight = FreightCalculator.calculate({
    distance: 1000,
    volume: 0.01,
    density: 100,
  });
  expect(freight).toBe(10);
});
