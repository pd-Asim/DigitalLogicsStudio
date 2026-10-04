import React, { useState } from 'react';

const InteractiveDemo = ({
  title,
  description,
  inputs,
  outputs,
  onInputChange,
  showTruthTable = false,
  truthTableData = null,
}) => {
  const [inputValues, setInputValues] = useState(
    inputs.reduce((acc, input) => ({ ...acc, [input.name]: false }), {})
  );

  const handleInputChange = (inputName, value) => {
    const newValues = { ...inputValues, [inputName]: value };
    setInputValues(newValues);
    if (onInputChange) {
      onInputChange(newValues);
    }
  };

  return (
    <div className="interactive-demo">
      <h3 className="demo-title">{title}</h3>
      {description && <p className="demo-description">{description}</p>}

      <div className="demo-content">
        <div className="input-section">
          <h4>Inputs</h4>
          <div className="input-grid">
            {inputs.map((input) => (
              <div key={input.name} className="input-control">
                <label className="input-label">{input.label || input.name}</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={inputValues[input.name]}
                    onChange={(e) => handleInputChange(input.name, e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-value">
                    {inputValues[input.name] ? '1' : '0'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {outputs && outputs.length > 0 && (
          <div className="output-section">
            <h4>Outputs</h4>
            <div className="output-grid">
              {outputs.map((output) => (
                <div key={output.name} className="output-display">
                  <span className="output-label">{output.label || output.name}</span>
                  <span className={`output-value ${output.value ? 'high' : 'low'}`}>
                    {output.value !== undefined ? (output.value ? '1' : '0') : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showTruthTable && truthTableData && (
          <div className="truth-table-section">
            <h4>Truth Table</h4>
            <div className="truth-table">
              <table>
                <thead>
                  <tr>
                    {inputs.map((input) => (
                      <th key={input.name}>{input.label || input.name}</th>
                    ))}
                    {outputs.map((output) => (
                      <th key={output.name}>{output.label || output.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {truthTableData.map((row, index) => (
                    <tr key={index}>
                      {inputs.map((input) => (
                        <td key={input.name}>{row.inputs[input.name] ? '1' : '0'}</td>
                      ))}
                      {outputs.map((output) => (
                        <td key={output.name}>{row.outputs[output.name] ? '1' : '0'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .interactive-demo {
          background: var(--bg-medium);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .demo-title {
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .demo-description {
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .demo-content {
          display: grid;
          gap: 20px;
        }

        .input-section h4,
        .output-section h4,
        .truth-table-section h4 {
          color: var(--accent-primary);
          margin-bottom: 12px;
        }

        .input-grid,
        .output-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
        }

        .input-control {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .input-label {
          color: var(--text-primary);
          font-weight: 600;
        }

        .toggle-switch {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .toggle-switch input[type='checkbox'] {
          width: 50px;
          height: 26px;
          appearance: none;
          background: var(--wire-off);
          border: 2px solid var(--wire-off);
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-switch input[type='checkbox']:hover {
          transform: scale(1.05);
        }

        .toggle-switch input[type='checkbox']:checked {
          background: var(--wire-on);
          border-color: var(--wire-on);
          box-shadow: 0 0 12px rgba(5, 150, 105, 0.4);
        }

        .toggle-switch input[type='checkbox']::before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          background: #ffffff;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .toggle-switch input[type='checkbox']:checked::before {
          transform: translateX(24px);
        }

        .toggle-value {
          color: var(--text-primary);
          font-weight: bold;
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
        }

        .output-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: var(--bg-light);
          border: 1px solid var(--color-border);
          border-radius: 8px;
        }

        .output-label {
          color: var(--text-primary);
          font-weight: 600;
        }

        .output-value {
          color: var(--text-primary);
          font-weight: bold;
          font-family: 'Courier New', monospace;
          font-size: 1.2rem;
        }

        .output-value.high {
          color: var(--accent-primary);
        }

        .truth-table {
          overflow-x: auto;
        }

        .truth-table table {
          width: 100%;
          border-collapse: collapse;
          background: var(--bg-light);
          border-radius: 8px;
          overflow: hidden;
        }

        .truth-table th,
        .truth-table td {
          padding: 12px;
          text-align: center;
          border: 1px solid var(--color-border);
          color: var(--text-primary);
        }

        .truth-table th {
          background: var(--bg-dark);
          color: var(--accent-primary);
          font-weight: 700;
        }

        .truth-table tr:hover {
          background: var(--bg-medium);
        }
      `}</style>
    </div>
  );
};

export default InteractiveDemo;