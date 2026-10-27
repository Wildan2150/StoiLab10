import { useState, useMemo } from 'react';
import { parseChemicalFormula } from '../../utils/formulaParser';
import FormulaRenderer from './FormulaRenderer';
import Card from '../common/Card';

const PRESET_FORMULAS = [
  { formula: 'H2O', label: 'Air' },
  { formula: 'NaCl', label: 'Garam Dapur' },
  { formula: 'CaCO3', label: 'Batu Kapur' },
  { formula: 'H2SO4', label: 'Asam Sulfat' },
  { formula: 'CuSO4*5H2O', label: 'Tembaga(II) Sulfat Hidrat' },
  { formula: 'C6H12O6', label: 'Glukosa' }
];

export default function QuickFormulaWidget() {
  const [inputVal, setInputVal] = useState('CaCO3');

  const result = useMemo(() => {
    return parseChemicalFormula(inputVal);
  }, [inputVal]);

  return (
    <Card className="quick-formula-card">
      <div className="widget-header">
        <div className="widget-title-group">
          <div className="widget-icon">🧪</div>
          <div>
            <h3 className="widget-title">Uji Coba Cepat: Kalkulator Massa Molar (Mr)</h3>
            <p className="widget-desc">
              Ketik rumus senyawa atau klik contoh untuk melihat parser atom otomatis dan persentase massa unsur.
            </p>
          </div>
        </div>
        <span className="badge badge-primary">Fitur Alat Cerdas Bab 3</span>
      </div>

      {/* Preset Pills */}
      <div className="preset-container">
        <span className="preset-label">Contoh Senyawa:</span>
        <div className="preset-chips">
          {PRESET_FORMULAS.map((item) => (
            <button
              key={item.formula}
              type="button"
              className={`preset-chip ${inputVal === item.formula ? 'preset-chip-active' : ''}`}
              onClick={() => setInputVal(item.formula)}
            >
              <FormulaRenderer formula={item.formula} />
              <span className="preset-chip-desc">({item.label})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <div className="formula-input-row">
        <div className="input-group-styled">
          <span className="input-prefix">Rumus Senyawa</span>
          <input
            type="text"
            className="input-chem-styled"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Contoh: Ca(OH)2 atau Al2(SO4)3"
          />
        </div>
      </div>

      {/* Result Display */}
      {result.success ? (
        <div className="formula-result-box animate-fade-in">
          <div className="result-stat-card">
            <div className="stat-label">Rumus Kimia</div>
            <div className="stat-val-formula">
              <FormulaRenderer formula={result.formula} />
            </div>
          </div>
          <div className="result-stat-card stat-highlight">
            <div className="stat-label">Total Massa Molar (Mr)</div>
            <div className="stat-val-mr">
              {result.totalMr} <span className="stat-unit">g/mol</span>
            </div>
          </div>

          <div className="element-breakdown-list">
            <div className="breakdown-title">Daftar Unsur &amp; Komposisi Persen Massa:</div>
            <div className="elements-grid">
              {result.elements.map((el) => (
                <div key={el.symbol} className="element-pill-card">
                  <div className="el-badge">
                    <span className="el-sym">{el.symbol}</span>
                    <span className="el-count">×{el.count}</span>
                  </div>
                  <div className="el-details">
                    <div className="el-name-row">
                      <span className="el-name">{el.name}</span>
                      <span className="el-percent">{el.percentage}%</span>
                    </div>
                    <div className="el-mass-calc">
                      Ar = {el.ar} → {el.totalMass} g/mol
                    </div>
                    <div className="el-bar-track">
                      <div
                        className="el-bar-fill"
                        style={{ width: `${el.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="formula-error-box">
          <span className="error-icon">⚠️</span>
          <span>{result.error}</span>
        </div>
      )}
    </Card>
  );
}
