import { describe, expect, it } from "vitest";
import { esc, subjectSafe } from "./email-templates";

describe("esc (HTML escaping for email templates)", () => {
  it("escapes the four dangerous characters", () => {
    expect(esc(`<script>alert("x")</script> & friends`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; friends",
    );
  });

  it("leaves plain text untouched", () => {
    expect(esc("Stefan Dirnberger, Viawen")).toBe("Stefan Dirnberger, Viawen");
  });

  it("cannot be used to close the enclosing HTML attribute", () => {
    const input = `" onmouseover="alert(1)`;
    expect(esc(input)).not.toContain('"');
  });
});

describe("subjectSafe (email subject header-injection guard)", () => {
  it("strips CR/LF so a name can't inject extra headers", () => {
    expect(subjectSafe("Stefan\r\nBcc: evil@example.com")).toBe("Stefan Bcc: evil@example.com");
  });

  it("collapses other control characters to a single space", () => {
    expect(subjectSafe("A\tB\x00C")).toBe("A B C");
  });

  it("leaves an ordinary name untouched", () => {
    expect(subjectSafe("Stefan Dirnberger")).toBe("Stefan Dirnberger");
  });

  it("trims leading/trailing whitespace left behind by stripping", () => {
    expect(subjectSafe("\r\nStefan\r\n")).toBe("Stefan");
  });
});
