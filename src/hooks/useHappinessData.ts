import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { HappinessRecord } from '../types/DashboardTypes';

export function useHappinessData() {
  const [data, setData] = useState<HappinessRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'happiness'));
        const records: HappinessRecord[] = snapshot.docs.map((doc) => doc.data() as HappinessRecord);
        setData(records);
      } catch (err) {
        setError('Error al cargar los datos de Firebase.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
