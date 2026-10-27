import periodicData from '../data/periodicTable.json';

/**
 * Parses a chemical formula string and calculates its relative molecular mass (Mr)
 * Supports standard parentheses: Ca(OH)2, Al2(SO4)3
 * Supports hydrates with dot or asterisk: CuSO4·5H2O, CuSO4*5H2O
 */
export function parseChemicalFormula(input) {
  if (!input || typeof input !== 'string') {
    return { success: false, error: 'Masukkan rumus kimia' };
  }

  const cleanInput = input.trim().replace(/\s+/g, '');
  if (!cleanInput) {
    return { success: false, error: 'Rumus kimia tidak boleh kosong' };
  }

  try {
    // Check for hydrate part, e.g. CuSO4·5H2O or CuSO4.5H2O or CuSO4*5H2O
    let mainPart = cleanInput;
    let hydratePart = null;
    let hydrateCount = 1;

    const hydrateMatch = cleanInput.match(/^([A-Za-z0-9()]+)[·.*](?:(\d+))?([A-Za-z0-9()]+)$/);
    if (hydrateMatch) {
      mainPart = hydrateMatch[1];
      hydrateCount = hydrateMatch[2] ? parseInt(hydrateMatch[2], 10) : 1;
      hydratePart = hydrateMatch[3];
    }

    const mainCounts = parseSubFormula(mainPart);
    if (!mainCounts) {
      return { success: false, error: 'Format rumus senyawa utama tidak valid' };
    }

    let combinedCounts = { ...mainCounts };

    if (hydratePart) {
      const hydrateCounts = parseSubFormula(hydratePart);
      if (!hydrateCounts) {
        return { success: false, error: 'Format rumus hidrat tidak valid' };
      }
      for (const [sym, count] of Object.entries(hydrateCounts)) {
        combinedCounts[sym] = (combinedCounts[sym] || 0) + count * hydrateCount;
      }
    }

    // Calculate Mr and element breakdown
    let totalMr = 0;
    const elementsBreakdown = [];

    for (const [sym, count] of Object.entries(combinedCounts)) {
      const elInfo = periodicData[sym];
      if (!elInfo) {
        return {
          success: false,
          error: `Unsur '${sym}' belum terdaftar dalam tabel periodik dasar`
        };
      }

      const ar = elInfo.commonAr || elInfo.mass;
      const elementTotalMass = count * ar;
      totalMr += elementTotalMass;

      elementsBreakdown.push({
        symbol: sym,
        name: elInfo.name,
        count,
        ar,
        totalMass: elementTotalMass
      });
    }

    // Calculate percentage composition
    const elementsWithPercent = elementsBreakdown.map((item) => ({
      ...item,
      percentage: totalMr > 0 ? Number(((item.totalMass / totalMr) * 100).toFixed(2)) : 0
    }));

    return {
      success: true,
      formula: cleanInput,
      totalMr: Number(totalMr.toFixed(2)),
      elements: elementsWithPercent
    };
  } catch {
    return { success: false, error: 'Terjadi kesalahan saat memproses rumus kimia' };
  }
}

/**
 * Parses nested formula with parentheses, e.g., Al2(SO4)3
 */
function parseSubFormula(formula) {
  const stack = [{}];
  let i = 0;

  while (i < formula.length) {
    const char = formula[i];

    if (char === '(') {
      stack.push({});
      i++;
    } else if (char === ')') {
      i++;
      // Parse multiplier after parenthesis
      let multStr = '';
      while (i < formula.length && /\d/.test(formula[i])) {
        multStr += formula[i];
        i++;
      }
      const multiplier = multStr ? parseInt(multStr, 10) : 1;
      const top = stack.pop();
      if (!top || stack.length === 0) return null;

      const current = stack[stack.length - 1];
      for (const [sym, count] of Object.entries(top)) {
        current[sym] = (current[sym] || 0) + count * multiplier;
      }
    } else if (/[A-Z]/.test(char)) {
      // Element symbol starts with uppercase
      let symbol = char;
      i++;
      if (i < formula.length && /[a-z]/.test(formula[i])) {
        symbol += formula[i];
        i++;
      }

      // Check for count
      let countStr = '';
      while (i < formula.length && /\d/.test(formula[i])) {
        countStr += formula[i];
        i++;
      }
      const count = countStr ? parseInt(countStr, 10) : 1;

      const current = stack[stack.length - 1];
      current[symbol] = (current[symbol] || 0) + count;
    } else {
      // Invalid character
      return null;
    }
  }

  if (stack.length !== 1) return null;
  return stack[0];
}
