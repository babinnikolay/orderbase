import { useCallback, useEffect, useState } from "react";

export function useFormState(initialData) {
  const [formData, setFormData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [originalData] = useState(JSON.stringify(initialData));

  useEffect(() => {
    const currentData = JSON.stringify(formData);
    setIsDirty(currentData !== originalData);
  }, [formData, originalData]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialData);
    setIsDirty(false);
  }, [initialData]);

  return {
    formData,
    isDirty,
    updateField,
    reset,
    setFormData,
  };
}
