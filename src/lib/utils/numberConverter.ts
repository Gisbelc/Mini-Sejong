import type { NumberConversion } from "../types";

const DIGITS_HAN = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const DIGITS_ROM = ["", "il", "i", "sam", "sa", "o", "yuk", "chil", "pal", "gu"];

function convertGroup(n: number): { han: string; rom: string } {
  if (n === 0) return { han: "", rom: "" };

  let han = "";
  let rom = "";

  const ch = Math.floor(n / 1000);
  const bk = Math.floor((n % 1000) / 100);
  const sp = Math.floor((n % 100) / 10);
  const il = n % 10;

  if (ch > 0) {
    // 일천 → 천 (drop 일 when coefficient is 1)
    han += (ch === 1 ? "" : DIGITS_HAN[ch]) + "천";
    rom += (ch === 1 ? "" : DIGITS_ROM[ch]) + "cheon";
  }
  if (bk > 0) {
    han += (bk === 1 ? "" : DIGITS_HAN[bk]) + "백";
    rom += (bk === 1 ? "" : DIGITS_ROM[bk]) + "baek";
  }
  if (sp > 0) {
    han += (sp === 1 ? "" : DIGITS_HAN[sp]) + "십";
    rom += (sp === 1 ? "" : DIGITS_ROM[sp]) + "sip";
  }
  if (il > 0) {
    han += DIGITS_HAN[il];
    rom += DIGITS_ROM[il];
  }

  return { han, rom };
}

export function toSinoKorean(n: number): NumberConversion {
  if (!Number.isInteger(n) || n < 0 || n > 999_999_999) {
    return { hangul: "—", romanization: "—", audioText: "" };
  }
  if (n === 0) {
    return { hangul: "영", romanization: "yeong", audioText: "영" };
  }

  const eokVal = Math.floor(n / 100_000_000);
  const manVal = Math.floor((n % 100_000_000) / 10_000);
  const restVal = n % 10_000;

  let hangul = "";
  let romanization = "";

  if (eokVal > 0) {
    const g = convertGroup(eokVal);
    hangul += g.han + "억";
    romanization += g.rom + "eok ";
  }
  if (manVal > 0) {
    const g = convertGroup(manVal);
    hangul += g.han + "만";
    romanization += g.rom + "man ";
  }
  if (restVal > 0) {
    const g = convertGroup(restVal);
    hangul += g.han;
    romanization += g.rom;
  }

  return {
    hangul: hangul.trim(),
    romanization: romanization.trim(),
    audioText: hangul.trim(),
  };
}
