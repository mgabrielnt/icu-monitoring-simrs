// hooks/useInstruksiObat.ts

import { useState, useEffect, useCallback } from "react";
import { SavedInstruksiObat, InstruksiObatFormData } from "@/types/instructionTypes";
import { InstruksiObatService } from "@/services/instructionService";

export function useInstruksiObat() {
  const [data, setData] = useState<SavedInstruksiObat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check if backend is active first
      await InstruksiObatService.checkBackend();
      
      // Fetch data from service (will auto use backend or dummy JSON)
      const result = await InstruksiObatService.getAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching instruksi obat:', err);
      // Set empty array on error so UI doesn't break
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createData = useCallback(async (formData: InstruksiObatFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newData = await InstruksiObatService.create(formData);
      setData(prev => [...prev, newData]);
      return newData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateData = useCallback(async (id: string, formData: InstruksiObatFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedData = await InstruksiObatService.update(id, formData);
      setData(prev => prev.map(item => item.id === id ? updatedData : item));
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteData = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await InstruksiObatService.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    create: createData,
    update: updateData,
    delete: deleteData
  };
}