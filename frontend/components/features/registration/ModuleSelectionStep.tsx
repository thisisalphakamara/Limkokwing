import React from 'react';
import { Module } from '../../../types';
import { Button } from '../../ui';
import { calculateTotalCredits } from '../../../utils';

interface ModuleSelectionStepProps {
  modules: Module[];
  selectedModules: Module[];
  onToggleModule: (module: Module) => void;
  onBack: () => void;
  onNext: () => void;
}

const ModuleSelectionStep: React.FC<ModuleSelectionStepProps> = ({
  modules,
  selectedModules,
  onToggleModule,
  onBack,
  onNext
}) => {
  const totalCredits = calculateTotalCredits(selectedModules);
  const isValid = selectedModules.length === 6;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h3 className="text-lg font-bold uppercase mb-2">Select Required Modules</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {modules.map((mod) => {
          const checked = !!selectedModules.find((m) => m.id === mod.id);
          return (
            <label
              key={mod.id}
              className="flex items-center border border-gray-200 rounded-lg p-3 cursor-pointer transition-all hover:border-black bg-white gap-3"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleModule(mod)}
                className="form-checkbox h-5 w-5 text-black border-black focus:ring-black"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">{mod.name}</span>
                  <span className="text-xs font-bold text-gray-700">{mod.credits} Credits</span>
                </div>
                <span className="text-[11px] text-gray-500">{mod.code}</span>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-8 mt-2">
        <div className="text-sm font-bold">
          Total Modules: <span className={selectedModules.length === 6 ? 'text-green-600' : 'text-black'}>
            {selectedModules.length}/6
          </span>
        </div>
        <div className="text-sm font-bold">
          Total Credits: <span className="text-black">{totalCredits}</span>
        </div>
      </div>

      {!isValid && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded">
          <p className="text-xs font-bold text-yellow-800">
            ⚠ You must select all 6 modules to proceed with registration.
          </p>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!isValid}>Review</Button>
      </div>
    </div>
  );
};

export default ModuleSelectionStep;
