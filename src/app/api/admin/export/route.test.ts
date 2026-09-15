import { describe, expect, it } from "vitest";
import { csvCell } from "./route";

describe("csvCell (CSV formula-injection hardening)", () => {
  it("wraps plain values in quotes", () => {
    expect(csvCell("Hallo Welt")).toBe('"Hallo Welt"');
  });

  it("escapes embedded double quotes", () => {
    expect(csvCell('Sagt "Hallo"')).toBe('"Sagt ""Hallo"""');
  });

  it("strips embedded newlines so a cell can't break the row", () => {
    expect(csvCell("Zeile 1\nZeile 2\r\nZeile 3")).toBe('"Zeile 1 Zeile 2 Zeile 3"');
  });

  it("neutralizes values that would be read as a spreadsheet formula", () => {
    // Excel/Sheets fuehren eine Zelle aus, die mit diesen Zeichen beginnt —
    // ein fuehrendes ' verhindert das, ohne den sichtbaren Wert zu aendern.
    expect(csvCell("=cmd|'/C calc'!A1")).toBe(`"'=cmd|'/C calc'!A1"`);
    expect(csvCell("+1+1")).toBe(`"'+1+1"`);
    expect(csvCell("-1-1")).toBe(`"'-1-1"`);
    expect(csvCell("@SUM(A1)")).toBe(`"'@SUM(A1)"`);
  });

  it("leaves values with an internal (non-leading) formula character alone", () => {
    expect(csvCell("Preis: 10-20 EUR")).toBe('"Preis: 10-20 EUR"');
  });

  it("renders null/undefined as an empty quoted cell", () => {
    expect(csvCell(null)).toBe('""');
    expect(csvCell(undefined)).toBe('""');
  });
});
